// JS file for observation sheet/exit interviews
// =============================================

// Variables for use
const localStorage = window.localStorage,
      coordFileName = 'room3CoordsClean.csv',
      imageFileName = 'room3FloorPlan.png',
      imageScale = 0.5,
      markerRadius = 10;

// Generate page
window.onload = function() {
  console.log(!!d3);
  console.log('Initializing page');
  toggleSheet(0);
  loadImage();
  //loadCoords();
};

/**
 * Function to toggle the type of observations on the sheet
 * Call with true for live observations, and false for init observations
 */
const toggleSheet = function(isLive) {
  console.log('Toggling sheet');
  let observiewSheet = document.getElementById('obserview-sheet');
  observiewSheet.innerHTML = '';
  let clearBtn = document.getElementById('obserview-clearbtn');
  let submitBtn = document.getElementById('obserview-submitbtn');
  let observationsBtn = document.getElementById('obserview-observationsbtn');

  // Setting up live observation form
  if(isLive) {
    // Create clock/stopwatch
    // TODO

    // Create element to indicate current display
    // TODO

    // Creating live observation submission form 
    // TODO make size of text box larger
    let liveInput = document.createElement('input');
    liveInput.id = 'obserview-liveInput';

    // Appending elements to sheet
    observiewSheet.innerHTML += 'Observation Notes: ';
    observiewSheet.append(liveInput);

    // Editing button onclicks/text
    // clearBtn.onclick = '';
    // submitBtn.onclick = '';
    // observationsBtn.onclick = 'toggleSheet(0)';

  }
  // Setting up initial observation form
  else {
    // Creating init observation elements
    // TODO: Make size of boxes larger
    let demographic = document.createElement('input');
    demographic.id = 'obserview-sheet-demographic';
    let size = document.createElement('input');
    size.id = 'obserview-sheet-size';
    let other = document.createElement('input');
    other.id = 'obserview-sheet-other';

    // Appending init observation elements
    observiewSheet.innerHTML = 'Demographic Notes: ';
    observiewSheet.append(demographic);
    observiewSheet.innerHTML += '<hr>Size: ';
    observiewSheet.append(size);
    observiewSheet.innerHTML += '<hr>Other Notes: ';
    observiewSheet.append(other);

    // Editing button onclicks/text
    console.log('changing buttons')
    // clearBtn.onclick = '';
    // submitBtn.onclick = '';
    observationsBtn.onclick = console.log('click');
    console.log(observationsBtn);
  }
};


/**
 * Function to load floor plan image and marking
 * TODO make images selectable
 */
const loadImage = function() {
  console.log('Adding floorplan image');
  // Creating SVG for image to be placed in
  let width = 980;
  let height = 1066;
  var svg = d3.select(document.getElementById('floorplan-image')).append('svg')
    .attr('width', width * imageScale).attr('height', height * imageScale);

  // Appending image
  svg.append('image')
    .attr('xlink:href', imageFileName)
    .attr('width', width * imageScale)
    .attr('height', height * imageScale)

  // Adding marker on click
  svg.on('click', function() {
    console.log('Adding marker to floorplan');
    let coords = d3.mouse(this);

    // Clear prev marker and add new one
    d3.selectAll('#dot')
      .remove()
    svg.append('circle')
      .attr('id', 'dot')
      .attr('cx', coords[0])
      .attr('cy', coords[1])
      .attr('r', markerRadius)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1)
    
    // Use location to find display
    getLocation(coords[0], coords[1])
  })
};

/**
 * Function to find the closest display to a marked location
 * Saves to window's local storage
 */
const getLocation = function(x, y) {
  console.log('Coordinates:', x, y);
  let maxDistance = 15;
  var result;

  // Unscaled pixel coords
  let xPx = x / imageScale;
  let yPx = y / imageScale;

  // Check each of the display coords from csv
  d3.csv(coordFileName).then(coords => {
    console.log('Loaded coordinates:', coords);

    // Find display closest to marker
    for(display in coords) {
      let dx = display.x - xPx;
      let dy = display.y - yPx;
      let distance = Math.sqrt((dx ** 2) + (dy ** 2));

      // Check if match is closest so far
      if(distance < maxDistance) {
        maxDistance = distance;

        // Check if display is within marker
        let left = (dx ** 2) + (dy ** 2);
        let right = markerRadius ** 2;
        if(left < right) {
          console.log('display found', display.display)
          result = display.display
        }
      }
    }

    // TODO do things with the result
    console.log('Closest match:', result)
  })
};

// /**
//  * Function to load the coordinate data for the floor plan
//  * Requires the file to be present at the same directory level
//  */
// const loadCoords = function() {
  // d3.csv(coordFileName).then(coords => {
  //   console.log(coords[0]);
  //   localStorage.setItem('displayCoords', coords) // NEEDS TO BE STRING
  // })
// };

/**
 * Function to begin the exit interview 
 * TODO
 */
const beginInterview = function() {
  // Update buttons and onclicks
  // Clear obserview-sheet
  // Prompt for interview template
  //  Display elapsed time
  // Update display with interview questions and text fields
  // Buttons should be clear, submit, init observations, grey out interview button
};
