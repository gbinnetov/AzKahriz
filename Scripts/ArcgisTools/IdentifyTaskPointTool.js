define([
  "dijit/_WidgetBase",
  "dojo/_base/declare",
  "esri/tasks/IdentifyTask",
  "esri/tasks/support/IdentifyParameters",
  "esri/Graphic",
], function (_WidgetBase, declare, IdentifyTask, IdentifyParameters, Graphic) {
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
      
      view.hitTest(pt).then(function (response) {
        view.popup = {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
            position: "bottom-right",
          },
        };
  view.popup.viewModel.actions.getItemAt(0).visible = false;
  $(".imglogo").css("display","block")

        let id=response.results[0].graphic.sourceLayer.id;
        if ( id == 3 || id == 4 || id == 5) {
          $(".imglogo").css("display","none")
          view.popup.open({
            title: "<b>Kəhriz / Kahriz</b>",
            //  location: event.mapPoint
          });
        
          view.popup.content =
            "<table class='table table-striped'>" +
            "<tbody>" +
            "<tr hidden>" +
            "<th scope='row'>OBJECTID</th>" +
            "<td>" +
            response.results[0].graphic.attributes.OBJECTID +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Index</th>" +
            "<td>" +
            response.results[0].graphic.attributes.INDEX +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Kəhrizin adı</th>" +
            "<td>" +
            response.results[0].graphic.attributes.KAHRIZ_AZE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Kahriz name</th>" +
            "<td>" +
            response.results[0].graphic.attributes.KAHRIZ_ENG +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Quyu növü</th>" +
            "<td>" +
            response.results[0].graphic.attributes.QUYU_NOVU +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Well type</th>" +
            "<td>" +
            response.results[0].graphic.attributes.WELL_TYPE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Rayon</th>" +
            "<td>" +
            response.results[0].graphic.attributes.RAYON +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>District</th>" +
            "<td>" +
            response.results[0].graphic.attributes.DISTRICT +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Yaşayış məntəqəsi</th>" +
            "<td>" +
            response.results[0].graphic.attributes.YASAYIS_MENTEQESI +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Settlement</th>" +
            "<td>" +
            response.results[0].graphic.attributes.SETTLEMENT +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Geostruktur region</th>" +
            "<td>" +
            response.results[0].graphic.attributes.GEOSTRUKTUR_REGION +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Geostructural region</th>" +
            "<td>" +
            response.results[0].graphic.attributes.GEOSTRUCTURAL_REGIONS +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Hidroloji hövzə</th>" +
            "<td>" +
            response.results[0].graphic.attributes.HIDROLOJI_HOVZE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Hidrological basin</th>" +
            "<td>" +
            response.results[0].graphic.attributes.HIDROLOGICAL_BASIN +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Su sərfi l/san</th>" +
            "<td>" +
            response.results[0].graphic.attributes.SU_SERFI +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Water discharge l/san</th>" +
            "<td>" +
            response.results[0].graphic.attributes.WATER_DISCHARGE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Su toplayıcı hövzə</th>" +
            "<td>" +
            response.results[0].graphic.attributes.SU_TOPLAYICI_HOVZE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Water gatering basin</th>" +
            "<td>" +
            response.results[0].graphic.attributes.WATER_GATERING_BASIN +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Qidalanma mənbəyi</th>" +
            "<td>" +
            response.results[0].graphic.attributes.QIDALANMA_MENBEYI +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Source of nutrition</th>" +
            "<td>" +
            response.results[0].graphic.attributes.SOURCE_OF_NUTRITION +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Mütləq hündürlük /m</th>" +
            "<td>" +
            response.results[0].graphic.attributes.MUTLEQ_HUNDURLUK +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Absolute Altitute /m</th>" +
            "<td>" +
            response.results[0].graphic.attributes.ABSOLUTE_ALTITUTE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Uzunluq /m</th>" +
            "<td>" +
            response.results[0].graphic.attributes.UZUNLUQ +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Length /m</th>" +
            "<td>" +
            response.results[0].graphic.attributes.LENGTH +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>İstifadəyə verilmə tarixi</th>" +
            "<td>" +
            response.results[0].graphic.attributes.ISTIFADE_TARIXI +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Openning date</th>" +
            "<td>" +
            response.results[0].graphic.attributes.OPENNING_DATE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Son təmir tarixi</th>" +
            "<td>" +
            response.results[0].graphic.attributes.TEMIR_TARIXI +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Renovation date</th>" +
            "<td>" +
            response.results[0].graphic.attributes.RENOVATION_DATE +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Texniki vəziyyəti</th>" +
            "<td>" +
            response.results[0].graphic.attributes.TEXNIKI_VEZIYYET +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Tecnhical condition</th>" +
            "<td>" +
            response.results[0].graphic.attributes.TECHNICAL_CONDITION +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Ləğv olunma tarixi</th>" +
            "<td>" +
            response.results[0].graphic.attributes.LEGV_OLMA_TARIXI +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Danger</th>" +
            "<td>" +
            response.results[0].graphic.attributes.DANGER +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Qeyd</th>" +
            "<td>" +
            response.results[0].graphic.attributes.QEYD +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<th scope='row'>Note</th>" +
            "<td>" +
            response.results[0].graphic.attributes.NOTE +
            "</td>" +
            "</tr>" +
            "</tbody>" +
            "</table>";

          
        }

        //  else if (response.results[0].graphic.sourceLayer.id == 1) {
        //   view.popup.open({
        //     title: "<b>Məlumatlar (Line)</b>",
        //     //  location: event.mapPoint
        //   });
        //   view.popup.content =
        //     "<table class='table table-striped'>" +
        //     "<tbody>" +
        //     "<tr>" +
        //     "<th scope='row'>OBJECTID</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.OBJECTID +
        //     "</td>" +
        //     "</tr>" +

        //     "<tr>" +
        //     "<th scope='row'>TUNNEL_ADI</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.TUNNEL_ADI +
        //     "</td>" +
        //     "</tr>" +

        //     "<tr>" +
        //     "<th scope='row'>TUNNEL_NAM</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.TUNNEL_NAM +
        //     "</td>" +
        //     "</tr>" +

        //     "<tr>" +
        //     "<th scope='row'>UZUNLUQ</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.UZUNLUQ +
        //     "</td>" +
        //     "</tr>" +

        //     "<tr>" +
        //     "<th scope='row'>LENGTH</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.LENGTH +
        //     "</td>" +
        //     "</tr>" +

        //     "<tr>" +
        //     "<th scope='row'>RAYON</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.RAYON +
        //     "</td>" +
        //     "</tr>" +

        //     "<tr>" +
        //     "<th scope='row'>DISTRICT</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.DISTRICT +
        //     "</td>" +
        //     "</tr>" +

        //     "<tr>" +
        //     "<th scope='row'>SHAPE_Leng</th>" +
        //     "<td>" +
        //     response.results[0].graphic.attributes.SHAPE_Leng +
        //     "</td>" +
        //     "</tr>" +

        //     "</tbody>" +
        //     "</table>";
        // }
        else {
        }
      });
    },
  });
});
