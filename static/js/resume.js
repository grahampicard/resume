// Data imports
// Two objects are passed to our page through GOLANG
//   timelineData: entries for the timeline
//   mapData:      entries for the map

// 0. Declare SVG dimension
var margin = {top: 10, right: 10, bottom: 0, left: 10}
var timelineWidth = Math.min(window.innerWidth * 0.8, 550)
var height = 150

var mapWidth = Math.min(window.innerWidth * .8, 220)
var mapHeight = mapWidth * .625

// 1. Import timeline data
var parser = d3.timeParse("%Y-%m-%d")
var categories = [...new Set(timelineData.map((x) => x.Category))].sort()

timelineData.sort((i, j) => (i.ID > j.ID) ? 1 : -1)
    .forEach(function(x) {
    x.Beginning = parser(x.Beginning)
    if (x.Ending == "") { x.Ending = new Date() }
    else { x.Ending = parser(x.Ending) }
    })

// 3. Create axes for our timeline graph
var yearGenerator = function(x, i) {
    cur_year = i + start_year
    return {
        year: cur_year,
        date: new Date(cur_year, 0, 1)
    }
}

var start_year = 2010
var end_year = new Date().getFullYear() + 1
var axis = Array.from(new Array(end_year - start_year), yearGenerator)
var boundaries = d3.extent(axis, function(d) { return d.date })
var x_tick_start = 80

// 4. Create scales for our axes
var xScale = d3.scaleTime().rangeRound([x_tick_start, timelineWidth])
    xScale.domain(d3.extent(axis, function(d) { return d.date}))

var yScale = d3.scaleLinear()
    .domain([0, categories.length]) // input 
    .range([height, 0]); // output 

var y_start = height * 0.35
var y_space = (height - y_start) / categories.length
var ganttPadding = 2
    
// 5. Choose colors    
var gridlines = "#DEDEDE"
var labelColors = "#828282"
// var fillColorSelected = "#83b4d4"
var fillColorSelected = "#aed6b0"
var strokeSelected = "#EEE"
var fillColorUnselected = "#E9E9E9"
var strokeUnselected = "#CDCDCD"

// 6. Initialize selected item (most recent)
var selected = timelineData.length - 1
var selectedState = timelineData[selected].State

// 7. Initialize a line generator for axes
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 

// 8. Declare boundaries for X & y axis
var dataset = d3.range(boundaries[0] - boundaries[1])
    .map(function(d) { return {"y": d3.randomUniform(1)() } })

// 9. Create page elements:
// A. Timeline
var timelineContext = d3.select(".resume-gantt")
    .append("svg")
    .attr("width", timelineWidth + margin.left + margin.right)
    .attr("height", height)
    .append("g")

// add row-lines to separate categories
timelineContext.selectAll(".rowLines")
    .data(categories)
    .enter()
    .append("line")
    .attr("x1", 0)  // Line will have two coordinates: (x1, y1), (x2, y2)
    .attr("x2", timelineWidth + margin.left + margin.right)
    .attr("y1", function(d, i) { return (i + 0.5) * y_space + y_start })
    .attr("y2", function(d, i) { return (i + 0.5) * y_space + y_start })
    .attr("stroke", gridlines)
    .attr("stroke-width", 0.5)

// add column-lines to show years
timelineContext.selectAll(".colLines")
    .data(axis)
    .enter()
    .append("line")
    .attr("x1", function(d) { return xScale(d.date) })
    .attr("x2", function(d) { return xScale(d.date) })
    .attr("y2", y_space)
    .attr("y1", 2.5 * y_space + y_start)
    .attr("stroke", gridlines)
    .attr("stroke-width", 0.5)        

// add labels for each category
timelineContext.selectAll(".rowLabels")
    .data(categories)
    .enter()
    .append("text")
    .attr("class", "categoryLabels")
    .text(function(d) { return d })
    .attr("x", 0)
    .attr("y", function(d, i) { return (i + 0.5) * y_space + 0.9 * y_start })
    .attr("fill", labelColors)

