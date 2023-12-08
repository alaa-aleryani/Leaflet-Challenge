// ------------------------------------------------------------------ //
//                         GET THE DATASET                            //
// ------------------------------------------------------------------ //
link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// ------------------------------------------------------------------ //
//                   READING OUR DATA - USING D3                      //
// ------------------------------------------------------------------ //
// Getting our GeoJSON data
d3.json(link).then(function(data) {
    console.log(data); 
    
  // Save the features into a variable named "features"
  let features = data.features;
  console.log(features);


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    //         CREATE THE INITIAL MAP         //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    // Create the map object with options.
    let earthquakesMap = L.map("map", {
        center: [40.73, -74.0059],
        zoom: 3,
        // layers: [streetmap, earthquakes]
      });


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    //         CREATE THE MAP TILES           //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(earthquakesMap);

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    //        SETTING THE OPTIONS BOX         //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    // Create a baseMaps object to hold the streetmap AND the topographic map layers.
    let baseMaps = {
        "Street Map": streetmap,
        "Topographic Map": topo
      };
      
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    //      CREATE THE CONTROLLER LAYER       //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps).addTo(earthquakesMap);

})


// ------------------------------------------------------------------ //
//                      FUNCTION FOR THE FEATURES                     //
// ------------------------------------------------------------------ //
function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
    

}
