define([
    "dijit/_WidgetBase",
    "dojo/_base/declare"
], function (
    _WidgetBase,
    declare) {
    return declare([_WidgetBase], {
        options: {
            view: null,
            map: null,
        },
        constructor: function (options) {
            declare.safeMixin(this.options, options);
            this.set("view", this.options.view);
            this.set("map", this.options.map);
        },
        runCommand: function (pt) {
            function fadeVisibilityOn(layer) {
                console.log(layer)
                switch (layer.layer.id) {
                    case "1":
                    layer.title = "Kəhriz tuneli / Kahriz tunnel";
                    layer.layer.layers.items[0].title = "Fəaliyyətdə olmayan / Inactive";
                    layer.layer.layers.items[1].title = "Fəaliyyətdə olan / Active";
                     break;
                    case "3": layer.title = "Kəhriz / Kahriz"; 
                    layer.layer.layers.items[0].title = "Baxış quyusu / Well";
                    layer.layer.layers.items[1].title = "Kəhriz çıxışı / Exit point";
                    layer.layer.layers.items[2].title = "Son bəlli quyu / Last know well";
                    break;
                   
                    default:
                }

            }


            this.view.when().then(function () {

                pt.operationalItems.forEach(function (item) {

                    fadeVisibilityOn(item);
                });
            });

        }
    });
});