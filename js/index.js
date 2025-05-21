const logKey = "healthLogs"; //healthLogsを全部「logKey」とする

// ＊＊＊＊＊今日の天気セクション＊＊＊＊＊

const apiKey = "f53d2635fbbc9041de9c29eecd83a9a2"; //openweathermap のAPIkey
const lat = 35.68;
const lon = 139.76;

$.getJSON(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`,
  function (data) {
    const weatherId = data.weather[0].id;
    const description = data.weather[0].description;
    const tempMax = data.main.temp_max;
    const tempMin = data.main.temp_min;

    const weatherText = `🌤 天気: ${description}`;
    const tempText = `🌡 気温: ${tempMin.toFixed(1)}℃〜${tempMax.toFixed(1)}℃`;

    let advice = "";
    if (weatherId >= 200 && weatherId < 600) {
      advice = "☔️ 雨の可能性あり。屋内かけっこをオススメします";
    } else if (weatherId >= 600 && weatherId < 700) {
      advice = "❄️ 雪かもしれません。防寒をしっかりと！";
    } else if (weatherId === 800) {
      advice = "☀️ 晴れ！ロング散歩日和🐾";
    } else if (weatherId >= 801 && weatherId <= 804) {
      advice = "☁️ 曇り空。体調に合わせてお散歩しましょう";
    } else {
      advice = "天気が不明です。様子を見ながら過ごしましょう";
    }

    $("#walkAdvice").html(`
    ${weatherText}<br>
    ${tempText}<br>
    ${advice}
  `);
  }
);

//＊＊＊＊＊ログセクション＊＊＊＊＊

$("#logForm").on("submit", function (e) {
  e.preventDefault(); //ページはリロードされず、値をJSで受け取って画面に返すのみ（まだデータベースがないからリロードされちゃダメ）

  // １、まず置き換える
  const date = $("#logDate").val();
  const condition = $("#condition").val();
  const food = $("#food").val();
  const poop = $("#poop").val();
  const pee = $("#pee").val();
  const walk = $("#walk").val();
  const memo = $("#memo").val();
  const photoFile = $("#photo")[0].files[0];
  const photoName = photoFile ? photoFile.name : "";

  //２、ログを保存
  const logs = JSON.parse(localStorage.getItem(logKey)) || [];

  const newLog = {
    date,
    condition,
    food,
    poop,
    pee,
    walk,
    memo,
    photoName,
    createdAt: new Date().toLocaleString(),
  };

  logs.push(newLog);
  localStorage.setItem(logKey, JSON.stringify(logs));

  alert("保存しました");
  this.reset();
});

//３、ログを出力
$("#showLogs").on("click", function () {
  const logs = JSON.parse(localStorage.getItem(logKey)) || [];
  if (logs.length === 0) {
    $("#logDisplay").html("ログはありません");
    return;
  }

  const html = logs
    .map((log, i) => {
      const getOrNA = (val) => (val ? val : "未入力");

      return `<div style="margin-bottom:10px;">
      <strong>日付:</strong> ${log.date}<br>
      <strong>元気:</strong> ${getOrNA(log.condition)}<br>
      <strong>食欲:</strong> ${getOrNA(log.food)}<br>
      <strong>うんち:</strong> ${getOrNA(log.poop)}<br>
      <strong>おしっこ:</strong> ${getOrNA(log.pee)}<br>
      <strong>散歩:</strong> ${getOrNA(log.walk)}<br>
      <strong>メモ:</strong> ${getOrNA(log.memo)}<br>
      <strong>画像名:</strong> ${getOrNA(log.photoName)}<br>
      <small>保存時刻: ${log.createdAt}</small>
    </div>`;
    })
    .join(""); //文字列として表示する時にカンマを入れないようにする

  $("#logDisplay").html(html);
});

//＊＊＊＊＊日数計算＊＊＊＊＊

$(document).ready(function () {
  const bornKey = "bornDate";
  const homeKey = "homeDate";

  //localStorage から値を読み込んで日数を表示
  const savedBornDate = localStorage.getItem(bornKey);
  console.log("savedBornDate:", savedBornDate);
  const savedHomeDate = localStorage.getItem(homeKey);
  console.log("savedHomeDate:", savedHomeDate);

  if (savedBornDate) {
    $("#bornDate").val(savedBornDate);
  }
  if (savedHomeDate) {
    $("#homeDate").val(savedHomeDate);
  }

  //日付送信フォームの処理
  $("#dateForm").on("submit", function (e) {
    e.preventDefault();

    if (!localStorage.getItem(bornKey)) {
      const bornDate = $("#bornDate").val();
      if (!bornDate) {
        alert("生まれた日を選んでください");
        return;
      }
      localStorage.setItem(bornKey, bornDate);
    }

    if (!localStorage.getItem(homeKey)) {
      const homeDate = $("#homeDate").val();
      if (!homeDate) {
        alert("うちに来た日を選んでください");
        return;
      }
      localStorage.setItem(homeKey, homeDate);
    }
  });

  // 共通の日数表示関数
  function showDaysSince(dateStr, targetSelector, label) {
    const start = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));

    $(targetSelector).text(`${label}：${diffDays}日`);
  }

  const bornDateStr = $("#bornDate").val();
  const homeDateStr = $("#homeDate").val();

  if (bornDateStr) {
    showDaysSince(bornDateStr, "#bornDays", "生まれてから");
  }

  if (homeDateStr) {
    showDaysSince(homeDateStr, "#homeDays", "うちに来てから");
  }
});
$("#resetHomeDate").on("click", function () {
  localStorage.removeItem("homeDate");
  $("#homeDate").val(""); // フォームの表示もクリア
  $("#homeDays").text(""); // 表示を消す
  alert("うちに来た日をリセットしました");
});

// 犬の画像を交互に切り替える
const dogRunner = document.getElementById("dogRunner");
id="dogRunner"の
const dogImages = ["img/dog1.png", "img/dog2.png"];
let dogIndex = 0;//dog1からスタート

setInterval(() => {
  dogIndex = (dogIndex + 1) % dogImages.length;
  dogRunner.src = dogImages[dogIndex];
}, 300); // 0.3秒ごとに犬画像を切り替え

// ① dogIndex + 1 でカウントアップ
// dogIndex は今の画像の番号（インデックス）
// → 0 のときに +1 → 1 になる
// → 1 のときに +1 → 2 になる

// ② % dogImages.length で範囲を制限する
// % は 「割った余り」 を求める演算子（モジュロ演算子）
// dogImages.length は配列の長さ、要素数（今回は 2）
// let i = (i + 1) % 2;で０→１→０→１を繰り返す