require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend"], (Map, MapView, FeatureLayer, Legend) => {
  /********************
  initialize map
  ********************/
  const map = new Map({
    basemap: "topo-vector"
  });

  /********************
  initialize map view
  ********************/
  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 4,
    center: [-98.555183, 39.809860]
  });

  /********************
  initialize US wildfires FL
  ********************/
  const pointsURL = "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer/0";
  const polygonsURL = "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer/1";

  const points = new FeatureLayer({url: pointsURL});

  const polygons = new FeatureLayer({url: polygonsURL});

  /********************
  initialize map legend
  ********************/
  let legend = new Legend({
    view: view
  });

  /********************
  add US wildfires FL and legend to map and map view
  ********************/
  map.add(polygons);
  map.add(points);
  view.ui.add(legend, "bottom-right");
});