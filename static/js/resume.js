async function run() {
    // Data imports
    // 0. Declare SVG dimension
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = Math.min(window.innerWidth * 0.8, 650),
        height = 220
  
    var mapWidth = Math.min(window.innerWidth * .8, 350),
        mapHeight = mapWidth * .625
  
    // 1. Import timeline data
    var parser = d3.timeParse("%Y-%m-%d"),
        timelineData = await d3.json("api/timeline"),
        categories = [...new Set(timelineData.map((x) => x.Category))].sort()
  
    timelineData.sort((i, j) => (i.ID > j.ID) ? 1 : -1)
      .forEach(function(x) {
        x.Beginning = parser(x.Beginning)
        if (x.Ending == "") { x.Ending = new Date() }
        else { x.Ending = parser(x.Ending) }
      })
  
    // 2. Import map data
    var mapData = await d3.json("api/map")
  
    // 3. Create axes for our timeline graph
    var yearGenerator = function(x, i) {
      cur_year = i + start_year
      return {
        year: cur_year,
        date: new Date(cur_year, 0, 1)
      }
    }
  
    var start_year = 2010,
        end_year = new Date().getFullYear() + 1,
        axis = Array.from(new Array(end_year - start_year), yearGenerator),
        boundaries = d3.extent(axis, function(d) { return d.date }),
        x_tick_start = 100
  
    // 4. Create scales for our axes
    var xScale = d3.scaleTime().rangeRound([x_tick_start, width])
        xScale.domain(d3.extent(axis, function(d) { return d.date}))
  
    var yScale = d3.scaleLinear()
      .domain([0, categories.length]) // input 
      .range([height, 0]); // output 
  
    var y_start = height * 0.35,
        y_space = (height - y_start) / categories.length,
        ganttPadding = 1.5
        
    // 5. Choose colors    
    var gridlines = "#DEDEDE",
        labelColors = "#828282",
        fillColorSelected = "#00adef",
        strokeSelected = "#83c9f4",
        fillColorUnselected = "#E9E9E9",
        strokeUnselected = "#CDCDCD"
  
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
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
  
    // add row-lines to separate categories
    timelineContext.selectAll(".rowLines")
        .data(categories)
        .enter()
        .append("line")    
        .attr("x1", 0)  // Line will have two coordinates: (x1, y1), (x2, y2)
        .attr("x2", width)
        .attr("y1", function(d, i) { return (i + 0.5) * y_space + y_start })
        .attr("y2", function(d, i) { return (i + 0.5) * y_space + y_start })
        .attr("stroke", gridlines)
        .attr("stroke-width", 0.5)
  
    // add labels for each category
    timelineContext.selectAll(".rowLabels")
        .data(categories)
        .enter()
        .append("text")
        .attr("class","categoryLabels")
        .text(function(d) { return d})
        .attr("x", 0)
        .attr("y", function(d, i) { return (i + 0.5) * y_space + 0.9 * y_start })
        .attr("fill", labelColors)
  
    // add year labels for the x axis
    timelineContext.selectAll(".columnLabels")
        .data(axis)
        .enter().append("text")
        .attr("class","axisLabels")
        .attr("x", function(d) { return xScale(d.date) })
        .attr("y", function(d, i) { return y_start * .3 })
        .attr("text-anchor","middle")
        .text(function(d) { return d.year - 2000 })
        .attr("fill", labelColors)
  
    // 10. add gantt bars for each year
    var timelineGanttLines = timelineContext.selectAll(".ganttLines")
        .data(timelineData)
        .enter()
        .append("rect")
        .attr("class","ganttRect")
        .attr("rx", 1)
        .attr("x", function(d) { return xScale(d.Beginning) + ganttPadding })
        .attr("width", function(d) { return xScale(d.Ending) - xScale(d.Beginning) - ganttPadding })
        .attr("y", function(d) { return (categories.indexOf(d.Category) - .375) * y_space + y_start})
        .attr("height", y_space * .75 )
        .attr("stroke-opacity", 1)
        .style("stroke-width", 2)
        .style("cursor", "pointer")
        .attr("stroke", function(d, i) {
        if (d.ID == selected) { return strokeSelected } 
        else { return strokeUnselected }
        })
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
    var detailEntries = detailContext.selectAll(".details")
      .data(timelineData)
      .enter()
      .append("div")
      .html(function(d) { 
          title = "<h3>" + d.Entry + "</h3>"
          cur_array = d.Details.map(function(x) {return "<li>" + x + "</li>"})
          cur_string = title + "<ul>" + cur_array.join("") + "</ul>"
          return cur_string
      })
      .attr("class", function(d, i) {
          if (i === selected) { return "show" } else { return "hidden" }
      })
      .style("opacity", function(d, i) { 
          if (i === selected) { return 1 } else { return 0 }
      })
      .style("display", function(d, i) {
          if (i === selected) { return "block" } else { return "none" }
      })
  
    // 12. Add context for map
    var mapContext = d3.select(".resume-map")
      .append("svg")
      .attr("width", mapWidth + margin.left + margin.right)
      .attr("height", mapHeight + margin.top + margin.bottom)
      .append("g")
  
    // 13. Add state states
    var mapPlot = mapContext.selectAll(".states")
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
            if (selectedState.indexOf(d.ID) > -1) {
            return 3
            } else {
            return 1
            }
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
        .attr("stroke", function(d, i) {
        if (i === selected) { return strokeSelected }
        else { return strokeUnselected }
        })
        .attr("fill",function(d,i){
        if (i === selected) { return fillColorSelected }
        else { return fillColorUnselected }
        });
  
    detailEntries.transition()
        .duration(400)
        .attr("class", function(d, i) {
        if (i === selected) { return "show" } else { return "hidden" }
        })
        .style("opacity", function(d, i) {
        if (i === selected) { return 1 } else { return 0 }
        })
        .style("display", function(d, i) {
        if (i === selected) { return "block" } else { return "none" }
        })
  
        mapPlot.transition()
        .duration(400)
        .style("fill", function(d, i){
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
  }
  run()