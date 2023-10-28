const window_dims = {
    width: window.innerWidth,
    height: window.innerHeight
};


const svgWidth = window_dims.width/2;
const svgHeight = window_dims.width/3;

const MA_counties = "./data/towns.topojson"
    // gini index per county
const gini_index = "./data/gini_index.csv"



// open both files
Promise.all([
    d3.json(MA_counties),
    d3.csv(gini_index)
]).then(data =>
{
    // topology data
    const topology_data = data[0];
    // gini index data
    const csv_data = data[1];


//given map
    const generateMap1 = (topo_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);

     
    const geojson = topojson.feature(topo_data, topo_data.objects.ma);

    const projections = [
        d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
        d3.geoAlbersUsa(), // USA conic projection
        d3.geoAlbers(), // equal-area conic projection
        d3.geoMercator(), // cylindrical projection
        d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
        d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
        d3.geoConicEqualArea(), //equal-area conic projection
        d3.geoEquirectangular(), //Cylindrical Projections
        d3.geoOrthographic()
    ]

    const geoPath_generator = d3.geoPath()
        .projection(projections[3].fitSize([width-margin,height-margin], geojson))

    const colorInterpolator = d3.interpolateRgbBasis(['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'].reverse())
        // if the data is scaled using log scale
    const logScale = d3.scaleLog()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['POP2010']
        }))
    // if the data is scaled using linear scale
    const linearScale = d3.scaleLinear()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['POP2010']
        }))

    const tooltip = d3.select("#tooltip_1");


    svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", d => geoPath_generator(d))
        //.attr("fill", d => colorInterpolator(logScale(d['properties']['POP2010'])))
        .attr("fill", d => colorInterpolator(linearScale(d['properties']['POP2010'])))
        .on("mouseenter", (m, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9)
            tooltip.html(d['properties']['TOWN']['POP2010'])
                .style("left", m.clientX + "px")
                .style("top", m.clientY + "px");
        })
        .on("mousemove", (m, d) => {
            tooltip.style("opacity", .9)
        })
        .on("mouseout", (m, d) => {
            tooltip.transition()
                .duration(400)
                .style("opacity", 0)
        })

    }
    // generateMap1(topology_data,".fig1",svgWidth,svgHeight)


    
    const generateMap2 = (topo_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);

    const geojson = topojson.feature(topo_data, topo_data.objects.ma);


    const projections = [
        d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
        d3.geoAlbersUsa(), // USA conic projection
        d3.geoAlbers(), // equal-area conic projection
        d3.geoMercator(), // cylindrical projection
        d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
        d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
        d3.geoConicEqualArea(), //equal-area conic projection
        d3.geoEquirectangular(), //Cylindrical Projections
        d3.geoOrthographic()
    ]
    
    const geoPath_generator = d3.geoPath()
        .projection(projections[3].fitSize([width-margin,height-margin], geojson))
    
    const colorInterpolator = d3.interpolateRgbBasis(['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'].reverse())
        // if the data is scaled using log scale
    const logScale = d3.scaleLog()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['POP1980']
        }))
    // if the data is scaled using linear scale
    const linearScale = d3.scaleLog()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['POP1980']
        }))
  
    const tooltip = d3.select("#tooltip_2");
   
    
    svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        
        // .title("map2")
        .attr("d", d => geoPath_generator(d))
       
        .attr("fill", d => colorInterpolator(linearScale(d['properties']['POP1980'])))
        .on("mouseenter", (m, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9)
                tooltip.html(d.properties.TOWN + '<br>POP1980: ' + d.properties.POP1980)
                .style("left", m.clientX + "px")
                .style("top", m.clientY + "px");
        })
        .on("mousemove", (m, d) => {
            tooltip.style("opacity", .9)
        })
        .on("mouseout", (m, d) => {
            tooltip.transition()
                .duration(400)
                .style("opacity", 0)
        })

    }
    generateMap2(topology_data,".fig2",svgWidth,svgHeight)



    const generateMap3 = (topo_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);

     
    const geojson = topojson.feature(topo_data, topo_data.objects.ma);

    const projections = [
        d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
        d3.geoAlbersUsa(), // USA conic projection
        d3.geoAlbers(), // equal-area conic projection
        d3.geoMercator(), // cylindrical projection
        d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
        d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
        d3.geoConicEqualArea(), //equal-area conic projection
        d3.geoEquirectangular(), //Cylindrical Projections
        d3.geoOrthographic()
    ]
    
    const geoPath_generator = d3.geoPath()
        .projection(projections[3].fitSize([width-margin,height-margin], geojson))
    
    const colorInterpolator = d3.interpolateRgbBasis(['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'].reverse())
        // if the data is scaled using log scale
    const logScale = d3.scaleLog()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['POPCH00_10']
        }))
    // if the data is scaled using linear scale
    const linearScale = d3.scaleLinear()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['POPCH00_10']
        }))
  
    const tooltip = d3.select("#tooltip_3");
   

    svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", d => geoPath_generator(d))
       
        .attr("fill", d => colorInterpolator(linearScale(d['properties']['POPCH00_10'])))
        .on("mouseenter", (m, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9)
                tooltip.html(d.properties.TOWN + '<br>POPCH00_10:' + d.properties.gini_index)
                .style("left", m.clientX + "px")
                .style("top", m.clientY + "px");
        })
        .on("mousemove", (m, d) => {
            tooltip.style("opacity", .9)
        })
        .on("mouseout", (m, d) => {
            tooltip.transition()
                .duration(400)
                .style("opacity", 0)
        })

    }
    generateMap3(topology_data,".fig3",svgWidth,svgHeight)



    const generateMap4 = (topo_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);


    const geojson = topojson.feature(topo_data, topo_data.objects.ma);


    const projections = [
        d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
        d3.geoAlbersUsa(), // USA conic projection
        d3.geoAlbers(), // equal-area conic projection
        d3.geoMercator(), // cylindrical projection
        d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
        d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
        d3.geoConicEqualArea(), //equal-area conic projection
        d3.geoEquirectangular(), //Cylindrical Projections
        d3.geoOrthographic()
    ]
    
    const geoPath_generator = d3.geoPath()
        .projection(projections[3].fitSize([width-margin,height-margin], geojson))
    
    const colorInterpolator = d3.interpolateRgbBasis(['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'].reverse())
        // if the data is scaled using log scale
    const logScale = d3.scaleLog()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['FIPS_STCO']
        }))
    // if the data is scaled using linear scale
    const linearScale = d3.scaleLog()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['FIPS_STCO']
        }))
  
    const tooltip = d3.select("#tooltip_4");
   

    svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", d => geoPath_generator(d))
        
        .attr("fill", d => colorInterpolator(linearScale(d['properties']['FIPS_STCO'])))
        .on("mouseenter", (m, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9)
                tooltip.html(d.properties.TOWN + '<br>FIPS_STCO:' + d.properties.FIPS_STCO)
                .style("left", m.clientX + "px")
                .style("top", m.clientY + "px");
        })
        .on("mousemove", (m, d) => {
            tooltip.style("opacity", .9)
        })
        .on("mouseout", (m, d) => {
            tooltip.transition()
                .duration(400)
                .style("opacity", 0)
        })

    }
    generateMap4(topology_data,".fig4",svgWidth,svgHeight)


    // gini index mapped

    const giniData2017 = csv_data.filter(d => d.year == 2017);

    // Convert Gini Data to a Map for easy lookup
    const giniMap = new Map(giniData2017.map(d => [parseInt(d['id'].split('US')[1]), +d['Estimate!!Gini Index']]));

    const features = topology_data.objects.ma.geometries;

    features.forEach(function(feature) {
        const FIPS_STCO = feature.properties.FIPS_STCO;
        if (giniMap.has(FIPS_STCO)) {
            feature.properties.gini_index = giniMap.get(FIPS_STCO);
            console.log(feature)
        }
        else{
            console.log("eror")
        }
    });

    const generateMap5 = (topo_data, containerName, width, height, margin = 30) => {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);

        const geojson = topojson.feature(topo_data, topo_data.objects.ma);

        const projections = [
            d3.geoAzimuthalEqualArea(),
            d3.geoAlbersUsa(),
            d3.geoAlbers(),
            d3.geoMercator(),
            d3.geoNaturalEarth1(),
            d3.geoEqualEarth(),
            d3.geoConicEqualArea(),
            d3.geoEquirectangular(),
            d3.geoOrthographic()
        ];

        const geoPath_generator = d3.geoPath()
            .projection(projections[3].fitSize([width - margin, height - margin], geojson));

        // const colorInterpolator = d3.interpolateRgbBasis(['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'])




        const colorInterpolator = d3.interpolateRgbBasis(['#d73027','#fc8d59','#fee090','#e0f3f8','#91bfdb','#4575b4'].reverse())
        // if the data is scaled using log scale
        // const colorInterpolator = d3.interpolateRgbBasis(['#fee8c8', '#fdbb84', '#e34a33']); // Change these colors as per your preference
        const logScale = d3.scaleLog()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['gini_index']
        }))
    // if the data is scaled using linear scale
    const linearScale = d3.scaleLinear()
        .domain(d3.extent(geojson.features, (d) => {
            return d['properties']['gini_index']
        }))

        const tooltip = d3.select("#tooltip_5");

        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", d => geoPath_generator(d))
            // .attr("fill", d => colorInterpolator(d['properties']['gini_index']))
            .attr("fill", d => colorInterpolator(linearScale(d['properties']['gini_index']))) 
            .on("mouseenter", (m, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.properties.TOWN + '<br>Gini Index: ' + d.properties.gini_index)
                    .style("left", m.clientX + "px")
                    .style("top", m.clientY + "px");
            })
            .on("mousemove", (m, d) => {
                tooltip.style("opacity", .9);
            })
            .on("mouseout", (m, d) => {
                tooltip.transition()
                    .duration(400)
                    .style("opacity", 0);
            });
    }

    generateMap5(topology_data, ".fig5", svgWidth, svgHeight);
});


    /////