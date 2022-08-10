const Player = (function define_Player() {
  const proto = {};

  const constrain = (function define_constrain() {
    // upvalues for speed?
    var max = Math.max;
    var min = Math.min;

    function proto_constrain(value, low_bnd, up_bnd) {
      return max(low_bnd, min(up_bnd, value));
    }

    return proto_constrain;
  }());

  proto.create = (p_rating, p_deviance) => {
    const self = {};

    var rating;
    var deviance;
    var lower_bound;
    var upper_bound;

    function setRating(p_rating) {
      if (!isNumber(p_rating)) {
        reportUsageError("setRating requires a number");
      }

      if (p_rating > 1 || p_rating < 0) {
        reportUsageError("Rating constrained to values between 0 and 1");
      }

      rating = p_rating;
    }

    function setDeviance(p_deviance) {
      var half_deviance;

      deviance = p_deviance;

      half_deviance = deviance / 2;

      lower_bound = constrain(rating - half_deviance, 0, 1);
      upper_bound = constrain(rating + half_deviance, 0, 1);
    }

    function getScore() {
      var minV = lower_bound;
      var maxV = upper_bound;

      var i = 0;
      var n = 6;
      var result = 0;

      for (i; i < n; i += 1) {
        result += Math.random() * (maxV - minV) + minV;
      }

      result /= n;

      return result;
    }

    self.setRating = setRating;
    self.setDeviance = setDeviance;
    self.getScore = getScore;

    if (isDefined(p_rating)) {
      setRating(p_rating);
    }
    if (isDefined(p_deviance)) {
      setDeviance(p_deviance);
    }

    return self;
  };

  return proto;
})();
