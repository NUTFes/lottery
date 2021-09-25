if(disp_ws_num=document.getElementById('number'))
  disp_ws_num.innerHTML = "77777777"
if(disp_ws_txt=document.getElementById('messages'))
  disp_ws_txt.innerHTML = "Yey! You're on Stickee!"

var ws = new WebSocket(WS_URI);
ws.onmessage = function(event) {
  var json = JSON.parse(event.data)
  if( json.place_id==PLACE_ID && json.client=="Random" ){
    setTimeout(function(){
			$('.odometer').html(json.message);
		}, 1000);
  }
  if( json.place_id==PLACE_ID && json.client=="Host"){
    var message = document.createElement('li')
    var content = document.createTextNode(json.message)
    message.appendChild(content)
    disp_ws_txt.appendChild(message)
  }
  if( json.place_id==PLACE_ID && json.client=="NFC" )
    disp_ws_txt.innerHTML = json.message
};

function sendMessage(event) {
  var input = document.getElementById("messageText")
  var data = {
    place_id: PLACE_ID,
    client  : "Host",
    message : input.value
  }
  var json = JSON.stringify(data)
  ws.send(json)
  input.value = ''
  event.preventDefault()
}