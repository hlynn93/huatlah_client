// user_id = "fqwcK9bN7zCEreDvC";

user_id = "58SiAhdEYR6JBuyeg";

function activateCard(nfcEvent) {

    var phone = $("#phone-input").val();
    var current_balance = "0";
    //alert("fun alert");
    var userId = findIdByIdByPhone(phone);
    //alert(userId);
    if(userId === "0"){
      //alert("Phone number not found");
    }else{
      alert("ID number found! : " + userId);
      var record = ndef.textRecord(userId);
      nfc.write(
        [record],
        function () {
          current_balance = getCurrentBalance(userId);
          activateRemoveListener();
          alert("Card Activated. Current Balance: $" + current_balance);
        },
        function (reason) {
          activateRemoveListener();
          alert("fail");
        }
      );
    }
}

function addBalance(nfcEvent) {
  var userId = readTagId(nfcEvent);
  //alert("UserID : " + userId);
  var amount = parseInt($("#value-input").val());
  updateBalance(userId, amount);
  alert("Balance Updated!");
  addRemoveListener();
}

function getMeal(nfcEvent) {
  var tagId = readTagId(nfcEvent);
  var tagIdRegexed = tagId.replace(/\W/g, '');
  giveMeal(tagIdRegexed);

  mealRemoveListener();
}

function readTag(nfcEvent){
  var tag = nfcEvent.tag.ndefMessage[0]["payload"];
  var outputVal = nfc.bytesToString(tag);
  return parseInt(outputVal.replace(/\D/g,''));
}

function readTagId(nfcEvent){
  var tag = nfcEvent.tag.ndefMessage[0]["payload"];
  var outputVal = nfc.bytesToString(tag);
  return outputVal.replace('en','');
}


function makeTransaction(nfcEvent) {
  if(!$("#value-input").val()) {
      alert("Please input an amount");
  }
  else {
    var actual_amount = $("#value-input").val();
    var userId = readTagId(nfcEvent)
    //var previous_balance = getCurrentBalance(userId);
    var total_amount = Math.ceil(actual_amount)
    pushTransaction(userId, total_amount, actual_amount);
    alert("Transaction successful.");
    transactionRemoveListener();
  }
}

function addRemoveListener(){

  isWriting = false;
  nfc.removeNdefListener(
    addBalance
    ,
    function() {
      alert("listener sucessfully removed");
    },
    function() {
      alert("fails to remove listener");
    }
  );
}

function activateRemoveListener(){

  isWriting = false;
  nfc.removeNdefListener(
    activateCard
    ,
    function() {
      alert("listener sucessfully removed");
    },
    function() {
      alert("fails to remove listener");
    }
  );
}

function transactionRemoveListener(){

  isWriting = false;
  nfc.removeNdefListener(
    makeTransaction
    ,
    function() {
      alert("listener sucessfully removed");
    },
    function() {
      alert("fails to remove listener");
    }
  );
}

function mealRemoveListener(){

  isWriting = false;
  nfc.removeNdefListener(
    getMeal
    ,
    function() {
      alert("listener sucessfully removed");
    },
    function() {
      alert("fails to remove listener");
    }
  );
}
