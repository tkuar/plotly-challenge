// Display the default dashboard
function init() {
    // Select dropdown menus
    var dropdown = d3.select('#selDataset');

    // Request data from samples.json and return promise
    d3.json('data/samples.json').then(data => {
        // // Print data
        // console.log(data);
        var names = data.names;
        console.log(names);

        // Append sample name to dropdown
        names.forEach(function (name) {
            dropdown.append('option').text(name).property('value');
        });

        // Generate and display plots and demographics info corresponding to first ID
        plots(names[0]);
        demographics(names[0]);
    });
}

// Update plots/charts via change from HTML onchange Event Attribute i.e. event listener 
function optionChanged(id) {
    // Update plot based on value
    plots(id);
    // Update demographics based on value
    demographics(id);
}

// Create the Plots
function plots(id) {
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

        var topSampleValues = sampleValues.slice(0, 10);
        var topOtuIDs = otuIDs.slice(0, 10);
        var topOtuLabels = otuLabels.slice(0, 10);

        // Print top 10 sampleValues, otuIDs, otuLabels
        console.log(topSampleValues);
        console.log(topOtuIDs);
        console.log(topOtuLabels);

        // Create traces for bar chart and bubble chart
        var trace1 = {
            x: topSampleValues.reverse(),
            y: topOtuIDs.map(id => `OTU  ${id}`),
            type: 'bar',
            orientation: 'h',
            text: topOtuLabels,
            marker: {
                color: '#0082be'
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

        // Bonus: variable of washing frequency for selected individual
        var wFreq = data.metadata.filter(m => m.id === parseInt(id))[0].wfreq;
        // console.log(wFreq);

        // Bonus: create trce for gauge chart
        var trace3 = {
            domain: { x: [0, 1], y: [0, 1] },
            value: wFreq,
            title: { text: 'Belly Button Washing Frequency (Scrubs per Week)' },
            type: 'indicator',
            mode: 'gauge+number',
            gauge: {
                bar: { color: '#0082be' },
                axis: { range: [null, 9], tick0: 0, dtick: 'L1' },
                steps: [
                    { range: [0, 1], color: '#f1f8e9'},
                    { range: [1, 2], color: '#dcedc8' },
                    { range: [2, 3], color: '#c5e1a5' },
                    { range: [3, 4], color: '#aed581' },
                    { range: [4, 5], color: '#9ccc65' },
                    { range: [5, 6], color: '#8bc34a' },
                    { range: [6, 7], color: '#7cb342' },
                    { range: [7, 8], color: '#689f38'},
                    { range: [8, 9], color: '#558b2f' }
                ]
            }

        };

        // Bar chart and bubble chart data
        var barData = [trace1];
        var bubbleData = [trace2];

        // Gauge chart data
        var gaugeData = [trace3];

        // Set layout for bar chart and bubble chart
        var barLayout = {
            font: {
                family: 'Raleway, sans-serif'
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            },
            bargap: 0.05

        };

        var bubbleLayout = {
            xaxis: { title: 'OTU ID' },
            height: 650,
            width: 1200
        };

        // Bounus: set layout for gauge chart
        gaugeLayout = {
            width: 650, 
            height: 700, 
            margin: { t: 10, b: 10, l:25, r:250 } 
        }

        // Render the plots to respective div tag ids
        Plotly.newPlot('bar', barData, barLayout);
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Bonus: render gauge plot to div tag id gauge
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    });
}

// Add  information to Demographic Info panel
function demographics(id) {
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
        Object.entries(metadata[0]).forEach(([key, value]) => {
            demoInfo.append('h6').text(`${key}: ${value}`);
        });
    });
}

init();