const fs = require('fs');
const turf = require('@turf/turf');
const parse = require('csv-parse/lib/sync');
 
// read polygon data
const geojson = JSON.parse(fs.readFileSync('data/tokyo.geojson', 'utf8'));
// read csv dataset
const crime_data = parse(fs.readFileSync('data/crime_tokyo_h31.csv', 'utf8'), { columns: true });
// read geojson dataset
const append_data = JSON.parse(fs.readFileSync('data/danger_area_8.geojson', 'utf8'));

// convert csv to geojson
const points = turf.featureCollection(
    crime_data.map(function(d){
        const p = turf.point([d.lng, d.lat], d);
        return p;
    })
);

// Extract coordinates included in each polygon of boundary data
// And add to property
geojson.features.forEach(function(feature){
    if(!feature.geometry) return null;
    var ptsWithin = turf.pointsWithinPolygon(points, feature);

    var feat = append_data.features.filter(f => 
        feature.properties["CITY_NAME"] === f.properties["city_name"]
        && feature.properties["S_NAME"] === f.properties["town_name"])[0]

    feature.properties = {
        "PREF": feature.properties["PREF"],
        "CITY": feature.properties["CITY"],
        "S_AREA": feature.properties["S_AREA"],
        "PREF_NAME": feature.properties["PREF_NAME"],
        "CITY_NAME": feature.properties["CITY_NAME"],
        "S_NAME": feature.properties["S_NAME"],
        "crime_total": (ptsWithin.features[0]) ? parseInt(ptsWithin.features[0].properties["総合計"]) : null,
        "crime_kyoaku": (ptsWithin.features[0]) ? parseInt(ptsWithin.features[0].properties["凶悪犯計"]) : null,
        "crime_boryoku": (ptsWithin.features[0]) ? parseInt(ptsWithin.features[0].properties["粗暴犯計"]) : null,
        "crime_setto": (ptsWithin.features[0]) ? parseInt(ptsWithin.features[0].properties["非侵入窃盗計"]) : null,
        "crime_shinnyu": (ptsWithin.features[0]) ? parseInt(ptsWithin.features[0].properties["侵入窃盗計"]) : null,
        "B_amount": (feat) ? feat.properties["B_amount"] : null,
        "B_place": (feat) ? feat.properties["B_place"] : null,
        "B_rank": (feat) ? feat.properties["B_rank"] : null,
        "F_amount": (feat) ? feat.properties["F_amount"] : null,
        "F_place": (feat) ? feat.properties["F_place"] : null,
        "F_rank": (feat) ? feat.properties["F_rank"] : null,
        "E_amount": (feat) ? feat.properties["E_amount"] : null,
        "E_place": (feat) ? feat.properties["E_place"] : null,
        "E_rank": (feat) ? feat.properties["E_rank"] : null,
        "C_amount": (feat) ? feat.properties["C_amount"] : null,
        "C_place": (feat) ? feat.properties["C_place"] : null,
        "C_rank": (feat) ? feat.properties["C_rank"] : null
    }
});

// output
fs.writeFileSync('./output.geojson', JSON.stringify(geojson));
