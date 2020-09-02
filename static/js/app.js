// Display the default dashboard
function init(){
    // Select dropdown menus
    var dropdown = d3.select('#selDataset');

    // Request data from samples.json and return promise
    d3.json('data/samples.json').then(data => {
        // // Print data
        // console.log(data);

        // Append sample name to dropdown
        data.names.forEach(function(name){
            dropdown.append('option').text(name).property('value');
        });

        // Generate and display plots and demographics info corresponding to first ID
        plots(data.names[0]);
        demographics(data.names[0]);
    });
}
// Update plots/charts via change from HTML onchange Event Attribute i.e. event listener 
function optionChanged(id){
    // Update plot based on value
    plots(id);
    // Update demographics based on value
    demographics(id);
}


// Create the Plots
function plots(id){
    // Request data from samples.json and return promise
    d3.json('data/samples.json').then(data => {
        // Print data
        console.log(data);

        // Get sample data and filter by selected subject ID
        var samples = data.samples.filter(s => s.id === id);
        // Print sample data
        console.log(samples);

        // Get sample_values
        var sampleValues = samples[0].sample_values;
        // Get otu_ids
        var otuIDs = samples[0].otu_ids;
        // Get otu_labels
        var otuLabels = samples[0].otu_labels;

        // // Print sampleValues, otuIDs, otuLabels
        // console.log(sampleValues);
        // console.log(otuIDs);
        // console.log(otuLabels);

        var topSampleValues= sampleValues.slice(0,10);
        var topOtuIDs = otuIDs.slice(0,10);
        var topOtuLabels = otuLabels.slice(0,10);

        // // Print top 10 sampleValues, otuIDs, otuLabels
        // console.log(topSampleValues);
        // console.log(topOtuIDs);
        // console.log(topOtuLabels);

        // Create traces for bar chart and bubble chart
        var trace1 = {
            x: topSampleValues.reverse(),
            y: topOtuIDs.map(id => "OTU " + id),
            type: 'bar',
            orientation: 'h',
            text: topOtuLabels,
            marker: {
                color: topOtuIDs
            }
        };

        var trace2 = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: { 
                color: otuIDs,
                size: sampleValues
            }
        };

        // Bar chart and bubble chart data
        var barData = [trace1];
        var bubbleData = [trace2];

        // Set layout for bar chart and bubble chart
        var barLayout = {
            font:{
              family: 'Raleway, sans-serif'
            },
            bargap :0.05

        };

        var bubbleLayout = {
            xaxis:{title: 'OTU ID'},
            height: 600,
            width: 1200
        };

        // Render the plots to respective div tag ids
        Plotly.newPlot('bar', barData, barLayout);
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
}

// Add  information to Demographic Info panel
function demographics(id){
    // Select Demographics Info panel
    var demoInfo = d3.select('#sample-metadata');

    // Request data from samples.json and return promise
    d3.json('data/samples.json').then(data => {
        // Get metadata and filter by selected subject ID
        var metadata = data.metadata.filter(m => m.id === parseInt(id));

        // // Print metadata
        // console.log(metadata[0]);

        // Clear data in Demographics Info panel
        demoInfo.html('');

        // Append metadata keys and values to Demographics Info panel
        Object.entries(metadata[0]).forEach(([key,value]) => {
            demoInfo.append('h6').text(`${key}: ${value}`);
        });
    });
}

init();