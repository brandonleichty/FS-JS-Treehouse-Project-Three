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
