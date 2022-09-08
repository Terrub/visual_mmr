var RenderableButton = (function(){

    proto_RenderableButton = {};

    proto_RenderableButton.create = function (p_gl, p_label) {

        var self;

        var label;
        var gl;
        var font;
        var color;
        var font_size;
        var font_size_unit;
        var font_family;

        var internal_padding;
        var border_size;

        if (isUndefined(p_gl)) {

            reportUsageError("Button requires a graphics library");

            return;

        }

        self = RenderObject.create();

        gl = p_gl;

        internal_padding = 3;
        border_size = 1;

        self.getLabel = function () {

            return label;

        }

        self.setLabel = function (p_label) {

            if ( ! isString(p_label)) {

                reportUsageError("Button label must be string");

                return;

            }

            self.proposed_label = p_label;

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

            self.proposed_color = p_color;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        self.getFontFamily = function () {

            return font_family;

        }

        self.setFontFamily = function (p_font_family) {

            if ( ! isString(p_font_family)) {

                reportUsageError("Label font family must be string");

                return;

            }

            // ToDo: Check string to match enum?
            self.proposed_font_family = p_font_family;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        self.getFontSize = function () {

            return font_size;

        }

        self.setFontSize = function (p_font_size) {

            if ( ! isInteger(p_font_size)) {

                reportUsageError("Label font size must be interger");

                return;

            }

            // ToDo: Check string to match enum?
            self.proposed_font_size = p_font_size;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        self.getFontSizeUnit = function () {

            return font_size_unit;

        }

        self.setFontSizeUnit = function (p_font_size_unit) {

            // ToDo: Check string to match enum?
            if ( ! isString(p_font_size_unit)) {

                reportUsageError("Label font size unit must be string");

                return;

            }

            self.proposed_font_size_unit = p_font_size_unit;

            self.properties_have_changed = true;
            self.dimensions_have_changed = true;

        }

        // Update is called if properties have changed.
        self.update = function (self) {

            label = self.proposed_label;
            color = self.proposed_color;
            font_size = self.proposed_font_size;
            font_size_unit = self.proposed_font_size_unit;
            font_family = self.proposed_font_family;
            font = formatise(
                "{@1:i}{@2:s} {@3:s}",
                font_size, font_size_unit, font_family
            );

        }

        self.measure = function (self) {

            self.w = font_size + gl.measureTextWidth(label, font);
            self.h = font_size + internal_padding + border_size;

        }

        self.draw = function (self) {

            gl.drawRect(
                self.x, self.y,
                self.w, self.h,
                color
            );

            gl.clearRect(
                self.x + border_size, self.y + border_size,
                self.w - border_size * 2, self.h - border_size * 2
            );

            gl.text(
                self.x + font_size / 2,
                self.y + font_size - border_size,
                label,
                color,
                font
            );

        }

        if (isDefined(p_label)) {

            self.setLabel(p_label);

        }

        self.setColor("rgba(200, 100, 0, 1.0)");

        self.setFontSize(30);
        self.setFontSizeUnit("px");
        self.setFontFamily("arial");

        return self;

    };

    return proto_RenderableButton;

}());
