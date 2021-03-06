//Getting html element and accessing it in the js
var dateField = document.getElementById("currentDay");

//Getting current timeusning moment.js
var currentHour = moment().hour()-8;
var tasks = [];
//Getting items from local storage

//Using mmoment library gets current date and time and Formats it in the order we want to display it.//
var currentTime = moment();
var formattedCurrentDate = moment(currentTime).format("dddd, MMMM Do");
//Set content value to the date field element*/
dateField.textContent = formattedCurrentDate;



//adding clicke lister to entire div instead of just a button
$(".saveBtn").click(function () {
  //  alert("div is clicked");
  // console.log(currentHour);
  var index = $(".saveBtn").index(this);
  tasks[index] = $(this).parent().find(".task-item").text();
  //var savedTasks = JSON.parse(localStorage.getItem(tasks));
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  retrieveTasks();
  //console.log(currentHour);
  //console.log(savedTasks);

  //console.log(index);
  //timeBlockHours();
});

// function retrieveRecords(){ //retrieves items in the localStorage
//     var key = document.getElementById('retrieveKey').value; //gets key from user
//     console.log("retrive records");
//     var records = window.localStorage.getItem(key); //searches for the key in localStorage
//     var paragraph = document.createElement("p");
//     var infor = document.createTextNode(records);
//     paragraph.appendChild(infor);
//     var element = document.getElementById("retrieve");
//     element.appendChild(paragraph);

//retrieving tasks from local storage
var retrieveTasks = function(){
    var taskItem = document.getElementById('.task-item').value;
    var listOfTasks = window.localStorage.getItem(taskItem);
    var description = document.createElement(listOfTasks);
    taskItem.append(description);

}


//Load tasks function
var loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = {};
  }
};

//Change time block hours
var timeBlockHours = function () {

  for (var i = 1; i < 10; i++) {
    var taskBlock = $("#task-"+i);
    if (currentHour > i) {
      $(taskBlock).addClass("past");
    } else if (currentHour === i) {
      $(taskBlock).addClass("present");
    } else {
      $(taskBlock).addClass("future");
    }
  }
};

//updating task logic starts here
$(".description").on("click", "p", function () {
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("form-control").val(text);

  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

//Task needs to be updated
$(".description").on("blur", "textarea", function () {
  //get the textareas user input from above code
  var text = $(this).val().trim();
  var taskParagraph = $("<p>").addClass("taskItem").text(text);

  // replace textarea with p element to fill in the div containing the paragraph
  $(this).replaceWith(taskParagraph);
});

setInterval(function () {
  timeBlockHours();
}, 1000 * 60 * 60);

loadTasks();
timeBlockHours();
retrieveTasks();