import type { NextPage } from 'next'
import MobileLayout from '../components/MobileLayout'

// import '/static/js/jquery-3.6.0.min.js'
// import "/static/js/odometer.js"
// import "/static/js/websocket.js"

function Home() {
  // // グローバル変数定義
  // var PLACE_ID = Number('1')
  // var WS_URL = "ws://localhost:8000"
  // var WS_URI = `${WS_URL}/ws`
  // var APP_URL = "http://localhost:8000"
  // var APP_URI = `${APP_URL}`


  // var dialog = document.querySelector('dialog')
  // var btn_show = document.getElementById('show')
  // var btn_close = document.getElementById('close')
  // btn_show.addEventListener('click', function () {
  //   dialog.showModal()
  // }, false)
  // btn_close.addEventListener('click', function () {
  //   dialog.close()
  // }, false)


  // setTimeout(function () {
  //   $('.odometer').html(<div id='number'></div>)
  // }, 1000) /* ←回転するまでの時間(1000の時1秒) */

  // window.odometerOptions = {
  //   format: '(ddd).dd'
  // }

  // fetch(`${APP_URL}/api/place/${PLACE_ID}/winner`)
  //   .then(response => response.json())
  //   .then((data) => {
  //     for (let i = 0; i < data.length; i++) {
  //       let table = document.getElementById('targetTable')
  //       let newRow = table.insertRow()
  //       let newCell
  //       let newText
  //       // newCell = newRow.insertCell();
  //       // newText = document.createTextNode(" ");
  //       // newCell.appendChild(newText);
  //       newCell = newRow.insertCell()
  //       newText = document.createTextNode(String(i + 1))
  //       newCell.appendChild(newText)

  //       newCell = newRow.insertCell()
  //       newText = document.createTextNode(data[i].number)
  //       newCell.appendChild(newText)

  //       // newCell = newRow.insertCell();
  //       // newText = document.createTextNode(" ");
  //       // newCell.appendChild(newText);
  //     }
  //   })


  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Stickee｜抽選結果</title>
        <link rel="stylesheet" href="/static/css/reset.css" />
        <link rel="stylesheet" href="/static/css/odometer-theme-slot-machine.css" />
        <link rel="stylesheet" href="/static/css/comment.css" />
        <link rel="stylesheet" href="/static/css/custom-mobile.css" />
      </head>
      <body>
        <div className="odometer-container">


          <img src="/static/images/bg_corner.png" className="corner1" />
          <img src="/static/images/bg_corner.png" className="corner2" />
          <img src="/static/images/bg_corner.png" className="corner3" />
          <img src="/static/images/bg_corner.png" className="corner4" />
          <div className="righttopcorner"></div>
          <img src="/static/images/side.png" className="center3" />
          <img src="/static/images/Lotelly.png" className="center2" />
          {/* <span className="odometer">
            77777777
          </span> */}
          <img src="/static/images/side.png" className="center3" />
          <img src="/static/images/Results.png" className="center1" />

          <br /><br />
          <table id="targetTable" className="design">
            <thead>
              <tr>
                <th className="word1"><br />当選番号<hr color="gold" /></th>
                <th className="word2"><br />学籍番号<hr color="gold" /></th>
              </tr>
            </thead>
          </table>
          <dialog className="comment-dialog">
            <h1 className="comment-title">コメント入力欄</h1>
            <br />
            <div id="comment-space">
              <p id="messages" />
            </div>
            <br />
            <form id="form">
              <input type="text" id="messageText" autoComplete="off" />
              <button id="send-btn">送信</button>
            </form>
            <br />
            <div className="comment">
              <button className="comment-btn" id="close" type="button">コメントを閉じる</button>
            </div>
          </dialog>
          <div className="comment">
            <button className="comment-btn" id="show" type="button">コメントはこちらから</button>
          </div>
          <br /><br /><br />
          <img src="/static/images/up.png" className="center4" />
        </div>
      </body>
    </>
  )
}

export default Home
