/* Global Variables -------------------------------- */
var runningTotal = 0;

var otherField = '<input type="text" id="other-title" placeholder="Your Title">';

var totalField = "<p id='totalSection'>TOTAL $<span id='total'></span></p>";

var cardNum = $("#cc-num").val();

var mailInput = $("#mail").val();

/* DOM append -------------------------------- */
$("#title").after(otherField);

$("#other-title").hide();

$(".activities").after(totalField);

$("#totalSection").hide();

paymentSelector();



/* Event listeners -------------------------------- */

//validates all information is properly input into form before submitting
$("#registerButton").on("click", formValidation);

//updates cardNum variable on keyup
$("#cc-num").keyup(function(){
    cardNum = $("#cc-num").val();
})

//updates mailInput variable on keyup when user types in email
$("#mail").keyup(function(){
    mailInput = $("#mail").val();
})

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


$('.activities').children().on('change',function(){
  updateRunningTotal();

  if (runningTotal !== 0) {
    $("#totalSection").show(300);
  } else {
    $("#totalSection").hide(300);
  }
});



$("#payment").on("change", paymentSelector);


function paymentSelector(){

  if ($("#payment").val() === "credit card") {
      $("#credit-card").show();
      $("#paypal, #bitcoin").hide();
  }
  if ($("#payment").val() === "paypal") {
      $("#paypal").show();
      $("#credit-card, #bitcoin").hide();
  }
  if ($("#payment").val() === "bitcoin") {
      $("#bitcoin").show();
      $("#credit-card, #paypal").hide();
  }
  if ($("#payment").val() === "select_method") {
      $("#credit-card, #paypal, #bitcoin").hide();
  }
}



/* Functions -------------------------------- */


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



function formValidation(){

  if (nameValidation() &&
      paymentValidation()  &&
      workshopValidation() &&
      cvvValidation() &&
      zipValidation() &&
      validCreditCard() &&
      emailValidation()) {
    console.log("SUBMITTED!");
  } else {
    console.log("MISSING INFORMATION");
  }

}


//validates there is a name in the name field
function nameValidation(){
  if ($("#name").val() !== "") {
    return true;
  } else {
    return false;
  }
}

//validates thee is a payment method selected
function paymentValidation(){
  if ($("#payment").val() !== "select_method") {
    return true;
  } else {
    return false;
  }
}

//validates at least one workshop is selected
function workshopValidation(){
  if ($(".activities input").is(':checked') !== false) {
    return true;
  } else {
    return false;
  }
}

//validates there is a three digit cvv
function cvvValidation(){
  if ($("#cvv").val().length === 3) {
    return true;
  } else {
    return false;
  }
}

//validates there is a three digit cvv
function zipValidation(){
  if ($("#zip").val().length === 5) {
    return true;
  } else {
    return false;
  }
}




// takes the form field value and returns true on valid number
function validCreditCard() {

  cardNum = cardNum.replace(/\D/g, "");
  //checks to make sure card number is between 15-16 numbers (VISA, MasterCard, Discover, and AMEX)
  if (cardNum.length < 15 || cardNum.length > 16) {
        return false;
      }
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(cardNum)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;


	for (var n = cardNum.length - 1; n >= 0; n--) {
		var cDigit = cardNum.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}


//call on page load -- credit card is set as "selected" in html
paymentSelector();


function emailValidation(){

  var regExpression = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return regExpression.test(mailInput);

}
