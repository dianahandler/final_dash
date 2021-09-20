// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// mapid references the id tag in our <div> element on the index html
// the setView() method sets the view of the map with a geographical center
//we set the zoom level of 4 on a scale 0-18
// SET LATITUDE AND LONGITUDE TO AUSTIN, TEXAS
let map = L.map('mapid').setView([30.2672, -97.7431], 10);

// We create the tile layer that will be the background of our map.
// 13.2.4 has more styles 
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
    // Add streets tile layer to the map
streets.addTo(map);


// Accessing the airport GeoJSON URL
let austinData= "https://raw.githubusercontent.com/dianahandler/Mapping_Earthquakes/main/new_data_random.geojson"

// Grabbing our GeoJSON data.
d3.json(austinData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
      pointToLayer: function(feature,latlng) {
          console.log(data);
          return L.marker(latlng);
      },
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Price: " + feature.properties.latestPrice + "</br>Bedrooms: " + feature.properties.numOfBedrooms + "</br>Bathrooms:" + feature.properties.numOfBathrooms);
    }

  }).addTo(map);
  
});

