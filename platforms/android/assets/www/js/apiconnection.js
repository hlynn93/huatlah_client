// var baseUrl = "http://128.114.26.26:3000/api/users/";
// var updateFundUrl = "http://128.114.26.26:3000/fund/update/";
// var updateUserUrl = "http://128.114.26.26:3000/users/addTransaction/";
// var addBalanceUserUrl = "http://128.114.26.26:3000/users/addBalance/";
// var transactionUrl = "http://128.114.26.26:3000/api/transactions/";
// var fundUrl = "http://128.114.26.26:3000/api/fund/";

var baseUrl = "http://128.114.26.22:3000/api/users/";
var updateFundUrl = "http://128.114.26.22:3000/fund/update/";
var updateUserUrl = "http://128.114.26.22:3000/users/addTransaction/";
var addBalanceUserUrl = "http://128.114.26.22:3000/users/addBalance/";
var transactionUrl = "http://128.114.26.22:3000/api/transactions/";
var fundUrl = "http://128.114.26.22:3000/api/fund/";
var needyUrl = "http://128.114.26.22:3000/needy/getMeal/";


function findIdByIdByPhone(phone) {

  var userId;
  $.ajax({
  url: baseUrl,
  dataType: 'json',
  async: false,
  success: function(data) {
    $.each( data, function( key, val ) {
      $.each( val, function( key, user ) {
        if(typeof user._id != "undefined"){
            var tempPhone, tempId;
            tempPhone = JSON.stringify(user.profile.phone);
            tempId = JSON.stringify(user._id);
            if(tempPhone.replace(/\W/g, '') == phone.toString()){
              userId = tempId.replace(/\W/g, '');
            }
          }
       });
    });
  }
  });
  if(userId){
    return userId;
  }
  else{
    return "0";
  }

}

function getUserById(id){
  var requestUri = baseUrl + id;
  $.getJSON( baseUrl, function( data ) {
    return data;
  });
}

function getCurrentBalance(id) {
  var curBalance = 0;
  $.ajax({
  url: baseUrl + id,
  dataType: 'json',
  async: false,
  success: function(data) {
    $.each( data, function( key, user ) {
      if(typeof user._id != "undefined"){
        curBalance = JSON.stringify(user.profile.moneybalance);
        //alert(curBalance);
      }
    });
  }
  });
  return curBalance;
}

function pushTransaction(userId, totalAmount, actualAmount) {
  var diff = (parseFloat(totalAmount) - parseFloat(actualAmount)).toString();
  console.log(" userID : " + userId + " | totalAmount : " + totalAmount + " | actualAmount: " + actualAmount + " | diff: " + diff);
  var current_balance = "0";

  $.ajax({
    type: "POST",
    url: transactionUrl,
    dataType: 'json',
    data: { "customer_id": userId, "totalAmount" : totalAmount, "actualAmount" : actualAmount, "diffAmount" : diff },
    async: false,
    success: function(data) {
      console.log("Transaction");
      updateUser(userId, totalAmount, diff);

      current_balance = getCurrentBalance(userId);
    }
  });
  return current_balance;
}

function updateUser(userId, totalAmount, diff){
  userId = userId.replace(/\W/g, '');
  var userInfo;
  var rPoints=0, mBalance=0;
  $.ajax({
    type: "GET",
    url: baseUrl + userId,
    dataType: 'json',
    async: false,
    success: function(data) {
      userInfo = data.data;
      console.log(" FIRST ONE" + JSON.stringify(userInfo));
      rPoints = Math.round(parseInt(diff*10));
      mBalance = parseInt(totalAmount);
      userInfo.profile.rewardpoints = rPoints;
      userInfo.profile.moneybalance = mBalance;
      console.log(JSON.stringify(userInfo));
    }
  });
  $.ajax({
    type: "PUT",
     url: updateUserUrl + userId,
     dataType: 'json',
     data: userInfo.profile,
     async: false,
     success: function(data){
       console.log("User Updated");
     }
 });
 updateFund(diff);
}

function updateFund( diffAmount) {
  var fund;
  var fundId;
  $.ajax({
    type: "GET",
    url: fundUrl,
    dataType: 'json',
    async: false,
    success: function(data) {
      fund = data.data[0];
      fundId = fund._id;
      console.log("FUND ID: " + fundId);
      fund.amount += parseInt(diffAmount);
      console.log("FUND AMOUNT: " + JSON.stringify(fund.amount));
    }
  });
  $.ajax({
    type: "PUT",
     url: fundUrl + fundId,
     dataType: 'json',
     data: { amount: fund.amount },
     async: false,
     success: function(data){
       console.log("FUND UPDATED");
     }
 });
}

function updateBalance (userId, amount) {
  var userInfo;
  var mBalance=0;
  userId = userId.replace(/\W/g, '');

  $.getJSON( baseUrl + userId )
    .done(function( json ) {
      //alert( "JSON Data: " + JSON.stringify(json) );
      userInfo = json.data;
      userInfo.profile.moneybalance = amount;
      $.ajax({
        type: "PUT",
         url: addBalanceUserUrl + userId,
         dataType: 'json',
         data: userInfo.profile,
         async: false,
         success: function(data){

         }
     });
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      alert( "Request Failed: " + err );
  });
}

function giveMeal(nId) {
  $.ajax({
    type: "GET",
    url: needyUrl + nId,
    async: false,
    success: function(data) {
      alert("Order Accepted");
    }
  });
}
