// Display the default dashboard
function init(){
    // Select dropdown menus
    var dropdown = d3.select('#selDataset');

    // Request data from samples.json and return promise
    d3.json("data/samples.json").then(function(data){
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
    d3.json("data/samples.json").then(function(data){
        // Print data
        console.log(data);

        // Get sample data and filter for selected subject ID
        var samples = data.samples.filter(sample => sample.id === id);
        // Print sample data
        console.log(samples);

        // Get sample_values
        // Get otu_ids
        // Get otu_labels

    })
}

// Add  information to Demographic Info panel
function demographics(id){

}

init();