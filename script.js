// get the current date and time using Day.js
var currentDay = dayjs().format("dddd, MMMM D");

// display the current date in the header
$("#currentDay").text(currentDay);

// function to update the background color of the time-block divs
function updateTimeBlocks() {
  // get the current hour using Day.js
  var currentHour = dayjs().hour();


 // loop through each time-block div
 $(".time-block").each(function () {
  // get the hour from the div's id attribute
  var blockHour = parseInt($(this).attr("id").split("-")[1]);
  // check if the block hour is in the past, present, or future
  if (blockHour < currentHour) {
    $(this).removeClass("present future").addClass("past");
  } else if (blockHour === currentHour) {
    $(this).removeClass("past future").addClass("present");
  } else {
    $(this).removeClass("past present").addClass("future");
  }
});
}

// call updateTimeBlocks to update the colors on page load
updateTimeBlocks();

// update the colors every hour
setInterval(updateTimeBlocks, 60 * 60 * 1000);

// function to load saved events from local storage
function loadEvents() {
  $(".description").each(function () {
    var id = $(this).parent().attr("id");
    $(this).val(localStorage.getItem(id));
  });
}

// function to save events to local storage
function saveEvent() {
  var id = $(this).parent().attr("id");
  var value = $(this).siblings(".description").val();
  localStorage.setItem(id, value);
}

// load saved events on page load
loadEvents();

// save events when save button is clicked
$(".saveBtn").on("click", saveEvent);