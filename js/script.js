/* Global Variables -------------------------------- */
var runningTotal = 0;

var otherField = '<input type="text" id="other-title" placeholder="Your Title">';

var totalField = "<p id='totalSection'>TOTAL $<span id='total'></span></p>";



/* DOM append -------------------------------- */
$("#title").after(otherField);

$("#other-title").hide();

$(".activities").after(totalField);

$("#totalSection").hide();


//shows the "Your Title" text entry field when "other" is selected
$("#title").change(function() {
  if ($("#title").val() === "other") {
      $("#other-title").show();
     } else {
      $("#other-title").hide();
   }
});


//shows the appropriate shirts based upon the design selection
var p;
$("#design").on("change", function() {

  if ($("#design").val() === "js puns") {
      $("#color").prepend(p);
      p = $("#color > option:nth-of-type(n + 4)").detach();

  } else if ($("#design").val() === "heart js") {
      $("#color").append(p);
      p = $("#color > option:nth-of-type(-n + 3)").detach();

  } else {
      $("#color").append(p);
      p = null;
  }
});

//disables Express Workshop when JS Frameworks is selected (conflicting times)
$('#js-frameworks').on('change',function(){
  if($(this).is(':checked')){
    $('#express').prop( "disabled", true );
  } else {
    $('#express').prop( "disabled", false);
  }
});

//disables JS Frameworks when Express is selected (conflicting times)
$('#express').on('change',function(){
  if($(this).is(':checked')){
    $('#js-frameworks').prop( "disabled", true );
  } else {
    $('#js-frameworks').prop( "disabled", false);
  }
});

//disables node.js Workshop when JavaScript Libraries is selected (conflicting times)
$('#js-libs').on('change',function(){
  if($(this).is(':checked')){
    $('#node').prop( "disabled", true );
  } else {
    $('#node').prop( "disabled", false);
  }
});

//disables JavaScript Libraries Workshop when node.js Workshop is selected (conflicting times)
$('#node').on('change',function(){
  if($(this).is(':checked')){
    $('#js-libs').prop( "disabled", true );
  } else {
    $('#js-libs').prop( "disabled", false);
  }
});



function updateRunningTotal(){

  runningTotal = 0; //reset runningTotal to 0

  $(".activities input").each(function(){
    if ($(this).prop( "checked" )) {
      runningTotal += parseInt($(this).val());
    }

    //this IF statement is to make sure the runningTotal doesn't display 0 before the "hide" animation runs. Simply for esthetic reasons
    if (runningTotal >= 100) {
      $("#total").html(runningTotal); //updates the total in the html
    }

});

}

$('.activities').children().on('change',function(){
  updateRunningTotal();

  if (runningTotal !== 0) {
    $("#totalSection").show(300);
  } else {
    $("#totalSection").hide(300);
  }
});



$("#payment").on("change", function() {

  if ($("#payment").val() === "credit card") {
      $("#credit-card").show();
      $("#paypal, #bitcoin").hide();
  } else if ($("#payment").val() === "paypal") {
      $("#paypal").show();
      $("#credit-card, #bitcoin").hide();
  } else {
      $("#bitcoin").show();
      $("#credit-card, #paypal").hide();

  }
});
