/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var inputVal;
var isWriting = false;


$( "#add-balance" ).bind( "click", function(event, ui) {
  if(!$("#value-input").val()){
    alert("Please input a value to write");
  }
  else {
    if(!isWriting){
      isWriting = true;
      inputVal = $("#value-input").val();
      nfc.addNdefListener(
        addBalance,
        function() {
            alert("Listening for tags.");
        },
        function() {
            alert("please try again.");
        }
      );
    }
  }
});

$( "#make-payment" ).bind( "click", function(event, ui) {
  if(!$("#value-input").val()){
    alert("Please input a value to write");
  }
  else{
    if(!isWriting){
      isWriting = true;
      inputVal = $("#value-input").val();
      nfc.addNdefListener(
        makeTransaction,
        function() {
            alert("Listening for tags.");
        },
        function() {
            alert("please try again.");
        }
      );
    }
  }

});

$( "#create-balance" ).bind( "click", function(event, ui) {
  if(!$("#value-input").val()){
    alert("Please input a value to write");
  }
  else{
    if(!isWriting){
      isWriting = true;
      inputVal = $("#value-input").val();
      nfc.addNdefListener(
        createBalance,
        function() {

            alert("Listening for tags.");
        },
        function() {
            alert("please try again.");
        }
      );
    }
  }
});

$( "#get-meal" ).bind( "click", function(event, ui) {
  if(!isWriting){
    isWriting = true;
    nfc.addNdefListener(
      getMeal,
      function() {
          alert("Listening for tags.");
      },
      function() {
          alert("please try again.");
      }
    );
  }
});

// Helper functions
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

function createBalance(nfcEvent) {

    var record = ndef.textRecord(inputVal);
    nfc.write(
      [record],
      function () {
        createRemoveListener();
        alert("New balance added. Current Balance: $" + inputVal);
      },
      function (reason) {
        createRemoveListener();
        alert("fail");
      }
    );
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

function createRemoveListener(){

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
