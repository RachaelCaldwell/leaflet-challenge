# leaflet-challenge

## Description
The Module 15 challenge uses Leaflet to create an interactive dashboard to visualize earthquake data provided by the United States Geological Survey (USGS). The map displays all the earthquakes based on their longitude and latitude where markers size corresponds to earthquake magnitude and a legend displays the depth and their corresponding color. Additionally, each point has a tooltip with the magnitude, the location and depth when clicked.

**The Dataset**<br>
* The USGS provides earthquake data in a number of different formats, updated every 5 minutes. A JSON representation of ["All Earthquakes from the Past 7 Days"](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) was used to pull in the data for the visualization. The following image is a sampling of the earthquake data in JSON format:
