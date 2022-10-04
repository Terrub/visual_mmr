export class DataObject {
  constructor(raw_data) {
    let N = raw_data.length;
    this.rawData = raw_data;
    this.data = raw_data.slice().sort(function (a, b) {
      return a - b;
    });
    this.sampleSize = N;
    this.sum = this.data.reduce((sum, b) => sum + b, 0);
    this.mean = this.sum / N;
    this.#calculateVariance();
    this.stdDev = Math.sqrt(this.variance);
    this.min = this.data[0];
    this.max = this.data[N - 1];
    this.#calculateSkewness();
    this.#calculateKurtosis();
    this.skewnessSE = Math.sqrt(
      (6 * N * (N - 1)) / ((N - 2) * (N + 1) * (N + 3))
    );
    this.kurtosisSE =
      2 * this.skewnessSE * Math.sqrt((N * N - 1) / ((N - 3) * (N + 5)));
    this.Q1 = this.getPercentileValue(25);
    this.median = this.getPercentileValue(50);
    this.Q3 = this.getPercentileValue(75);
    this.setRangeIQR(1.5);
  }

  #calculateVariance() {
    let tempSum = 0;
    this.data.forEach((value) => {
      tempSum += (value - this.mean) ** 2;
    });
    this.variance = tempSum / (this.sampleSize - 1);
  }

  #calculateSkewness() {
    let tempSum = 0;
    let N = this.sampleSize;
    this.data.forEach((value) => {
      tempSum += (value - this.mean) ** 3;
    });
    this.skewness = tempSum / ((N - 1) * this.stdDev ** 3);
  }

  #calculateKurtosis() {
    let tempSum = 0;
    this.data.forEach((value) => {
      tempSum += (value - this.mean) ** 4;
    });
    this.kurtosis = tempSum / ((this.sampleSize - 1) * this.stdDev ** 4) - 3;
  }

  // FUNCTIONS TO USE

  // get the Z-score of a specific value
  getZScore(value, check_existance = false) {
    if (check_existance && !this.data.includes(value)) return null;
    return (value - this.mean) / this.stdDev;
  }

  // get value under which s a certain percentage of the dataset can be found
  getPercentileValue(number) {
    if (number < 0 || number > 100) return null;

    let num = number / 100;
    let div = this.sampleSize * num;
    let rem = this.sampleSize % (1 / num);

    return rem === 0
      ? (this.data[div - 1] + this.data[div]) / 2
      : this.data[Math.floor(div)];
  }

  // get data entries in chosen percentile
  getPercentileData(number) {
    if (number < 0 || number > 100) return null;

    let val = this.getPercentileValue(number);

    return this.data.filter((value) => value <= val);
  }

  // default value for computing IQR range is 1.5 but with this you can change it
  setRangeIQR(value) {
    this.IQR_value = value;
    let diff = value * (this.Q3 - this.Q1);
    this.IQR_range_lower = this.Q1 - diff;
    this.IQR_range_higher = this.Q3 + diff;
  }

  // check if a specific value is likely to be an outlier based on the IQR range
  checkOutlierWithIQR(value, check_existance = false) {
    if (check_existance && !this.data.includes(value)) return null;
    return value < this.IQR_range_lower || value > this.IQR_range_higher;
  }

  // get all potential outliers based on the IQR range
  getAllOutliersWithIQR() {
    return this.data.filter(
      (value) => value < this.IQR_range_lower || value > this.IQR_range_higher
    );
  }

  // check if a specific value is likely to be an outlier based on the standard deviation
  checkOutlierWithStdDev(value, maxDiff = 2, check_existance = false) {
    if (check_existance && !this.data.includes(value)) return null;
    return Math.abs(this.mean - value) / this.stdDev > maxDiff;
  }

  // get all potential outliers based on the standard deviation
  getAllOutliersWithStdDev(maxDiff = 2) {
    return this.data.filter(
      (value) => Math.abs(this.mean - value) / this.stdDev > maxDiff
    );
  }

  // simple test for normality using the skewness and kurtosis
  checkNormalityWithSkewnessAndKurtosis(
    skewness_acceptance_value = 2,
    kurtosis_acceptance_value = 2
  ) {
    let diff_skewness = Math.abs(this.skewness);
    let diff_kurtosis = Math.abs(this.kurtosis);
    return (
      diff_skewness <= skewness_acceptance_value * this.skewnessSE ||
      diff_kurtosis <= kurtosis_acceptance_value * this.kurtosisSE
    );
  }

  // get confidence interval for 0.9, 0.95 or 0.99 certainty
  getConfidenceInterval(value) {
    let z = 0;
    switch (value) {
      case 0.99:
        z = 2.575;
        break;
      case 0.95:
        z = 1.96;
        break;
      case 0.9:
        z = 1.645;
        break;
      default:
        return null;
    }
    let temp = (z * this.stdDev) / Math.sqrt(this.sampleSize);
    return [this.mean - temp, this.mean + temp];
  }

  debugTestExample() {
    stat_example = [
      61.1, 61.7, 62.5, 62.6, 63.0, 65.4, 70.5, 71.3, 82.0, 34.0, 38.2, 39.2,
      39.5, 41.0, 41.5, 41.6, 42.7, 43.3, 49.2, 49.6, 50.1, 50.4, 50.6, 51.5,
      53.3, 53.4, 54.9, 55.0, 55.3, 56.5, 56.6, 58.0, 58.4, 58.9, 59.7, 60.9,
      44.2, 44.6, 45.7, 46.0, 47.2, 47.8, 48.3, 49.0, 49.1,
    ];

    data = new DataObject(stat_example);
    console.log(data);
  }
}
