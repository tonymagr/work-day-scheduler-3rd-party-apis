// Declare variables for save text and storage operations 
let timeBlock, eventText, timeBlockHour, savedEvent;

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
  
// Function def: Set appropriate past, present, and future background colors to time of day rows.
function setRowColor (rowTime) {
  // Convert PM times to military (24-hour) times for comparison
  let rowTime24 = rowTime;
  if (rowTime < 6) {
    rowTime24 = rowTime + 12;
  }
  // Set row color
  // Note date format H is military/24-hour hour
  // Note performing non-strict == comparison for "present" due to differing data types
  let currentHour = dayjs().format('H');
  if (rowTime24 < currentHour) {
    $("#hour-" + rowTime).addClass("past");
  } else if (rowTime24 == currentHour) {
    $("#hour-" + rowTime).addClass("present");
  } else {
    $("#hour-" + rowTime).addClass("future");
  }
}

function formatPage() {
  // Call to set appropriate past, present, and future background colors to time of day rows.
  for (let i = 1; i < 6; i++) {
    setRowColor(i);
  }
  for (let i = 9; i < 13; i++) {
    setRowColor(i);
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Load saved events from local storage and populate textareas
  // --------------
  // Amninder Singh of Aug-23 FS Bootcamp provided assistance with forEach usage & sample code
  // --------------
  document.querySelectorAll(".time-block").forEach((timeBlock) => {
    timeBlockHour = timeBlock.id;
    savedEvent = localStorage.getItem(timeBlockHour);
    if (savedEvent !== null) {
      timeBlock.children[1].value = savedEvent;
    }
  });

  // Event listener for save buttons
  // --------------
  // Amninder Singh of Aug-23 FS Bootcamp provided assistance with forEach usage & sample code
  // --------------
  document.querySelectorAll(".saveBtn").forEach((saveBtn) => {
    saveBtn.addEventListener("click", function () {
      timeBlock = this.parentElement;
      eventText = timeBlock.children[1].value;
      timeBlockHour = timeBlock.id;
      // Save the event text to local storage with a key based on the time block hour
      localStorage.setItem(timeBlockHour,eventText);
    });
  });
}

//
// TODO: Add code to display the current date in the header of the page.
$('#currentDay').text(dayjs().format("dddd, MMMM D, YYYY"));

formatPage();