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

  // 例：呼び出し側
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
