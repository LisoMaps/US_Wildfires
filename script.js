require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend", "esri/widgets/BasemapGallery", "esri/widgets/Expand"],(Map, MapView, FeatureLayer, Legend, BasemapGallery, Expand) => {
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
    zoom: 3,
    center: [-100, 40] // center of lower 48
  });

  const basemapExpand = new Expand({
    view,
    content: new BasemapGallery({view: view}),
    expandIcon: "basemap"
  });

  const legendExpand = new Expand({
    view,
    content: new Legend({view: view}),
    expandIcon: "legend"
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
  const legend = new Legend({
    view: view,
  });

  /********************
  add US wildfires FL and legend to map and map view
  ********************/
  map.add(polygons);
  map.add(points);
  view.ui.add(basemapExpand, "top-right");
  view.ui.add(legendExpand, "top-right");
});