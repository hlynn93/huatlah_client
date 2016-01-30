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
        $.mobile.allowCrossDomainPages = true;
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {

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

$( "#activate-card" ).bind( "click", function(event, ui) {
  if(!$("#phone-input").val()){
    alert("Please input phone number");f
  }
  else{
    if(!isWriting){
      isWriting = true;
      inputVal = $("#phone-input").val();
      nfc.addNdefListener(
        activateCard,
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
