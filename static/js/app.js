// Display the default dashboard
function init(){
    // Select dropdown menus
    var dropdown = d3.select('#selDataset');

    // Request data from samples.json and return promise
    d3.json("data/samples.json").then(data => {
        // Print data
        console.log(data);

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
    d3.json("data/samples.json").then(data => {
        // Print data
        console.log(data);

        // Get sample data and filter for selected subject ID
        var samples = data.samples.filter(sample => sample.id === id);
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

        // Print top 10 sampleValues, otuIDs, otuLabels
        console.log(topSampleValues);
        console.log(topOtuIDs);
        console.log(topOtuLabels);
    })
}

// Add  information to Demographic Info panel
function demographics(id){

}

init();