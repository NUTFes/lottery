//モジュールの読み込み
var http = require('http');
var fs = require('fs');

//HTTPサーバを生成
var server = http.createServer(function(req,res){
  var path = '';
  var encoding;

  //拡張子を取得
  var fileName = req.url;
  var type = fileName.split('.');

  //MIMEタイプ
  var mime = {
    'html':'text/html',
    'css' :'text/css',
    'js'  :'text/javascript',
    'jpg' :'image/jpeg',
    'jpeg':'image/jpeg',
    'png' :'image/png',
    'ico' :'image/x-icon'
  };

  switch(key = type[type.length - 1]){
    case 'html':
    case 'js'  :
    case 'css' :
      path += fileName;
      encoding = 'utf-8';
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'ico':
      path += fileName;
      encoding = 'binary';
      break;

    default:
      key = 'html'
      path += '/index.html';
      encoding = 'utf-8';
  };
  console.log(key)

  res.writeHead(200,{'Content-Type' : mime[key]});
  console.log(__dirname + path + ',' +encoding);
  res.end(fs.readFileSync(__dirname + path), encoding);
}).listen(8888);

console.log('INFO:     Server running https://lottery-api.nutfes.net/');