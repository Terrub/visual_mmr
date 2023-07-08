var RenderObject = (function(){

    var proto_RenderObject;

    proto_RenderObject = {};

    function proto_update(self) {}

    function proto_measure(self) {}

    function proto_draw(self) {}

    proto_RenderObject.create = function () {

        var self;

        var _x;
        var _y;
        var _w;
        var _h;

        self = {
            properties_have_changed: false,
            dimensions_have_changed: false,
        };

        Object.defineProperty(self, 'x', {
            get: function () { return _x; },

            set: function (proposed_x) {

                _x = proposed_x;

                dimensions_have_changed = true;

            },

            enumerable: true,
            configurable: false
        });

        Object.defineProperty(self, 'y', {
            get: function () { return _y; },

            set: function (proposed_y) {

                _y = proposed_y;

                dimensions_have_changed = true;

            },

            enumerable: true,
            configurable: false
        });

        Object.defineProperty(self, 'w', {
            get: function () { return _w; },

            set: function (proposed_w) {

                _w = proposed_w;

                dimensions_have_changed = true;

            },

            enumerable: true,
            configurable: false
        });

        Object.defineProperty(self, 'h', {
            get: function () { return _h; },

            set: function (proposed_h) {

                _h = proposed_h;

                dimensions_have_changed = true;

            },

            enumerable: true,
            configurable: false
        });

        // load methods with proto functions. These need to be overwritten.
        self.update = proto_update;
        self.measure = proto_measure;
        self.draw = proto_draw;

        return self

    };

    return proto_RenderObject;

}());
