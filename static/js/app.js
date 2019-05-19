// Assign the data from `data.js` to a descriptive variable
var sightings = data;

// Select the filter and show all buttons 
var btnFilter = d3.select("#filter-btn");
var btnAll = d3.select("#all-btn");

// Multifilter function
function multiFilter(array, filters) {
  const filterKeys = Object.keys(filters);
  // filters all elements passing the criteria
  return array.filter((item) => {
    // dynamically validate all filter criteria
    return filterKeys.every(key => {
      // ignores an empty filter
      if (!filters[key].length) return true;
      return filters[key].includes(item[key]);
    });
  });
}

// Function to handle input change
btnFilter.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the date input element and get the value property
  var inputDate = d3.select("#datetime");
  var inputDateValue = inputDate.property("value");
  // console.log(inputDateValue);

  // Select the city input element and get the value property
  var inputCity = d3.select("#city");
  var inputCityValue = inputCity.property("value").toLowerCase();
  // console.log(inputCityValue);

  // Select the city input element and get the value property
  var inputState = d3.select("#state");
  var inputStateValue = inputState.property("value").toLowerCase();
  // console.log(inputStateValue);

  // Define filters variable
  var filters = {
    datetime: inputDateValue,
    city: inputCityValue,
    state: inputStateValue
  };

  // Filter the data with multiFilter function
  var filteredSightings = multiFilter(sightings, filters);
  console.log(filteredSightings);

  // // Filter the data by date -- I ran this single filter before attempting multiple filters
  // var filteredSightings = sightings.filter(sighting => sighting.datetime === inputDateValue);
  // console.log(filteredSightings);

  // Assign table body to variable
  var tbody = d3.select("tbody");

  // Clear existing output 
  tbody.html("");

  // Create filtered table
  filteredSightings.forEach((filteredSighting) => {
    var trow = tbody.append("tr");
    Object.entries(filteredSighting).forEach(([key, value]) => {
      var td = trow.append("td");
      td.text(value);
    });
  });
});

// Function to show all
btnAll.on("click", function() {
  d3.event.preventDefault();
  
  // Assign table body to variable
  var tbody = d3.select("tbody");
  
  //Clear existing output
  tbody.html("");

  sightings.forEach((sighting) => {
    var trow = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var td = trow.append("td");
      td.text(value);
    });
  });
});

