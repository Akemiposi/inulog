const hoslogKey = "hosLogs";
//＊＊＊＊＊ログセクション＊＊＊＊＊

$("#logForm").on("submit", function (e) {
  e.preventDefault(); //ページはリロードされず、値をJSで受け取って画面に返すのみ（まだデータベースがないからリロードされちゃダメ）

  // １、まず置き換える
  const date = $("#logDate").val();

  const memo_1 = $("#memo_1").val();
  const memo_2 = $("#memo_2").val();
  const memo_3 = $("#memo_3").val();
  const memo_4 = $("#memo_4").val();

  //２、ログを保存
  const logs = JSON.parse(localStorage.getItem(hoslogKey)) || [];

  const newLog = {
    date,
    memo_1,
    memo_2,
    memo_3,
    memo_4,
  };

  logs.push(newLog);
  localStorage.setItem(hoslogKey, JSON.stringify(logs));

  alert("保存しました");
  this.reset();
});

//３、ログを出力
$("#showLogs").on("click", function () {
  const logs = JSON.parse(localStorage.getItem(hoslogKey)) || [];
  if (logs.length === 0) {
    $("#logDisplay").html("ログはありません");
    return;
  }

  const html = logs
    .map((log, i) => {
      const getOrNA = (val) => (val ? val : "未入力");

      return `<div style="margin-bottom:10px;">
      <strong>日付:</strong> ${log.date}<br>
    
      <strong>症状:</strong> ${getOrNA(log.memo_1)}<br>
       <strong>検査:</strong> ${getOrNA(log.memo_2)}<br>
        <strong>薬:</strong> ${getOrNA(log.memo_3)}<br>
         <strong>診察:</strong> ${getOrNA(log.memo_4)}<br>
    </div>`;
    })
    .join(""); //文字列として表示する時にカンマを入れないようにする

  $("#logDisplay").html(html);
});
// 犬の画像を交互に切り替える
const $dogRunner = $("#dogRunner");
const dogImages = ["img/dog1.png", "img/dog2.png"];
let dogIndex = 0; //dog1からスタート

setInterval(() => {
  dogIndex = (dogIndex + 1) % dogImages.length;
  $dogRunner.attr("src", dogImages[dogIndex]);
}, 300); // 0.3秒ごとに犬画像を切り替え
