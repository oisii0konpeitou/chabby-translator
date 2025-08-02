<script>
const dict = {
  "あはい": "エラー：“これはちゃびーの口癖です”",
  "そっか": "エラー：“これはちゃびーの口癖です”",
  "そか": "エラー：“これはちゃびーの口癖です”",
  "あいうえお": "あいうえお（あいうえお）",
  "あね": "あーなるほどね",
  "f1": "見えん",
  "ff1": "分からん",
  "c": "ちゃびー",
  "a": "あおばら",
  "m": "メタモン（魔理沙）",
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
  "ni": "お前"
};

document.querySelector(".button").addEventListener("click", () => {
  const inputs = document.querySelectorAll(".textarea");
  const inputText = inputs[0].value.trim().toLowerCase().replace(/\s+/g, "");

let result = "";
let i = 0;
while (i < inputText.length) {
  let found = false;
  for (let len = Math.min(4, inputText.length - i); len > 0; len--) {
    const part = inputText.slice(i, i + len);
    if (dict[part]) {
      result += dict[part]; 
      i += len;
      found = true;
      break;
    }
  }
  if (!found) {
    result += inputText[i]; 
    i++;
  }
}

  inputs[1].value = result.trim();
});
</script>
