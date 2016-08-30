/* Global Variables -------------------------------- */
var runningTotal = 0;

var otherField = '<input type="text" id="other-title" placeholder="Your Title">';

var totalField = "<p id='totalSection'>TOTAL $<span id='total'></span></p>";

var errofField = '<div id="infoError"><span>Oops!<br> Some required information is missing or incorrect.</span></div>';

var cardNum = $("#cc-num").val();

var mailInput = $("#mail").val();


var visaIndicator = new RegExp("^4");

var masterCardIndicator = new RegExp("^5[1-5]");

var amexIndicator = new RegExp("^3[47]");

var discoverIndicator = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");




/* DOM append -------------------------------- */
$("#title").after(otherField);

$("#other-title").hide();

$(".activities").after(totalField);

$("#totalSection").hide();

$("#colors-js-puns").hide();


$("#paymentArea").after(errofField);
$("#infoError").hide();

paymentSelector();



/* Event listeners -------------------------------- */

//validates all information is properly input into form before submitting
$("#registerButton").on("click", formValidation);

//updates cardNum variable on keyup
$("#cc-num").keyup(function(){

    cardNum = $("#cc-num").val();

    if (cardNum.match(visaIndicator) != null){
        $('#visa').css({"opacity":"1"});
    } else {
        $('#visa').css({"opacity":".25"});
    }

    if (cardNum.match(masterCardIndicator) != null){
        $('#mastercard').css({"opacity":"1"});
      } else {
        $('#mastercard').css({"opacity":".25"});
      }


    if (cardNum.match(amexIndicator) != null){
        $('#amex').css({"opacity":"1"});
      } else {
        $('#amex').css({"opacity":".25"});
      }

    if (cardNum.match(discoverIndicator) != null){
        $('#discover').css({"opacity":"1"});
      } else {
        $('#discover').css({"opacity":".25"});
      }

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
      $("#colors-js-puns").show(300);

  } else if ($("#design").val() === "heart js") {
      $("#color").append(p);
      p = $("#color > option:nth-of-type(-n + 3)").detach();
      $("#colors-js-puns").show(300);

  } else {
      $("#colors-js-puns").hide(300);
      $("#color").append(p);
      p = null;
  }
});

//disables Express Workshop when JS Frameworks is selected (conflicting times)
$('#js-frameworks').on('change',function(){
  if($(this).is(':checked')){
    $('#express').prop( "disabled", true );
    $('#express').parent().css({"opacity":".25"});
  } else {
    $('#express').prop( "disabled", false);
    $('#express').parent().css({"opacity":"1"});
  }
});

//disables JS Frameworks when Express is selected (conflicting times)
$('#express').on('change',function(){
  if($(this).is(':checked')){
    $('#js-frameworks').prop( "disabled", true );
    $('#js-frameworks').parent().css({"opacity":".25"});
  } else {
    $('#js-frameworks').prop( "disabled", false);
    $('#js-frameworks').parent().css({"opacity":"1"});
  }
});

//disables node.js Workshop when JavaScript Libraries is selected (conflicting times)
$('#js-libs').on('change',function(){
  if($(this).is(':checked')){
    $('#node').prop( "disabled", true );
    $('#node').parent().css({"opacity":".25"});
  } else {
    $('#node').prop( "disabled", false);
    $('#node').parent().css({"opacity":"1"});
  }
});

//disables JavaScript Libraries Workshop when node.js Workshop is selected (conflicting times)
$('#node').on('change',function(){
  if($(this).is(':checked')){
    $('#js-libs').prop( "disabled", true );
    $('#js-libs').parent().css({"opacity":".25"});
  } else {
    $('#js-libs').prop( "disabled", false);
    $('#js-libs').parent().css({"opacity":"1"});
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

      //$('#registerButton').css({"color":"#51b893"});
    console.log("SUBMITTED!");

  } else {
    highlightErrors();
    $("#infoError").slideDown(350);
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


function emailValidation(){

  var regExpression = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return regExpression.test(mailInput);

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
  } else if ($("#cvv").val().length !== 3) {
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


function highlightErrors(){

  if (cvvValidation() === false && $("#payment").val() === "credit card") {
    $('#cvvCol input').css('background-color', '#ff7373');
  } else {
    $('#cvvCol input').css('background-color', 'white');
  }

  if (zipValidation() === false && $("#payment").val() === "credit card") {
    $('#zipCol input').css('background-color', '#ff7373');
  } else {
    $('#zipCol input').css('background-color', 'white');
  }

  if (emailValidation() === false) {
    $('#mailCol input').css('background-color', '#ff7373');
  } else {
    $('#mailCol input').css('background-color', 'white');
  }

  if (nameValidation() === false) {
    $('#nameCol input').css('background-color', '#ff7373');
  } else {
    $('#nameCol input').css('background-color', 'white');
  }

  if (validCreditCard() === false && $("#payment").val() === "credit card") {
    $('#cardCol input').css('background-color', '#ff7373');
  } else {
    $('#cardCol input').css('background-color', 'white');
  }

  if (paymentValidation() === false) {
    $('#paymentDropdown select').css('border-color', '#ff7373');
  } else {
    $('#paymentDropdown select').css('border-color', '#6e56a4');
  }

  if (workshopValidation() === false) {
    $('.activities').children('label').css('color', '#ff7373');
  } else {
    $('.activities').children('label').css('color', 'white');
  }

}

function hideErrorMessage() {
    if ($("#infoError").is(":visible") === true) {
      $("#infoError").slideUp(350);
    }
}

//if the input background color is red (due to erros when user tries to submit),
//change the color back to white upon click
$('input').on('click', function(){
    if ($(this).css('background-color') === 'rgb(255, 115, 115)') {
        $(this).css('background-color', 'white');
    }

    if ($('.activities').children('label').css('color') === 'rgb(255, 115, 115)' && workshopValidation() === true) {
        $('.activities').children('label').css('color', 'white');
    }
    hideErrorMessage()
});

$('select').on('click', function(){
    if ($(this).css('border-color') === 'rgb(255, 115, 115)') {
        $(this).css('border-color', '#6e56a4');
    }
    hideErrorMessage()
});


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
