let arrPoint;
var map;
var view;
var action;

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",
  "esri/layers/FeatureLayer",
  "Scripts/CoordinateAndScale",
  "Scripts/LayerListTool",
  "esri/layers/MapImageLayer",
  "esri/widgets/LayerList",
  "esri/layers/GroupLayer",
  "esri/views/2d/draw/Draw",
  "esri/Graphic",
  "esri/geometry/Polygon",
  "esri/layers/GeoJSONLayer",
  "Scripts/IdentifyTaskPointTool",
  "esri/geometry/Polyline",
  "esri/geometry/geometryEngine",
  "esri/geometry/support/webMercatorUtils",
  "esri/widgets/Home",
  "esri/Basemap",
  "esri/layers/GroupLayer",
], function (
  esriConfig,
  Map,
  MapView,
  Expand,
  BasemapGallery,
  FeatureLayer,
  CoordinateAndScale,
  LayerListTool,
  MapImageLayer,
  LayerList,
  GroupLayer,
  Draw,
  Graphic,
  Polygon,
  GeoJSONLayer,
  IdentifyTaskPointTool,
  Polyline,
  geometryEngine,
  webMercatorUtils,
  Home,
  Basemap,
  GroupLayer
) {
  // setup the map
  map = new Map({
    basemap: "hybrid",
  });
  view = new MapView({
    container: "map_canvas",
    map: map,
    zoom: 8,
    center: [47.149635, 40.185132],
    constraints: {
      rotationEnabled: false,
    },
  });

  view.popup.visible = false;
  view.popup.dockEnabled = false;
  view.popup.dockOptions.buttonEnabled = false;

  $("#spanModalClose").click(function () {
    $("#infodiv").css("display", "none");
    view.graphics.removeAll();
  });

  const lineurl = "./Tunnel.geojson";

  // Symbol for freeways
  const fwySym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: [247, 0, 0],
    width: "3px",
    style: "solid",
  };

  // Symbol for U.S. Highways
  const hwySym = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    //color: "#ff6207",
    color: [245, 223, 73],
    width: "3px",
    style: "solid",
  };

  const hwyRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
      title: " ",
    },
    defaultLabel: "State Highway",
    field: "Status",
    uniqueValueInfos: [
      {
        value: "Inactive", // code for interstates/freeways
        symbol: fwySym,
        label: "Fəaliyyətdə olmayan / Inactive"
      },
      {
        value: "Active", // code for U.S. highways
        symbol: hwySym,
        label: "Fəaliyyətdə olan / Active"
      },
    ],
  };

  const LineInactiveGeoJsonLayer = new GeoJSONLayer({
    url: lineurl,
    id: 1,
    renderer: hwyRenderer,
  });


  const WellSym = {
    type: "simple-marker", // autocasts as new SimpleLineSymbol()
    color:  [255, 189, 233, 1],
    size: 6,
    outline: {
      color: [0, 0, 0, 0.5],
      width: 0.75,
    },
  };

  // Symbol for U.S. Highways
  const ExitPointSym = {
    type: "simple-marker", // autocasts as new SimpleLineSymbol()
    color:   [231, 0, 0, 1],
    size: 6,
    outline: {
      color: [0, 0, 0, 0.5],
      width: 0.75,
    },
  };

  const LastKnowWellSym = {
    type: "simple-marker", // autocasts as new SimpleLineSymbol()
    color:   [1, 91, 232, 1],
    size: 6,
    outline: {
      color: [0, 0, 0, 0.5],
      width: 0.75,
    },
  };

  const PointRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
      title: " ",
    },
    field: "QUYU_NOVU",
    uniqueValueInfos: [
      {
        value: "Baxış quyusu", // code for interstates/freeways
        symbol: WellSym,
        label: "Baxış quyusu / Well"
      },
      {
        value: "Kəhriz çıxışı", // code for U.S. highways
        symbol: ExitPointSym,
        label: "Kəhriz çıxışı / Exit point"
      },
      {
        value: "Son bəlli quyu", // code for U.S. highways
        symbol: LastKnowWellSym,
        label: "Son bəlli quyu / Last know well"
      },
    ],
  };

  
  const pointurl = "./point.geojson";
  const PointViewWellGeoJsonLayer = new GeoJSONLayer({
    url: pointurl,
    id: 3,
    renderer: PointRenderer,
  });
 
  var PointLayerGroup = new GroupLayer({
    title: "Kəhriz / Kahriz",
    layers: [
      PointViewWellGeoJsonLayer,
    ],
    id: 10,
  });

  var LineLayerGroup = new GroupLayer({
    title: "Kəhriz tuneli / Kahriz tunnel",
    id: 11,
    layers: [LineInactiveGeoJsonLayer],
  });

  map.addMany([LineLayerGroup,PointLayerGroup]);

  var layerList = new LayerList({
    view: view,
    listItemCreatedFunction: function (event) {
      const item = event.item;
      // don't show legend twice
      item.panel = {
        content: "legend",
        open: true,
      };
      console.log(item)
      
    },
  });
 
  // let zoom = new Zoom({
  //   view: view
  // });

  // view.ui.add(zoom, "top-right");
  view.ui.move(["zoom"], "top-right");

  var homeBtn = new Home({
    view: view,
  });

  // homeBtn.domNode.ariaLabel="Əsas / Home";

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-right");
  homeBtn.domNode.title = "Əsas /Home ";
  homeBtn.domNode.ariaLabel = "Əsas /Home ";

  var LayerListExpand = new Expand({
    view: view,
    content: layerList,
    collapseTooltip: "Bağla / Close",
    expandTooltip : "Legenda / Legend"
  });

  console.log(LayerListExpand)

  view.ui.add(LayerListExpand, "top-right");

  var basemapGallery = new BasemapGallery({
    view: view,
    container: document.createElement("div"),
    source: [
      Basemap.fromId("hybrid"),
      Basemap.fromId("topo"),
      Basemap.fromId("osm"),
    ], // autocasts to LocalBasemapsSource
  });
  var bgExpand = new Expand({
    view: view,
    content: basemapGallery,
    collapseTooltip: "Bağla / Close",
    expandTooltip : "Atlıq xəritə / Basemap"
  });

  view.ui.add(bgExpand, "top-right");

  // draw
  //  view.ui.add("draw-polygon", "top-left");

  var draw = new Draw({
    view: view,
  });
  let drawclick = false;
  let testgraphic;
  // draw polygon button func
  // document.getElementById("draw-polygon").addEventListener("click",
  //     function () {
  //         view.graphics.removeAll();
  //         drawclick = !drawclick;
  //         document.getElementById("draw-polygon").style.backgroundColor = "#ffffff"

  //         if (drawclick) {
  //             document.getElementById("draw-polygon").style.backgroundColor = "deepskyblue"
  //             var action = draw.create("polygon");

  //             view.focus();

  //             action.on("vertex-add", drawPolygon);
  //             action.on("cursor-update", drawPolygon);
  //             action.on("vertex-remove", drawPolygon);
  //             action.on("redo", drawPolygon);
  //             action.on("undo", drawPolygon);
  //             action.on("draw-complete", drawPolygon);
  //         }

  //     });

  $("#btninfo").click(function () {
    let year = $("#selectBeginYear").val().substring(0, 4);
    let selectEndYear = $("#selectEndYear").val().substring(0, 4);
    //    $("#infoTable tbody tr").remove();
  });

  function drawPolygon(event) {
    var vertices = event.vertices;

    view.graphics.removeAll();

    var polygon = new Polygon({
      rings: vertices,
      spatialReference: view.spatialReference,
    });

    var graphic = new Graphic({
      geometry: polygon,
      symbol: {
        type: "simple-fill",
        color: [178, 102, 234, 0.8],
        style: "solid",
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
    });

    view.graphics.add(graphic);

    if (event.type == "draw-complete") {
      $("#infodiv").css("display", "block");
    }
  }

  view.on("click", function (evt) {
    view.graphics.removeAll();
    var screenPoint = evt.screenPoint;
    //testgraphic = graphic;
    arrPoint = identifyTaskPointTool.runCommand(screenPoint);
  });

  //---------------------Search

  let searchinfoDiv = false;
  document.getElementById("searchbtn").addEventListener("click", function () {
    if (searchinfoDiv) {
      $("#Si3317").css("display", "none");
    } else {
      $("#Si3317").css("display", "block");
    }
    searchinfoDiv = !searchinfoDiv;
  });

  view.ui.add("searchbtn", "top-right");
  view.ui.add("drawpolyline", "top-right");
  view.ui.add("draw-polygon", "top-right");

  ///////////////////////////////////////////////////////////////////////////Mesafe

  document
    .getElementById("drawpolyline")
    .addEventListener("click", function () {
      //return;
      view.graphics.removeAll();
      // create() will return a reference to an instance of PolygonDrawAction
      var action = draw.create("polyline");

      // focus the view to activate keyboard shortcuts for drawing polygons
      view.focus();

      // listen polygonDrawAction events to give immediate visual feedback
      // to users as the polygon is being drawn on the view.
      action.on("vertex-add", drawPolyline);
      action.on("cursor-update", drawPolyline);
      action.on("vertex-remove", drawPolyline);
      action.on("redo", drawPolyline);
      action.on("undo", drawPolyline);
      action.on("draw-complete", drawPolyline);
    });

  // this function is called from the polygon draw action events
  // to provide a visual feedback to users as they are drawing a polygon
  function drawPolyline(event) {
    var vertices = event.vertices;
    //remove existing graphic
    view.graphics.removeAll();
    view.popup.visible = false;

    // create a new polygon
    var polyLine = new Polyline({
      paths: vertices,
      spatialReference: view.spatialReference,
    });

    // create a new graphic representing the polygon, add it to the view
    var graphic = new Graphic({
      geometry: polyLine,
      symbol: {
        type: "simple-line", // autocasts as new SimpleFillSymbol
        color: [255, 0, 0],
        width: 2,
        cap: "round",
        join: "round",
      },
    });

    view.graphics.add(graphic);

    var length =
      Math.round(geometryEngine.geodesicLength(polyLine, "meters") * 100) /
        100 +
      " m";
    if (
      Math.round(geometryEngine.geodesicLength(polyLine, "meters") * 100) /
        100 >
      1000
    ) {
      length =
        Math.round(
          geometryEngine.geodesicLength(polyLine, "kilometers") * 1000
        ) /
          1000 +
        " km";
    }
    var normalizedVal = webMercatorUtils.xyToLngLat(
      vertices[vertices.length - 1][0],
      vertices[vertices.length - 1][1]
    );

    view.popup.dockEnabled = false;
    view.popup.dockOptions.buttonEnabled = false;
    view.popup.open({
      title: "Məsafə / Distance: ",
      content: length,
    });
    view.popup.location = normalizedVal;
    view.popup.viewModel.actions.getItemAt(0).visible = false;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  var drawPolygonButton = document.getElementById("draw-polygon");
  drawPolygonButton.addEventListener("click", function () {
    //return;
    view.graphics.removeAll();
    view.popup.visible = false;
    enableCreatePolygon(draw, view);
  });
  function enableCreatePolygon(draw, view) {
    // create() will return a reference to an instance of PolygonDrawAction
    action = draw.create("polygon");

    // focus the view to activate keyboard shortcuts for drawing polygons
    view.focus();

    // listen to vertex-add event on the action
    action.on("vertex-add", drawPolygon);

    // listen to cursor-update event on the action
    action.on("cursor-update", drawPolygon);

    // listen to vertex-remove event on the action
    action.on("vertex-remove", drawPolygon);

    // *******************************************
    // listen to draw-complete event on the action
    // *******************************************
    action.on("draw-complete", drawPolygon);
  }

  // Add event listener on keydown
  document.addEventListener(
    "keydown",
    (event) => {
      var name = event.key;
      var code = event.code;

      if (code == "Escape") {
        action = draw.reset();
        view.graphics.removeAll();
        view.popup.visible = false;
      }
    },
    false
  );

  // this function is called from the polygon draw action events
  // to provide a visual feedback to users as they are drawing a polygon
  function drawPolygon(event) {
    var vertices = event.vertices;

    //remove existing graphic
    view.graphics.removeAll();
    view.popup.visible = false;
    // create a new polygon
    polygon = Polygon({
      rings: vertices,
      spatialReference: view.spatialReference,
    });
    // create a new graphic representing the polygon, add it to the view
    var graphic = new Graphic({
      geometry: polygon,
      symbol: {
        type: "simple-fill", // autocasts as SimpleFillSymbol
        color: [178, 102, 234, 0.8],
        style: "solid",
        outline: {
          // autocasts as SimpleLineSymbol
          color: [255, 255, 255],
          width: 2,
        },
      },
    });
    view.graphics.add(graphic);

    // calculate the area of the polygon
    var area = geometryEngine.geodesicArea(polygon, "acres");
    if (area < 0) {
      // simplify the polygon if needed and calculate the area again
      var simplifiedPolygon = geometryEngine.simplify(polygon);
      if (simplifiedPolygon) {
        area = geometryEngine.geodesicArea(simplifiedPolygon, "acres");
      }
    }
    // start displaying the area of the polygon
    labelAreas(polygon, area);
  }

  function labelAreas(geom, area) {
    var graphic = new Graphic({
      geometry: geom.centroid,
      symbol: {
        type: "text",
        color: "white",
        haloColor: "black",
        haloSize: "1px",
        text: (area * 0.404686).toFixed(2) + " ha",
        xoffset: 3,
        yoffset: 3,
        font: {
          // autocast as Font
          size: 14,
          family: "sans-serif",
        },
      },
    });
    view.graphics.add(graphic);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var coordsWidget = document.createElement("div");
  coordsWidget.id = "coordsWidget";
  coordsWidget.className = "esri-widget esri-component";
  coordsWidget.style.padding = "7px 15px 5px";
  coordsWidget.style.marginBottom = "-32px";


  var copyright = document.createElement("div");
  copyright.id = "copyright";
  copyright.className = "esri-widget esri-component";
  copyright.style.padding = "7px 15px 5px";
  copyright.style.marginBottom = "-31px";
  copyright.style.fontSize = "x-small";

  copyright.innerHTML =
    '© Bu veb sayt Beynəlxalq miqrasiya Cəmiyyətinin sifarişi ilə layihə çərçivəsində "Caucasus Geo Survey" MMC tərəfindən hazırlanmışdır. ' +
    "This website was developed by Caucasus Geo Survey LLC as part of a project commissioned by the International Migration Society.";

  view.ui.add(copyright, "bottom-right");

  coordinateAndScale = new CoordinateAndScale({ view: view, map: map });
  layerListTool = new LayerListTool({ view: view, map: map });
  identifyTaskPointTool = new IdentifyTaskPointTool({ view: view, map: map });

  view.watch(["stationary"], function () {
    PointViewWellGeoJsonLayer.labelingInfo = null;

    if (view.zoom >= 16) {
      const labelClassPoint = {
        labelPlacement: "above-center",
        labelExpressionInfo: {
          expression:
            "$feature.KAHRIZ_AZE + TextFormatting.NewLine +$feature.KAHRIZ_ENG",
        },
      };

      labelClassPoint.symbol = createTextSymbol("#375ADE");

      function createTextSymbol(color) {
        return {
          type: "text", // autocasts as new TextSymbol()
          font: {
            size: 10,
            weight: "bold",
          },
          color: "black",
          haloColor: "#FFFFFF",
          haloSize: 1,
        };
      }
      labelClassPoint.where = "FILTER = " + "1" + "";

      PointViewWellGeoJsonLayer.labelingInfo = labelClassPoint;
      console.log(PointViewWellGeoJsonLayer.labelingInfo);
    }

    coordinateAndScale.runCommand(view.center);
  });

  //*** Add event to show mouse coordinates on click and move ***//
  view.on(["pointer-down", "pointer-move"], function (evt) {
    coordinateAndScale.runCommand(view.toMap({ x: evt.x, y: evt.y }));
  });

  view.ui.add(coordsWidget, "bottom-left");

  layerListTool.runCommand(layerList);

  // ------------------------------------------------

  function coordinateConvertUTM(x, y) {
    utmz = $("#selectZoneUTM").val();

    var a = 6378137;
    var f = 0.0033528106643315515;
    var b = 6356752.314247833;
    var e = 0.08181919083755415;
    var e0 = 0.0853868661532477;

    var k = 1;
    var k0 = 0.9996;
    var drad = Math.PI / 180;

    var esq = 1 - (b / a) * (b / a);
    var e0sq = (e * e) / (1 - Math.pow(e, 2));
    var zcm = 3 + 6 * (utmz - 1) - 180;
    var e1 =
      (1 - Math.sqrt(1 - Math.pow(e, 2))) / (1 + Math.sqrt(1 - Math.pow(e, 2)));
    var M0 = 0;
    var M = 0;

    M = M0 + y / 0.9996;

    var mu = M / (a * (1 - esq * (1 / 4 + esq * (3 / 64 + (5 * esq) / 256))));
    var phi1 =
      mu +
      e1 * (3 / 2 - (27 * e1 * e1) / 32) * Math.sin(2 * mu) +
      e1 * e1 * (21 / 16 - (55 * e1 * e1) / 32) * Math.sin(4 * mu);
    phi1 =
      phi1 +
      e1 *
        e1 *
        e1 *
        ((Math.sin(6 * mu) * 151) / 96 + (e1 * Math.sin(8 * mu) * 1097) / 512);
    var C1 = e0sq * Math.pow(Math.cos(phi1), 2);
    var T1 = Math.pow(Math.tan(phi1), 2);
    var N1 = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi1), 2));
    var R1 =
      (N1 * (1 - Math.pow(e, 2))) / (1 - Math.pow(e * Math.sin(phi1), 2));
    var D = (x - 500000) / (N1 * 0.9996);
    var phi =
      D *
      D *
      (1 / 2 - (D * D * (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e0sq)) / 24);
    phi =
      phi +
      (Math.pow(D, 6) *
        (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e0sq - 3 * C1 * C1)) /
        720;
    phi = phi1 - ((N1 * Math.tan(phi1)) / R1) * phi;

    var lat = Math.floor((1000000 * phi) / (Math.PI / 180)) / 1000000;
    var lng =
      (D *
        (1 +
          D *
            D *
            ((-1 - 2 * T1 - C1) / 6 +
              (D *
                D *
                (5 -
                  2 * C1 +
                  28 * T1 -
                  3 * C1 * C1 +
                  8 * e0sq +
                  24 * T1 * T1)) /
                120))) /
      Math.cos(phi1);
    lng = lngd = zcm + lng / (Math.PI / 180);

    return { x: lng, y: lat };
  }

  function createPolygonUtm(vertices, spatialRef) {
    view.graphics.removeAll();
    polygon = {
      type: "polygon",
      rings: vertices,
      //,
      //spatialReference: spatialRef
    };

    var fillSymbol = {
      type: "simple-fill",
      color: [178, 102, 234, 0.8],
      style: "solid",
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    };

    var polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol,
    });

    testgraphic = polygonGraphic;

    $("#infodiv").css("display", "block");

    view.graphics.add(polygonGraphic);

    view.goTo(polygonGraphic.geometry.extent.expand(5));
    arrPoint = identifyTaskPointTool.runCommand(testgraphic.geometry);
  }

  $("#btnAddCoordinateModelSuccess").click(function () {
    let vertices = [];
    let arr = [];
    for (
      var i = 0;
      i < $("#coordinateTable")[0].children[1].children.length;
      i++
    ) {
      let convertCoorUTM = coordinateConvertUTM(
        parseFloat(
          $("#coordinateTable")[0].children[1].children[i].children[0].innerHTML
        ),
        parseFloat(
          $("#coordinateTable")[0].children[1].children[i].children[1].innerHTML
        )
      );

      arr.push(convertCoorUTM.x);
      arr.push(convertCoorUTM.y);

      vertices.push(arr);
      arr = [];
    }
    arr.push(vertices[0][0]);
    arr.push(vertices[0][1]);
    vertices.push(arr);

    createPolygonUtm(vertices, 10200);

    $("#coordinateTable")[0].children[1].remove();
  });

  $("#btnAddCoordinateModelClose").click(function () {
    $("#coordinateTable")[0].children[1].remove();
  });

  // ------------------------------------------------

  //____________________________________SEARCH___________________________________

  $("#searchInput").keyup(function () {
    if ($("#searchselectlayer").val() == "value") {
      return;
    }
    $("#ui-id-1").find("li").remove();

    if ($("#searchInput").val().trim().length == 0) {
      $("#ui-id-1").css("display", "none");
      return;
    }

    const queryParams = PointViewWellGeoJsonLayer.createQuery();

   // queryParams.where ="FILTER = 1 and " +
//      $("#hrefOpenAdvancedSearch").val() +
  //    " like '%" +
//      $("#searchInput").val() +
  //    "%'";

 queryParams.where =  "FILTER = 1 and " +"Upper(" +  $("#hrefOpenAdvancedSearch").val() + ") LIKE '" + $("#searchInput").val().toUpperCase() + "%'";

    PointViewWellGeoJsonLayer.queryFeatures(queryParams).then(function (results) {
      $("#ui-id-1").css("display", "block");
        console.log(results)
      for (var i = 0; i < results.features.length; i++) {
        $("#ui-id-1").append(
          "<li class='each ui-menu-item'  tabindex='-1'><div class='acItem'><span hidden>" +
            results.features[i].attributes.OBJECTID +
            "</span> <span class='name'>" +
            " " +
            results.features[i].attributes.KAHRIZ_AZE +
            " (AZE)  /   " +
            results.features[i].attributes.KAHRIZ_ENG +
            " (ENG)" +
            "</span><br><span class='desc'>" +
            " " +
            results.features[i].attributes.RAYON +
            " (AZE) / " +
            results.features[i].attributes.DISTRICT +
            " (ENG)" +
            "</span><br><span class='descOLD'>" +
            " " +
            results.features[i].attributes.INDEX +
            "</span></div></li>"
        );
      }

      $(".name").on("click", function (event) {
        PointSearch(event.currentTarget.parentElement.children[0].innerHTML);
      });
      $(".desc").on("click", function (event) {
        PointSearch(event.currentTarget.parentElement.children[0].innerHTML);
      });
      $(".descOLD").on("click", function (event) {
        PointSearch(event.currentTarget.parentElement.children[0].innerHTML);
      });

      $(".acItem").on("click", function (event) {
        PointSearch(event.target.childNodes[0].innerHTML);
      });

      function PointSearch(params) {
        const queryParams = PointViewWellGeoJsonLayer.createQuery();

        queryParams.where = " OBJECTID =" + params;

        PointViewWellGeoJsonLayer.queryFeatures(queryParams).then(function (response) {
          view.graphics.removeAll();

          point = {
            type: "point", // autocasts as new Point()
            longitude: response.features[0].geometry.longitude,
            latitude: response.features[0].geometry.latitude,
          };

          // Create a symbol for drawing the point
          var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [226, 119, 40],
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: [255, 255, 255],
              width: 2,
            },
          };

          // Create a graphic and add the geometry and symbol to it
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
          });
          view.zoom = 17;
          view.graphics.add(pointGraphic);
          view.goTo(pointGraphic);
          arrPoint = identifyTaskPointTool.runCommand(pointGraphic.geometry);
        });
      }
    });
  });

  //____________________________________END__SEARCH______________________________
});
