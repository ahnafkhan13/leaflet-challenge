// Store our API endpoint inside url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  
  
  // Perform a GET request to the query URL
  d3.json(url, function(eqData) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(eqData.features);
  });

    
// Create map
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 1.5,
  });
  
  // Create popups and markers
  function createFeatures(eqData) {
    
    // for each function to gather data
    eqData.forEach((earthQ) => {

      var location = earthQ.geometry.coordinates
      location.pop()
      location = location.reverse()
      console.log(location)
      
      var magnitude = earthQ.properties.mag
      console.log(magnitude)

      var place = earthQ.properties.place
      console.log(place)
      
      // Magnitude shades
      if (magnitude < 1) {
        color = "#008000"
      } else if (magnitude < 2 ) {
        color = "#00FF00"
      } else if (magnitude < 3) {
        color = "#FFD700"
      } else if (magnitude < 4) {
        color = "#FF8C00"
      } else if (magnitude < 5) {
        color = "#DC143C"
      } else {
        color = "#8B0000"
      }
  
      // Markers
      L.circleMarker(location, {
          radius: magnitude * 5, 
          fillColor: color, 
          color: color, 
          fillOpacity: 0.9
        }).bindPopup("<h5>" + place + "<hr>" + magnitude + " Richter scale</h5>").addTo(myMap)
    })

  // Maps have layers
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: "pk.eyJ1IjoibmFkaXJlIiwiYSI6ImNrNDF5N29yODAwZjUzZnM4cmNlczd6NmMifQ.VwJ1k31ymb_I1mqkGtR3Xw"
  }).addTo(myMap);
  }