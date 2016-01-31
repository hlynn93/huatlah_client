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



$(document).off('click', '#add-balance').on('click', '#add-balance', function(event) {
  if(!$("#value-input").val()){
    alert("Please input a value to write");
  }
  else {
      // addBalance();

      // inputVal = $("#value-input").val();
      nfc.addNdefListener(
        addBalance,
        function() {
            alert("Close this and ready to tap!");
        },
        function() {
            alert("please try again.");
        }
      );

  }
});


$(document).off('click', '#activate-card').on('click', '#activate-card', function(event) {
  if(!$("#phone-input").val()){
    alert("Please input phone number");f
  }
  else{

      inputVal = $("#phone-input").val();
      nfc.addNdefListener(
        activateCard,
        function() {
            alert("Close this and ready to tap!");
        },
        function() {
            alert("please try again.");
        }
      );
    }
});

$(document).off('click', '#make-payment').on('click', '#make-payment', function(event) {
  if(!$("#value-input").val()){
    alert("Please input a value to write");
  }
  else{

      // makeTransaction()
      nfc.addNdefListener(
        makeTransaction,
        function() {
            alert("Close this and ready to tap!");
        },
        function() {
            alert("please try again.");
        }
      );

    }
});


$(document).off('click', '#get-meal').on('click', '#get-meal', function(event) {
    nfc.addNdefListener(
      getMeal,
      function() {
          alert("Close this and ready to tap!");
      },
      function() {
          //alert("please try again.");
      }
    );

});

// Helper functions
