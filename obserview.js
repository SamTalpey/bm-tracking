// JS file for application logic and functionality
// ===============================================

// Importing config module
import {exitSurveyJSON, observationJSON, spreadsheetURI, coordFileName, imageFileName, imageWidth, imageHeight, imageScale, markerRadius} from './config.js';

// Init local storage and date
const localStorage = window.localStorage,
      initDate = new Date();

// Variable for CSV data to be loaded into
var coordData = [];

// Generate and set up page
window.onload = function() {
  console.log('Initializing page');
  console.log(initDate);
  // Setting button onclicks
  document.getElementById('obserview-observationbtn').addEventListener('click', function() {toggleSheet(1)}, false)
  document.getElementById('obserview-interviewbtn').addEventListener('click', function() {toggleSheet(0)}, false)
  document.getElementById('obserview-uploadbtn').addEventListener('click', function() {uploadResults()}, false)
  loadImage();
  loadCSV();
};

/**
 * Function to toggle the type of survey on the sheet
 * Call with true for observations, and false for exit survey
 */
const toggleSheet = function(isLive) {
  // Ensure a name/ID is present first
  if(document.getElementById('information-name').value === '') {
    alert('Please enter the name of the observer or a group name');
    return;
  }

  // Ensure valid buttons are enabled
  document.getElementById('obserview-observationbtn').disabled = isLive;
  document.getElementById('obserview-interviewbtn').disabled = !isLive;

  // Clear and remake correct survey
  document.getElementById('obserview-sheet').innerHTML = '';
  generateSurvey(isLive);
};

// ========================
// Floor Plan Functionality
// ========================

/**
 * Function to load coordinates from CSV file
 * Necessary for offline use
 */
const loadCSV = function() {
  // Load CSV using d3
  d3.csv(coordFileName).then(coords => {
    for(let i = 0; i < coords.length; i++) {
      coordData[i] = coords[i];
    }
  })
  // Logging recorded coordinates
  console.log('Coords loaded:', coordData)
};

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

  // Find display closest to marker
  for(let i = 0; i < coordData.length; i++) {
    let dx = coordData[i].x - xPx;
    let dy = coordData[i].y - yPx;
    let distance = Math.sqrt((dx ** 2) + (dy ** 2));
    // Check if match is closest so far
    if(distance < maxDistance) {
      maxDistance = distance;
      // Check if display is within marker
      let left = (dx ** 2) + (dy ** 2);
      let right = (markerRadius * 2) ** 2;
      if(left < right) {
        console.log('Match found: Display', coordData[i].display)
        result = coordData[i].display
      }
    }
  }

  // Save the result
  console.log('Closest match:', result)
  document.getElementById('information-display').innerText = 'Current Display: ' + (result ? result : 'None');
};

// =============================
// Data Management Functionality
// =============================

/**
 * Function to return array of all elements in local storage
 */
function getLocalStorage() {
  let storageArray = [];
  for(let i = 0; i < localStorage.length; i++) {
    let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
    storageArray.push(item);
  }
  console.log('Found local items:', storageArray);
  return storageArray;
};

// Function to encode parameters into URI for google sheets
const encodeParams = (p) => 
Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

/**
 * Function to enter the results into a google spreadsheet
 * Called automatically after verifying connection
 */
async function enterResults() {
  let results = getLocalStorage();

  // Get individual parameters for each item
  for(let i = 0; i < results.length; i++) {
    let params = results[i];

    // Fetch request to google sheets macro using URI parameters
    fetch(spreadsheetURI + "?" + encodeParams(params)).then(res => {
      if(res.status === 200) {
        // Clear local storage item by key
        console.log('Data successfully entered, removing item');
        localStorage.removeItem(params.date);
      }
    })
  }

  // Enable going back to observations screen
  document.getElementById('obserview-observationbtn').disabled = false;
};

/**
 * Function to upload cached results when connected
 * Called manually by user after completing the exit survey
 */
function uploadResults() {
  // Check if any data exists
  if(localStorage.length === 0) {alert('No cached data to upload')}
  // Ensure user is connected before uploading
  let online = window.navigator.onLine;
  if(online) {enterResults()}
  else {alert('No connection detected, upload aborted')}
};

// ====================================
// Observation and Survey Functionality
// ====================================

// Applying theme
Survey.StylesManager.applyTheme('bootstrap');

/**
 * Function to cache observations made to be uploaded when connected
 */
function cacheObservation(observation) {
  let data = observation.data;

  // Attatch relevant data (Name, display, date/time)
  data.name = document.getElementById('information-name').value;
  let displayStringSplit = (document.getElementById('information-display').innerText).split(' ');
  data.display = displayStringSplit[displayStringSplit.length - 1];
  let dateStringSplit = (new Date()).toString().split(' ');
  let dateString = dateStringSplit[0].concat(' ', dateStringSplit[1], ' ', dateStringSplit[2], ' ', dateStringSplit[3], ' ', dateStringSplit[4]);
  data.date = dateString;

  // Store observation using date as unique key
  console.log('Caching observation results:', data);
  localStorage.setItem(dateString, JSON.stringify(data));

  // Reset observation form
  toggleSheet(true);
};

/**
 * Function to cache results of an exit survey to be uploaded when connected
 */
function cacheExitSurvey(survey) {
  let data = survey.data;

  // Attatch relevant data (Name, date/time)
  data.name = document.getElementById('information-name').value;
  let dateStringSplit = (new Date()).toString().split(' ');
  let dateString = dateStringSplit[0].concat(' ', dateStringSplit[1], ' ', dateStringSplit[2], ' ', dateStringSplit[3], ' ', dateStringSplit[4]);
  data.date = dateString;

  // Store survey using date as unique key
  console.log('Caching exit survey results:', data);
  localStorage.setItem(dateString, JSON.stringify(data));
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
