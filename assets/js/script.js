// refs to DOM
var container = document.getElementById("container");
var item = document.getElementById("item");
var timeContainer = document.getElementsByClassName("time-container");
//current time
var currentTime = moment();
//class to color row
var rowClass = "present";
//to make past events readonly
var readOnly = "";

// array of moment.js object for work hours
var hours = [moment("09:00a", "HH:mm a"),moment("10:00a", "HH:mm a"),moment("11:00a", "HH:mm a"),moment("12:00p", "HH:mm a"),moment("1:00p", "HH:mm a"),
moment("2:00p", "HH:mm a"),moment("3:00p", "HH:mm a"),moment("4:00p", "HH:mm a"),moment("5:00p", "HH:mm a")];

// set the current day
$( "#currentDay" ).text(currentTime.format("MMM, DD, YYYY - hh:mm a"));
// console.log(currentTime._d)
 
//creates the elements for each hour
$.each( hours, function( index, value ){
  var rowTime = this; 
  //check the time and set the class
  if (rowTime.isAfter(currentTime)){
    //console.log(value._i + " " + "it worked")
    rowClass="future";
  }
  else if(rowTime.format("hh") === currentTime.format("hh") ){
    rowClass="present";
  }
  else{
    rowClass="past";
    //make past event readonly
    var readOnly = "readonly";
  }
  // create the row template
  var template = `
    <section class="row ${rowClass}" id="item-${value._i}">
      <div class="col-3 time-block hour">
        <p class="time-container">${value._i}</p>
      </div>
      <div class="col-8">
        <textarea id="text-${value._i}" data-store="${value._i}" name="${value._i}" ${readOnly} col="50" class="user-input">
          Enter a task and click the icon to save.
        </textarea>
      </div>
      <div class="col-1 save-but">
        <i class="fa fa-save" id="but-${value._i}" data-button="${value._i}"></i>
     </div>
    </section>
    `;
  //puts template on page
  container.insertAdjacentHTML("beforeend", template);
  //check local storage for stored values
  $("*[data-store]").each(function () {
    $(this).val(localStorage.getItem($(this).attr("data-store")));
  });

  //this is for storing a value in local storage on keyup, not needed but kinda cool
  // $("*[data-store]").on("keyup", function (itm) {
  //   localStorage.setItem ($(this).attr("data-store"), $(this).val());
  // })
});
//when click save values to local storage
$(document).on("click",".fa-save", function () {
    var clickedBtnData = $(this).attr('data-button');
    // console.log('you clicked on button ' + clickedBtnData);
    var updatedContentKey = $(this).parents("section").find(".user-input");
    var updatedContentValue = $(this).parents("section").find(".user-input").val();
    var myUpdatedContentValue = updatedContentKey[0].name;
    // console.log("#text-" + clickedBtnData);
    // console.log(updatedContentKey);
    localStorage.setItem (myUpdatedContentValue, updatedContentValue);
    console.log(updatedContentKey[0].name);
  });