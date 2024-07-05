require(["esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/Basemap",
  "esri/widgets/BasemapGallery",
  "esri/layers/VectorTileLayer",
  "esri/widgets/Expand",
  "esri/widgets/Home",
  "esri/widgets/Search"
],(Map, MapView, FeatureLayer, Legend, Basemap, BasemapGallery, VectorTileLayer, Expand, Home, Search) => {
  
  const outdoorsLayer = new VectorTileLayer({
    portalItem: {
      id: "659e7c1b1e374f6c8a89eefe17b23380"
    }
  });

  const outdoorsBasemap = new Basemap({
    baseLayers: [outdoorsLayer]
  });
  
  /********************
  initialize map
  ********************/
  const map = new Map({
    basemap: outdoorsBasemap
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

  /********************
  initialize widgets
  ********************/
  const basemapExpand = new Expand({
    view,
    content: new BasemapGallery({view: view}),
    expandIcon: "basemap",
    expandTooltip: "Basemap Gallery"
  });

  const legendExpand = new Expand({
    view,
    content: new Legend({view: view}),
    expandIcon: "legend",
    expandTooltip: "Legend",
    expanded: true
  });

  const homeWidget = new Home({
    view: view
  });

  /********************
  define arcade expressions
  ********************/
  // PercentContained
  const percentContainedExpression = {
    name: "PercentContained",
    title: "Percent Contained",
    expression:
    `
      var PerCont = !IsEmpty($feature.PercentContained);
      if (PerCont) {
        return Text($feature.PercentContained) + "%";
      }
      return "Not Available";
    `
  };

  /********************
  define pop-up template
  ********************/
  const popupTemplate = {
    title: '"{IncidentName}" incident', // Custom title format
    content: [{
      type: "text",
      text: "<b>Discovered on:</b> {FireDiscoveryDateTime}<br><b>Percent Contained:</b> {expression/PercentContained}<br><br><i>Current as of:</i> {ModifiedOnDateTime}"
    }],
    expressionInfos: [percentContainedExpression]
  };

  /********************
  initialize US wildfire FL's
  ********************/
  const pointsURL = "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer/0";
  const polygonsURL = "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer/1";

  const points = new FeatureLayer({
    url: pointsURL,
    popupTemplate: popupTemplate
  });
  const polygons = new FeatureLayer({url: polygonsURL});

  /********************
  initialize search widget
  ********************/
  const searchWidget = new Search({
    view: view,
    sources: [{
      layer: points,
      searchFields: ["IncidentName"], // Fields to search within the Feature Layer
      displayField: "IncidentName", // Field to display in the search results
      exactMatch: false, // Whether to search exact matches only
      outFields: ["*"] // Additional fields to retrieve
    }],
    includeDefaultSources: false // Exclude default search sources like ArcGIS Online
  });

  // embed the Search widget within an expand element
  const expandSearch = new Expand({
    view: view,
    content: searchWidget, // Embed the Search widget
    expandIconClass: "esri-icon-search", // Icon for the expand button
    expandTooltip: "Search",
  });

  /********************
  add US wildfire FL's and widgets to map/map view
  ********************/
  map.add(polygons);
  map.add(points);
  view.ui.add(expandSearch, "top-right");
  view.ui.add(homeWidget, "top-right");
  view.ui.add(basemapExpand, "top-right");
  view.ui.add(legendExpand, "top-right");
});