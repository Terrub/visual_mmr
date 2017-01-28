var Player = (function define_Player() {

    var proto;

    proto = {};

    var constrain = (function define_constrain() {

        // upvalues for speed?
        var max = Math.max;
        var min = Math.min;

        function proto_constrain(value, low_bnd, up_bnd) {

            return max(low_bnd, min(up_bnd, value));

        }

        return proto_constrain;

    }());

    proto.create = function create(p_rating, p_deviance) {

        var self;

        var rating;
        var deviance;
        var lower_bound;
        var upper_bound;

        self = {};

        function setRating(p_rating) {

            if ( ! isNumber(p_rating)) {

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

            half_deviance = (deviance / 2);

            lower_bound = constrain(rating - half_deviance, 0, 1);
            upper_bound = constrain(rating + half_deviance, 0, 1);

        }

        function getScore() {

            var minV = lower_bound;
            var maxV = upper_bound;

            var result = (Math.random() * (maxV - minV)) + minV;

            return result;

        }

        self.setRating = setRating;
        self.setDeviance = setDeviance;
        self.getScore = getScore;

        if (isDefined(p_rating)) { setRating(p_rating); }
        if (isDefined(p_deviance)) { setDeviance(p_deviance); }

        return self;

    }

    return proto;

}())
