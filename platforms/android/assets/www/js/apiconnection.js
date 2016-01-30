var baseUrl = "http://128.114.26.22:3000/api/users/";

function getUsers() {
  $.get( "localhost:3000/api/users", function( data ) {
    return data;
  });
}

function findIdByIdByPhone(phone) {

  var userId;
  var userInfo;
  alert("test alert");
  setTimeout(function(){
    var req = $.ajax({
      url: baseUrl,
      dataType: 'jsonp',
      timeout : 4000,
    });
    req.success(function(){
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

    });
  }, 3000);

  req.error(function() {
    alert('Oh noes!');
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
