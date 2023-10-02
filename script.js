// Create a map
const map = L.map('map').setView([-6.906227014340985, 107.66378289976814], 12);

// Add a Tile Layer (use OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Function to add GeoJSON data to the map and table
function addGeoJSONToMapAndTable(geoJSONUrl, map, table) {
    $.getJSON(geoJSONUrl, function (data) {
        // Add GeoJSON data as a layer to the map
        L.geoJSON(data).addTo(map);

        // Populate the table with GeoJSON data
        let rowNum = 1; // Initialize a row number counter

        data.features.forEach(feature => {
            const row = table.insertRow();
            const numCell = row.insertCell(0); // Add a cell for the row number
            const nameCell = row.insertCell(1);
            const desaCell = row.insertCell(2);
            const coordCell = row.insertCell(3); // Cell for coordinates
            const typeCell = row.insertCell(4); // Add a cell for the type
            numCell.innerHTML = rowNum; // Populate the row number
            nameCell.innerHTML = feature.properties.name;
            desaCell.innerHTML = feature.properties.desa;

            // Access the GeoJSON coordinates
            const coordinates = feature.geometry.coordinates;
            let coordinateString = "";

            // Check the feature type
            if (feature.geometry.type === "Point") {
                const lat = coordinates[1];
                const long = coordinates[0];
                coordinateString = `${lat}, ${long}`;
            } else if (feature.geometry.type === "LineString" || feature.geometry.type === "Polygon") {
                // Process LineString or Polygon coordinates (as in the previous code)
                coordinates.forEach(coordinate => {
                    const lat = coordinate[1];
                    const long = coordinate[0];
                    coordinateString += `${lat}, ${long}<br>`;
                });
            }

            coordCell.innerHTML = coordinateString; // Populate the coordinate cell
            typeCell.innerHTML = feature.geometry.type;
            rowNum++;
        });
    });
}

addGeoJSONToMapAndTable('https://raw.githubusercontent.com/raulmahya123/leafflet3c/master/TUGAS1/1214053-RAULMAHYA/geojsonLinestring.json', map, document.querySelector('table'));
addGeoJSONToMapAndTable('https://raw.githubusercontent.com/raulmahya123/leafflet3c/master/TUGAS1/1214053-RAULMAHYA/geojsonPloygon.json', map, document.querySelector('table'));
addGeoJSONToMapAndTable('https://raw.githubusercontent.com/raulmahya123/leafflet3c/master/TUGAS1/1214053-RAULMAHYA/goejsondrawPoint.json', map, document.querySelector('table'));

