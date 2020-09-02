// Display the default dashboard
function init(){
    // Select dropdown menus
    var dropdown = d3.select('#selDataset');

    // Request data and return promise
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

}

// Add  information to Demographic Info panel
function demographics(id){

}

init();