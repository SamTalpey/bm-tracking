// JS file for observation sheet/exit surveys
// =============================================

// Importing survey modules
import {exitSurveyJSON, observationJSON} from './survey.js';

// Variables for use
// TODO import these from survey file
const localStorage = window.localStorage,
      coordFileName = 'room3CoordsClean.csv',
      imageFileName = 'room3FloorPlan.png',
      imageWidth = 980,
      imageHeight = 1066,
      imageScale = 0.5,
      markerRadius = 10;

// Generate and set up page
window.onload = function() {
  console.log('Initializing page');
  // Setting button onclicks
  document.getElementById('obserview-observationbtn').addEventListener('click', function() {toggleSheet(1)}, false)
  document.getElementById('obserview-interviewbtn').addEventListener('click', function() {toggleSheet(0)}, false)
  document.getElementById('obserview-uploadbtn').addEventListener('click', function() {console.log('upload click')}, false)
  loadImage();
};

/**
 * Function to toggle the type of survey on the sheet
 * Call with true for observations, and false for exit survey
 */
const toggleSheet = function(isLive) {
  // Clear and remake correct survey
  document.getElementById('obserview-sheet').innerHTML = '';
  generateSurvey(isLive);
};

// ========================
// Floor Plan Functionality
// ========================

/**
 * Function to load floor plan image and marking
 * TODO make images selectable (i.e. multiple floor plans)
 */
const loadImage = function() {
  // Creating SVG for image to be placed in
  let width = imageWidth;
  let height = imageHeight;
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
      .attr('r', markerRadius + 'px')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1)
    
    // Use location to find display
    getLocation(coords[0], coords[1])
  })
};

/**
 * Function to find the closest display to a marked location
 * Saves to indicator on window under map
 */
const getLocation = function(x, y) {
  let maxDistance = 15;
  var result;

  // Unscaled pixel coords
  let xPx = x / imageScale;
  let yPx = y / imageScale;

  // Check each of the display coords from csv
  d3.csv(coordFileName).then(coords => {
    // Find display closest to marker
    for(let i = 0; i < coords.length; i++) {
      let dx = coords[i].x - xPx;
      let dy = coords[i].y - yPx;
      let distance = Math.sqrt((dx ** 2) + (dy ** 2));

      // Check if match is closest so far
      if(distance < maxDistance) {
        maxDistance = distance;

        // Check if display is within marker
        let left = (dx ** 2) + (dy ** 2);
        let right = (markerRadius * 2) ** 2;
        if(left < right) {
          console.log('Match found: Display', coords[i].display)
          result = coords[i].display
        }
      }
    }
    // Save the result
    console.log('Closest match:', result)
    document.getElementById('information-display').innerText = 'Current Display: ' + (result ? result : 'None');
  })
};

// ====================================
// Observation and Survey Functionality
// ====================================

// Applying theme
Survey.StylesManager.applyTheme('bootstrap');

/**
 * Function to enter the results into a google spreadsheet
 * @param results should include observations and an exit survey
 * TODO
 */
function enterResults(results) {
  console.log('Entering results:', results)
}

/**
 * Function to upload cached results when connected
 * Called manually by user after completing the exit survey
 * TODO
 */
function uploadResults(survey) {
  alert('The results are:' + JSON.stringify(survey.data));
};

/**
 * Function to cache results of an exit survey to be uploaded when connected
 * TODO
 */
function cacheExitSurvey(survey) {
  // Log results
  console.log('Caching exit survey results');
  console.log(survey.data);
};


/**
 * Function to cache observations made to be uploaded when connected
 * TODO
 */
function cacheObservation(observation) {
  // Log results
  console.log('Caching observation results');
  console.log(observation.data);

  // Attatch relevant data
  // e.g. Name, timestamp, display

  // Store observation
  localStorage.setItem('key', 'data');

  // Reset observation form
  toggleSheet(true);
};

/**
 * Function to display survey
 * Call with true for observations, false for exit survey
 */
function generateSurvey(isLive) {
  // Create survey object from correct imported JSON and add to div
  window.survey = new Survey.Model(isLive ? observationJSON : exitSurveyJSON);
  $("#obserview-sheet").Survey({
    model: survey,
    onComplete: (isLive ? cacheObservation : cacheExitSurvey)
  });
};
