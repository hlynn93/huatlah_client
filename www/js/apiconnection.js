var baseUrl = "http://169.233.185.145:3000/api/users/";

function getUsers() {
  $.get( "localhost:3000/api/users", function( data ) {
    return data;
  });
}

function findIdByIdByPhone(phone) {

  var userId;
  var userInfo;
  alert("test alert");
  $.ajax({
  url: baseUrl,
  dataType: 'json',
  async: false,
  success: function(data) {
    alert(JSON.stringify(data));
    $.each( data, function( key, val ) {
      $.each( val, function( key, user ) {

        if(typeof user._id != "undefined"){
            //console.log(JSON.stringify(user));
            var tempPhone, tempId;
            tempPhone = JSON.stringify(user.profile.phone);
            tempId = JSON.stringify(user._id);
            alert(tempId);
            if(tempPhone === String(phone)){
              userId = tempId;
              alert(tempId);
            }
        }
       });
    });
  }
  });
  if(userId){
    alert("User is found, ID: " + userId)
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
