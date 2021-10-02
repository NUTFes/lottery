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
    var message = document.createElement('p')
    var content = document.createTextNode(json.message)
    message.appendChild(content)
    disp_ws_txt.appendChild(message)
  }
  if( json.place_id==PLACE_ID && json.client=="NFC" )
    disp_ws_txt.innerHTML = json.message

  scrollToBottom();
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

var scrollToBottom = () => {
  var contentSpace = document.getElementById('comment-space');
  contentSpace.scrollTop = contentSpace.scrollHeight;
};

var isScrollBottom = () => {
  return contentSpace.scrollHeight === contentSpace.scrollTop + contentSpace.offsetHeight;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
  sendMessage(e);
});