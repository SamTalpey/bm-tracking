// JS file for observation sheet/exit interviews
// =============================================

// Variables for use
// var observiewSheet = document.getElementById('obserview-sheet');
// var clearBtn = document.getElementById('obserview-clearbtn');
// var submitBtn = document.getElementById('obserview-submitbtn');
// var observationsBtn = document.getElementById('obserview-observationsbtn');
// var interviewBtn = document.getElementById('obserview-interviewbtn');

// Generate page
window.onload = function() {
  console.log('Initializing page');
  initSheet();
};

/**
 * Function to initialize observation sheet
 * Prompts for non-timestamped data 
 */
const initSheet = function() {
  console.log('Initializing obserview-sheet');

  // Creating init observation elements
  // TODO: Make size of boxes larger
  let demographic = document.createElement('input');
    demographic.id = 'obserview-sheet-demographic';
  let size = document.createElement('input');
    size.id = 'obserview-sheet-size';
  let other = document.createElement('input');
    other.id = 'obserview-sheet-other';

  // Appending init observation elements
  let observiewSheet = document.getElementById('obserview-sheet');
  observiewSheet.innerHTML = 'Demographic: ';
  observiewSheet.append(demographic);
  observiewSheet.innerHTML += '<br><br>Size: ';
  observiewSheet.append(size);
  observiewSheet.innerHTML += '<br><br>Other Notes: ';
  observiewSheet.append(other);

  // Display boxes allowing for input of demographic, size, and other notes
  // Buttons should be clear, submit, live observations, and interview
};

/**
 * Function to toggle the type of observations on the sheet
 * Call with true for live observations, and false for init observations
 */
const toggleSheet = function(isLive) {
  // Update button text and onclick
  // Clear obserview-sheet
  // Fill in with correct format
  //  Reference init observations if relevant
};


/**
 * Function to begin the exit interview 
 */
const beginInterview = function() {
  // Update buttons and onclicks
  // Clear obserview-sheet
  // Prompt for interview template
  //  Display elapsed time
  // Update display with interview questions and text fields
  // Buttons should be clear, submit, init observations, grey out interview button
};
