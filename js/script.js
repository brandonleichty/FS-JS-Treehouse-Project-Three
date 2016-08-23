/* Global Variables -------------------------------- */
var otherField = '<div id="otherFieldDiv"><input type="text" id="other-title" placeholder="Your Title"></div>';


/* DOM append -------------------------------- */
$("#title").after(otherField);

$("#otherFieldDiv").hide();

//shows the "Your Title" text entry field when "other" is selected
$("#title").change(function() {
  if ($("#title").val() === "other") {
      $("#otherFieldDiv").show();
    } else {
      $("#otherFieldDiv").hide();
  }
});
