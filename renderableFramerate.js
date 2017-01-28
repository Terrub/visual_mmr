var RenderableFramerate = (function(){

    proto_RenderableFramerate = {};

    proto_RenderableFramerate.create = function (p_gl) {

        var self;

        var last_rendertime;
        var framerate;

        var gl;
        var font;
        var color;
        var font_size;
        var font_size_unit;
        var font_family;

        var proposed_color;
        var proposed_framerate;
        var proposed_font_size;
        var proposed_font_size_unit;
        var proposed_font_family;

        var int_padding;

        if (isUndefined(p_gl)) {

            reportUsageError("Framerate requires a graphics library");

            return;

        }

        self = RenderObject.create();

        gl = p_gl;

        int_padding = 2;

        function setFrameDrawTime(p_last_render_timestamp) {

            /*
                Commented this out because of weird behavour in isInteger which
                I cannot yet explain.

                Passing the integer: '1485606260895' to isInteger returns false
                because (1485606260895 === (1485606260895 | 0)) returns false.
                the expression `(1485606260895 | 0)` evaluates to '-452423521'.
            */
            // if ( ! isInteger(p_last_render_timestamp)) {

            //     reportUsageError("Timestamp must be integer");

            //     return;

            // }

            last_rendertime = p_last_render_timestamp;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        self.getColor = function () {

            return color;

        }

        self.setColor = function (p_color) {

            if ( ! isString(p_color)) {

                reportUsageError("Color must be string");

                return;

            }

            proposed_color = p_color;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        self.getFontFamily = function () {

            return font_family;

        }

        self.setFontFamily = function (p_font_family) {

            if ( ! isString(p_font_family)) {

                reportUsageError("Framerate font family must be string");

                return;

            }

            // ToDo: Check string to match enum?
            proposed_font_family = p_font_family;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        self.getFontSize = function () {

            return font_size;

        }

        self.setFontSize = function (p_font_size) {

            if ( ! isInteger(p_font_size)) {

                reportUsageError("Framerate font size must be interger");

                return;

            }

            // ToDo: Check string to match enum?
            proposed_font_size = p_font_size;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        self.getFontSizeUnit = function () {

            return font_size_unit;

        }

        self.setFontSizeUnit = function (p_font_size_unit) {

            // ToDo: Check string to match enum?
            if ( ! isString(p_font_size_unit)) {

                reportUsageError("Framerate font size unit must be string");

                return;

            }

            proposed_font_size_unit = p_font_size_unit;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        // Update is called if properties have changed.
        self.update = function (self) {

            framerate = Math.floor(1000 / (getTime() - last_rendertime));
            color = proposed_color;
            font_size = proposed_font_size;
            font_size_unit = proposed_font_size_unit;
            font_family = proposed_font_family;
            font = formatise(
                "{@1:i}{@2:s} {@3:s}",
                font_size, font_size_unit, font_family
            );

        }

        self.measure = function (self) {

            gl.font = font;

            self.w = font_size + gl.measureText(framerate);
            self.h = font_size + int_padding;

        }

        self.draw = function (self) {

            gl.font = font;
            gl.fillStyle = color;

            gl.fillText(
                framerate,
                self.x + font_size / 2, self.y + font_size
            );

            setFrameDrawTime(getTime());

        }

        setFrameDrawTime(getTime());

        self.setColor("rgba(0, 255, 0, 1.0)");

        self.setFontSize(12);
        self.setFontSizeUnit("px");
        self.setFontFamily("arial");

        return self;

    };

    return proto_RenderableFramerate;

}());