// add year labels for the x axis
timelineContext.selectAll(".columnLabels")
    .data(axis)
    .enter()
    .append("text")
    .attr("class","axisLabels")
    .attr("x", function(d) { return xScale(d.date) })
    .attr("y", function(d, i) { return y_start * .3 })
    .attr("text-anchor","middle")
    .text(function(d, i) {if (i === 0) { return d.year } else { return d.year - 2000 }})
    .attr("fill", labelColors)

// 10. add gantt bars for each year
var timelineGanttLines = timelineContext.selectAll(".ganttLines")
    .data(timelineData)
    .enter()
    .append("rect")
    .attr("class", function(d,i){
        if (i === selected) { return "ganttRect ganttRectSelected" }
        else { return "ganttRect ganttRectUnselected" }
    })
    .attr("rx", 1)
    .attr("x", function(d) { return xScale(d.Beginning) + ganttPadding })
    .attr("width", function(d) { return xScale(d.Ending) - xScale(d.Beginning) - ganttPadding })
    .attr("y", function(d) { return (categories.indexOf(d.Category) - .375) * y_space + y_start})
    .attr("height", y_space * .75 )
    .style("cursor", "pointer")
    .attr("fill", function(d, i) {
        if (d.ID == selected) { return fillColorSelected }
        else { return fillColorUnselected }
    })
    .on("click", function(d, i) {
        selected = i;
        selectedState = d.State
        update();
    })

// 11 Add area for detail card
var detailContext = d3.select(".resume-detail")
var detailTitle = detailContext.append("h4")
    .text(timelineData[selected].Entry)

var detailDesc = detailContext.append("ul")
    .html(function() { 
        d = timelineData[selected]
        cur_array = d.Details.map(function(x) {return "<li>" + x + "</li>"})
        cur_string = cur_array.join("")
        return cur_string
    })

// 12. Add context for map
var mapContext = d3.select(".resume-map")

var mapTitle = mapContext.append("h4")
    .text(timelineData[selected].Location)

var mapSVG = mapContext.append("svg")
    .attr("width", mapWidth )
    // .attr("height", mapHeight )
    .append("g")

// 13. Add state states
var mapPlot = mapSVG.selectAll(".states")
    .data(mapData)
    .enter()
    .append("path")
    .attr("class","state")
    .attr("d",function(d) { return d.Data; })
    .attr("transform", "scale(" + mapHeight / 600 + ") translate(" + 9 + ", 0)")
    .style("fill", function(d, i) {
        if (selectedState.indexOf(d.ID) > -1) {
        return fillColorSelected
        } else {
        return fillColorUnselected
        }
    })
    .attr("stroke-width", function(d, i) {
        if (selectedState.indexOf(d.ID) > -1) { return 3 } else { return 1 }
    })
    .attr("stroke", function(d, i) {
        if (selectedState.indexOf(d.ID) > -1) {
        return strokeSelected
        } else {
        return strokeUnselected
        }
    })

// 14. Update function to change D3 design.
var update = function() {
    timelineGanttLines.transition()
        .duration(200)
        .attr("fill",function(d,i){
            if (i === selected) { return fillColorSelected }
            else { return fillColorUnselected }
        })
        .attr("class", function(d,i){
            if (i === selected) { return "ganttRect ganttRectSelected" }
            else { return "ganttRect ganttRectUnselected" }
        });

    detailTitle.transition()
        .text(timelineData[selected].Entry)

    detailDesc
        .html(function() { 
            d = timelineData[selected]
            cur_array = d.Details.map(function(x) {return "<li>" + x + "</li>"})
            cur_string = cur_array.join("")
            return cur_string
        })

    mapTitle.transition()
        .text(timelineData[selected].Location)

    mapPlot.transition()
        .duration(200)
        .style("fill", function(d, i) {
            if (selectedState.indexOf(d.ID) > -1) { return fillColorSelected } 
            else { return fillColorUnselected }
        })
        .attr("stroke-width", function(d, i) {
            if (selectedState.indexOf(d.ID) > -1) { return 3 } 
            else { return 1 }
        })
        .attr("stroke", function(d, i) {
            if (selectedState.indexOf(d.ID) > -1) { return strokeSelected } 
            else { return strokeUnselected }
        })
}
