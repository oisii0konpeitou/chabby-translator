console.log("✅ script.js 読み込まれた！");

const dict = {
  "あはい": "エラー：“これはちゃびーの口癖です”",
  "そっか": "エラー：“これはちゃびーの口癖です”",
  "そか": "エラー：“これはちゃびーの口癖です”",
  "あいうえお": "あいうえお（あいうえお）",
  "あね": "あーなるほどね",
  "f1": "見えん",
  "ff1": "分からん",
  "f2": "見える",
  "ff2": "わかる",
  "hm": "暇",
  "c": "ちゃびー",
  "a": "あおばら",
  "m": "めたもん（魔理沙）",
  "k": "きいと",
  "u": "uuuu",
  "i": "いんふぃ",
  "o": "オリオン",
  "l": "りく",
  "kk": "こんぺいとう",
  "kkk": "きじ（タナカゲンゲ）",
  "z": "これ",
  "t": "それ",
  "n": "あれ",
  "w": "俺",
  "ma": "ですか",
  "ya": "やで（やな、ね）",
  "xie": "ありがとう",
  "zu": "昨日",
  "ji": "今日",
  "mi": "明日",
  "du": "そうそう！",
  "buh": "ごめん",
  "ni": "お前",
  "xian": "今",
  "le": "ました"
};

// 辞書の最大キー長を取得（"kkk" など複数文字の優先のため）
const maxKeyLength = Math.max(...Object.keys(dict).map(k => k.length));

document.querySelector(".button").addEventListener("click", () => {
  const inputs = document.querySelectorAll(".textarea");

  // 入力欄のテキストを前処理（小文字化・空白削除）
  const inputText = inputs[0].value.trim().toLowerCase().replace(/\s+/g, "");

  let result = "";
  let i = 0;

  // 文字列を1文字ずつ走査し、最大一致を探して翻訳
  while (i < inputText.length) {
    let found = false;

    // 長いキーを優先して辞書に一致するか確認
    for (let len = Math.min(maxKeyLength, inputText.length - i); len > 0; len--) {
      const part = inputText.slice(i, i + len);

      if (dict[part]) {
        result += dict[part];
        i += len;
        found = true;
        break;
      }
    }

    // 一致しなければそのまま出力
    if (!found) {
      result += inputText[i];
      i++;
    }
  }

  // 出力欄に結果を表示
  inputs[1].value = result.trim();
});
