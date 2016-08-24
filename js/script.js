/* Global Variables -------------------------------- */
var otherField = '<input type="text" id="other-title" placeholder="Your Title">';


/* DOM append -------------------------------- */
$("#title").after(otherField);

$("#other-title").hide();

//shows the "Your Title" text entry field when "other" is selected
$("#title").change(function() {
  if ($("#title").val() === "other") {
      $("#other-title").show();
     } else {
      $("#other-title").hide();
   }
});


$("#design").on("change", function() {

  if ($("#design").val() === "js puns") {
      $("#color > option").siblings().prop( "disabled", false);
      $("#color > option:nth-of-type(n + 4)").prop( "disabled", true );
  } else if ($("#design").val() === "heart js") {
      $("#color > option").siblings().prop( "disabled", false);
      $("#color > option:nth-of-type(-n + 3)").prop( "disabled", true );
  } else {
      $("#color > option").siblings().prop( "disabled", false);
  }
});
