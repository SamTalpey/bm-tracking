// JS file for config to be copied into and loaded by main file
// Surveys created using surveyjs.io/create-survey
// Note: surveys should use Jquery and a bootstrap framework
// ============================================================

// Exporting config info as module
export {exitSurveyJSON, observationJSON, spreadsheetURI, coordFileName, imageFileName, imageWidth, imageHeight, imageScale, markerRadius};

// Exit Survey in JSON form
var exitSurveyJSON = {"title":"Room 3 Disposable","description":"Survey Questionnaire","pages":[{"name":"page1","elements":[{"type":"radiogroup","name":"question1","title":"How often in the last 12 months have you visited the British Museum, except today? ","choices":["Never","Once","Twice","3-5 times","6-10 times","More often"]},{"type":"text","name":"question2","title":"Apart from today when was your last visit?","description":"(DD/MM/YY)"},{"type":"boolean","name":"question3","title":"Have you visited a different display in this room before (on another occasion)?","labelTrue":"Yes","labelFalse":"No"},{"type":"comment","name":"question4","visibleIf":"{question3} = true","title":"If yes, can you please tell me the display’s title or what it was about?","enableIf":"{question3} = true"},{"type":"boolean","name":"question5","visibleIf":"{question3} = false","title":"On this occasion today, did you intend to visit this room or did you just wander in?","enableIf":"{question3} = false","labelTrue":"Wandered in","labelFalse":"Intended"},{"type":"radiogroup","name":"question6","visibleIf":"{question5} = true","title":"Why did you decide to visit the display today? ","enableIf":"{question5} = true","hasOther":true,"choices":["The title banner","The objects","The poster"],"otherText":"Other, if so what?"},{"type":"radiogroup","name":"question7","visibleIf":"{question5} = false","title":"How did you find out about this display before your visit?","enableIf":"{question5} = false","hasOther":true,"choices":["British Museum website","Recommendation by friend/family member","What’s on Guide","Poster","Display screens","Information point","Chance visit","Social Media","Press","British Museum magazine"],"otherText":"Other","colCount":2},{"type":"comment","name":"question8","title":"Please give three words that you feel best describe the display that you’ve just visited."},{"type":"rating","name":"question9","title":"On a scale on 0-5 how interesting did you find this Room 3 exhibition?","rateMin":0,"minRateDescription":"Lowest","maxRateDescription":"Highest"},{"type":"rating","name":"question10","title":"On a scale on 0-5 to what extent do you feel you have learned something new as a result of visiting Disposable?","rateMin":0,"minRateDescription":"Lowest","maxRateDescription":"Highest"},{"type":"rating","name":"question11","title":"On a scale on 0-5 how important do you feel it is for the Museum to engage with contemporary topics like this?","rateMin":0,"minRateDescription":"Lowest","maxRateDescription":"Highest"},{"type":"rating","name":"question12","title":"On a scale on 0-5 to how coherent and clear was the overall design and narrative of the display?","rateMin":0,"minRateDescription":"Lowest","maxRateDescription":"Highest"},{"type":"comment","name":"question13","title":"Which aspects of the display did you find most interesting?"},{"type":"comment","name":"question14","title":"Please suggest one way in which this display could have been improved."},{"type":"boolean","name":"question15","title":"Would you recommend a visit to this display?","labelTrue":"Yes","labelFalse":"No"},{"type":"radiogroup","name":"question16","title":"How long have you spent in Room 3 this visit?","choices":["Walkthrough","Less than 5 minutes","5-10 minutes","10+ minutes"]},{"type":"boolean","name":"question17","title":"Do you know who the sponsor of this display is?","labelTrue":"Yes","labelFalse":"No"},{"type":"boolean","name":"question18","title":"Asahi Shimbun is the sponsor, have you heard of them before?","labelTrue":"Yes","labelFalse":"No"},{"type":"boolean","name":"question19","title":"Would you visit an Asahi Shimbun display again?","labelTrue":"Yes","labelFalse":"No"},{"type":"comment","name":"question20","title":"Which is your nationality and native language?"},{"type":"checkbox","name":"question21","title":"Who are you visiting the museum with today?","choices":["Alone","Children","Friends","Partner/Wife or Husband/Siblings","Organised Group"]},{"type":"radiogroup","name":"question22","title":"Which age range do you fall into?","choices":["18-19","20-24","25-34","35-44","45-54","55-59","60-64","65+","Prefer not to say"],"colCount":3},{"type":"radiogroup","name":"question23","title":"How do you identify?","hasOther":true,"choices":["Male","Female"],"otherText":"I prefer to identify another way"},{"type":"comment","name":"question24","title":"Finally, is there anything that you’d like to say to the Museum about this particular display or the themes it explores? "}]}]};

// Observation survey in JSON form
var observationJSON = {"title":"Room 3 Disposable","description":"Observations","pages":[{"name":"page1","elements":[{"type":"comment","name":"question1","title":"Notes","placeHolder":"notes"},{"type":"radiogroup","name":"question2","title":"Visiting with","defaultValue":"item1","choices":["Alone","With other adults","With children or adults+children"]},{"type":"boolean","name":"question3","title":"Did they go behind the screen?","labelTrue":"Yes","labelFalse":"No"}]}]};

// Other variables
const spreadsheetURI = 'https://script.google.com/macros/s/AKfycby-VIBUUesAfypbDOTFlfcSE2cNLfTUXftB-XlcfQVDfZX8LtQe/exec',
      coordFileName = 'room3CoordsClean.csv',
      imageFileName = 'room3FloorPlan.png',
      imageWidth = 980,
      imageHeight = 1066,
      imageScale = 0.5,
      markerRadius = 10;

// /**
//  * Macro code for Google Sheets
//  * Must be deployed as macro, see README
//  * LEAVE COMMENTED HERE
//  */
// function doGet(e) {
//   var lock = LockService.getDocumentLock();
//   lock.waitLock(10000);
//   console.log()
  
//   try {
//     // Check if observation or exit survey
//     var keys = Object.keys(e.parameter);
//     var isLive = keys.includes('display');
//     var row = [];
    
//     // Extract specific fields (e.g. name, date, display)
//     row[0] = e.parameter['name'];
//     row[1] = e.parameter['date'];
//     if(isLive) {row[2] = e.parameter['display'];}
    
//     // Fill in all question values
//     // NOTE: Built to handle up to 30 questions
//     for(var i = 1; i < 31; i++) {
//       row[i + 2] = e.parameter['question' + i];
//     }
    
//     // Get bound spreadsheet and append to correct sheet
//     var ss = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = ss.getSheets()[(isLive ? 0 : 1)];
//     sheet.appendRow(row);
//   }
  
//   catch (error) {console.error(error);}
//   finally {lock.releaseLock();}
//   return ContentService.createTextOutput('Data Appended:' + row.toString());
// }
