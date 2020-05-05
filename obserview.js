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
  toggleSheet(0);
};

/**
 * Function to initialize observation sheet
 * May not be necessary due to toggleSheet(isLive)
 */
const initSheet = function() {

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

    // Create element to show current exhibit
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
    observiewSheet.innerHTML = 'Demographic: ';
    observiewSheet.append(demographic);
    observiewSheet.innerHTML += '<br><br>Size: ';
    observiewSheet.append(size);
    observiewSheet.innerHTML += '<br><br>Other Notes: ';
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
