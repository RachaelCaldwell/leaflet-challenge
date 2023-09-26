// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Initialize the map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
  });

// Add a tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
  maxZoom: 18,
}).addTo(myMap);

// Function to determine marker size
function markerSize(magnitude){
    return magnitude * 15000;
  };
  
// Function to determine marker color by depth
function chooseColor(depth){
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "#FF0000";
  }

// Function to create features and add them to the map
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

// Get GeoJSON data
  d3.json(link).then(function(data) {
// Creating a GeoJSON layer with the retrieved data
    console.log(data); 
    let earthquakes = L.geoJSON(data.features, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {

// Determine the style of markers based on properties
            let markers = {
                radius: markerSize(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.7,
                color: "black",
                stroke: true,
                weight: 0.5
            };
            return L.circle(latlng,markers);
         },
    });

// Send earthquakes layer to the createMap function/
    createMap(earthquakes);
  });

// Function to create the map and legend
function createMap(earthquakes) {
    earthquakes.addTo(myMap);
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        let depths = [0, 10, 30, 50, 70, 90];
        let labels = [];

        for (let i = 0; i < depths.length; i++) {
            labels.push(
                '<i style="background:' +
                    chooseColor(depths[i]) +
                    '"></i>' +
                    depths[i] +
                    (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+")
            );
        }

        div.innerHTML = "<h4>Depth</h4>" + labels.join(" ");
        return div;
    };

    legend.addTo(myMap);
}