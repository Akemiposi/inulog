$(document).ready(function () {
  const fields = ["name", "breed", "gender", "charactor"];
  const prefix = "inumemo_"; // ページ固有のプレフィックスを付ける

  // 入力時に保存
  fields.forEach(function (id) {
    $("#" + id).on("input", function () {
      localStorage.setItem(prefix + id, $(this).val());
    });
  });

  // ページ読み込み時に復元
  fields.forEach(function (id) {
    const saved = localStorage.getItem(prefix + id);
    if (saved !== null) {
      $("#" + id).val(saved);
    }
  });
});
const $dogRunner = $("#dogRunner");
const dogImages = ["img/dog1.png", "img/dog2.png"];
let dogIndex = 0; //dog1からスタート

setInterval(() => {
  dogIndex = (dogIndex + 1) % dogImages.length;
  $dogRunner.attr("src", dogImages[dogIndex]);
}, 300); // 0.3秒ごとに犬画像を切り替え