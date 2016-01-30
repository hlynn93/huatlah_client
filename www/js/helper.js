function makeTransaction(nfcEvent) {
  var previous_balance = readTag(nfcEvent);
  var amount = parseInt(inputVal);
  var current_balance = previous_balance - amount;
  var record = ndef.textRecord(String(current_balance));
  nfc.write(
    [record],
    function () {
      transactionRemoveListener();
      alert("Transaction Successful. Current Balance: $" + String(current_balance));
    },
    function (reason) {
      transactionRemoveListener();
      alert("fail");
    }
  );
}

function activateCard(nfcEvent) {

    var phone = $("#phone-input").val();
    alert("fun alert");
    var userId = findIdByIdByPhone(phone);
    alert(userId);
    if(userId === "0"){
      alert("Phone number not found");
    }else{
      alert("ID number found! : " + userId);
      var record = ndef.textRecord(userId);
      nfc.write(
        [record],
        function () {
          activateRemoveListener();
          alert("Card Activated. Current Balance: $" + "0");
        },
        function (reason) {
          activateRemoveListener();
          alert("fail");
        }
      );
    }
}

function addBalance(nfcEvent) {
  var previous_balance = readTag(nfcEvent);
  var amount = parseInt(inputVal);
  var current_balance = previous_balance + amount;
  var record = ndef.textRecord(String(current_balance));
  nfc.write(
    [record],
    function () {
      addRemoveListener();
      alert("Balance Added. Current Balance: $" + String(current_balance));
    },
    function (reason) {
      addRemoveListener();
      alert("fail");
    }
  );
}

function getMeal(nfcEvent) {
  var tagId = readTagId(nfcEvent);
  alert(tagId);
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
    createBalance
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

function findUserIdByEmail(email) {
  var userJSON = getUsers();
  console.log(JSON.stringify(userJSON))
}
