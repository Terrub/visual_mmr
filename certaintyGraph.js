var CertaintyGraph = (function define_CertaintyGraph() {

    var proto;
    var gl;

    function drawBackground(instance) {

        var width = instance.w;
        var height = instance.h;
        var x = instance.x;
        var y = instance.y;
        var color = instance.colors.background;

        gl.drawRect(
            x, y,
            width, height,
            color
        );

    }

    function drawAxisX(instance) {

        var width = instance.w;
        var height = instance.h;
        var x = instance.x;
        var y = instance.y;
        var color = instance.colors.axis;

        gl.drawRect(
            x + 0, y + height,
            width, 1,
            color
        );

    }

    function drawAxisY(instance) {

        var width = instance.w;
        var height = instance.h;
        var x = instance.x;
        var y = instance.y;
        var color = instance.colors.axis;

        var half_width = (width / 2);

        gl.drawRect(
            x + half_width - 1, y + 0,
            1, height,
            color
        );

    }

    function calcMeanFromData(data) {

        var entry;
        var sum = 0;

        var i = 0;
        var n = data.length;

        for ( i; i < n; i += 1 ) {

            entry = data[i];
            sum += entry;

        }

        return sum / n;

    }

    function calcValues(instance) {

        var flr = Math.floor;

        var data = instance.data;
        // var mean = calcMeanFromData(data);

        var x;
        var w = instance.num_units;

        var i = 0;
        var n = data.length;

        var values = instance.values;

        // initiate all x locations in the graph with 0;
        for (i = 0; i < w; i += 1) {

            values[i] = 0;

        }

        for (i = 0; i < n; i += 1) {

            x = flr(data[i] * w);

            values[x] += 1;

        }

    }

    function drawCurve(instance) {

        var flr = Math.floor;

        var width = instance.w;
        var height = instance.h;
        var x = instance.x;
        var y = instance.y;

        var color = instance.colors.curve;
        var values = instance.values;
        var n = instance.data.length;

        var i = 0;

        var num_units = instance.num_units;
        var unit_width = width / num_units;
        var val;

        for (i; i < num_units; i += 1) {

            val = flr(values[i] / n * height);

            if (val > height) { val = height; }
            if (val < 0) { val = 0; }

            gl.drawRect(
                x + (i * unit_width), y + height - val,
                unit_width, val,
                color
            );

        }

    }

    function getBackgroundColor() {

        return "rgba(50,50,50,0.3)";

    }

    function getAxisColor() {

        return "rgba(80,80,80,0.7)";

    }

    function getRandomColor() {

        return formatise(
            "rgba({@1:i},{@2:i},{@3:i},1)",
            generateRandomNumber(0, 255),
            generateRandomNumber(0, 255),
            generateRandomNumber(0, 255)
        );

    }

    proto = {};

    proto.create = function create(p_graph_lib, width, height, num_units) {

        var self;

        gl = p_graph_lib;

        self = {
            data: [],
            values: [],
            colors: {
                curve: getRandomColor(),
                axis: getAxisColor(),
                background: getBackgroundColor()
            }
        };

        self.draw = function(instance) {

            self.x = instance.x;
            self.y = instance.y;

            drawBackground(self);
            drawAxisX(self);
            drawAxisY(self);
            calcValues(self);
            drawCurve(self);

        };


        self.setNumUnits = function (p_num_units) {

            self.num_units = p_num_units;

        }


        if (isDefined(width)) { self.w = width; }
        if (isDefined(height)) { self.h = height; }
        if (isDefined(num_units)) { self.setNumUnits(num_units); }

        return self;

    }

    return proto;

}());
