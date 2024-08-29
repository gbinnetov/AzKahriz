define([
    "dijit/_WidgetBase",
    "dojo/_base/declare"
], function (
    _WidgetBase,
    declare) {
    return declare([_WidgetBase], {
        options: {
            view: null,
            map: map
        },
        constructor: function (options) {
            declare.safeMixin(this.options, options);
            this.set("view", this.options.view);
            this.set("map", this.options.map);
        },
        runCommand: function (pt) {
            var coords = "X :  " + pt.longitude.toFixed(5) + " | Y : " + pt.latitude.toFixed(5) + " | 1:" + scale(view.scale);
            coordsWidget.innerHTML = coords;
            coordsWidget.innerHTML = coords;

            function scale(mapScale) {

                switch (mapScale) {
                    case 2311162.217155:
                        return "3.000.000";
                    case 1155581.108577:
                        return "1.000.000";
                    case 577790.554289:
                        return "750.000";
                    case 288895.277144:
                        return "500.000";
                    case 144447.638572:
                        return "250.000";
                    case 72223.819286:
                        return "100.000";
                    case 36111.909643:
                        return "50.000";
                    case 18055.954822:
                        return "25.000";
                    case 9027.977411:
                        return "10.000";
                    case 4513.988705:
                        return "5.000";
                    case 2256.994353:
                        return "3.000";
                    case 1128.497176:
                        return "1.000";
                    case 564.248588:
                        return "500";
                    case 282.124294:
                        return "250";
                    case 141.062147:
                        return "150";
                    case 70.5310735:
                        return "100";

                }
            }
        }
    });
});