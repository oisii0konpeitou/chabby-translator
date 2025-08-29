// ========================
// ちゃびー語 ↔ 日本語 対応辞書
// ========================
const dict = {
  "あね": { display: "あーなるほどね", match: ["あーなるほどね"] },
  "f1": { display: "見えん", match: ["見えん", "みえん", "見えない", "みえない"] },
  "f2": { display: "見える", match: ["見える", "みえる"] },
  "f3": { display: "分かる", match: ["分かる", "わかる"] },
  "ff3": { display: "分からん", match: ["分からん", "わからん", "分からない", "わからない"] },
  "hm": { display: "暇", match: ["暇", "ひま"] },
  "c ": { display: "ちゃびー", match: ["ちゃびー"] },
  "a": { display: "あおばら", match: ["あおばら"] },
  "m": { display: "めたもん（魔理沙）", match: ["めたもん", "魔理沙"] },
  "k": { display: "きいと", match: ["きいと"] },
  "u": { display: "uuuu", match: ["uuuu"] },
  "o": { display: "おりおん", match: ["おりおん"] },
  "l": { display: "りく", match: ["りく"] },
  "kk": { display: "こんぺいとう", match: ["こんぺいとう"] },
  "kkk": { display: "きじ（タナカゲンゲ）", match: ["きじ", "タナカゲンゲ"] },
  "nn": { display: "carrot", match: ["carrot"] },
  "z": { display: "これ", match: ["これ"] },
  "t": { display: "それ", match: ["それ"] },
  "n": { display: "あれ", match: ["あれ"] },
  "w": { display: "俺", match: ["俺", "おれ"] },
  "ma": { display: "ですか", match: ["ですか"] },
  "ya": { display: "やで", match: ["やで", "やな"] },
  "xie": { display: "ありがとう", match: ["ありがとう"] },
  "zu": { display: "昨日", match: ["昨日", "きのう"] },
  "ji": { display: "今日", match: ["今日", "きょう"] },
  "mi": { display: "明日", match: ["明日", "あした"] },
  "du": { display: "そうそう", match: ["そうそう"] },
  "buh": { display: "ごめん", match: ["ごめん"] },
  "ni": { display: "お前", match: ["お前", "おまえ"] },
  "xian": { display: "今", match: ["今", "いま"] },
  "le": { display: "ました", match: ["ました"] },
  "「わ": { display: "笑", match: ["笑"] },
  "[wa": { display: "笑", match: ["笑"] },
  "men": { display: "たち", match: ["たち", "達"] },
  "ye": { display: "も", match: ["も"] },
};

// 最大キー長（ちゃびー語→日本語変換時に使用）
const maxKeyLength = Math.max(...Object.keys(dict).map(k => k.length));

// 翻訳方向のフラグ（true: ちゃびー語→日本語）
let isChabbyToJapanese = true;

// DOM取得
const textareas = document.querySelectorAll(".textarea");
const swapButton = document.getElementById("swap-button");
const langSelects = document.querySelectorAll(".lang-select");


// ========================
// ちゃびー語 → 日本語翻訳
// ========================
function translateChabbyToJapanese(text) {
  let result = "";
  let i = 0;

  while (i < text.length) {
    let found = false;
    for (let len = Math.min(maxKeyLength, text.length - i); len > 0; len--) {
      const part = text.slice(i, i + len);
      if (dict[part]) {
        result += dict[part].display;
        i += len;
        found = true;
        break;
      }
    }
    if (!found) {
      result += text[i];
      i++;
    }
  }

  return result.trim();
}


// ========================
// カタカナ → ひらがな変換
// ========================
function toHiragana(str) {
  return str
    .replace(/[ァ-ン]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .normalize("NFKC");
}


// ========================
// 日本語 → ちゃびー語翻訳
// ========================
function translateJapaneseToChabby(text) {
  text = toHiragana(text);

  // 逆引き辞書作成
  const reverseDict = {};
  for (const [chabby, { match }] of Object.entries(dict)) {
    match.forEach(jp => {
      const key = toHiragana(jp);
      if (!reverseDict[key]) reverseDict[key] = [];
      reverseDict[key].push(chabby);
    });
  }

  // 長い順に置換（誤マッチ防止）
  const sortedEntries = Object.entries(reverseDict).sort((a, b) => b[0].length - a[0].length);
  let result = text;
  for (const [hiraganaJapanese, chabbyKeys] of sortedEntries) {
    const regex = new RegExp(hiraganaJapanese, "g");
    result = result.replace(regex, chabbyKeys[0]); // 最初のキーで置換
  }

  return result;
}


// ========================
// 入力イベント（翻訳トリガー）
// ========================
function triggerTranslation() {
  const input = textareas[0].value.trim().toLowerCase().replace(/\s+/g, "");
  const result = isChabbyToJapanese
    ? translateChabbyToJapanese(input)
    : translateJapaneseToChabby(input);
  textareas[1].value = result;
}


// ========================
// イベント設定
// ========================

// 入力イベント
textareas[0].addEventListener("input", triggerTranslation);

// 翻訳方向切り替えボタン
swapButton.addEventListener("click", () => {
  isChabbyToJapanese = !isChabbyToJapanese;
  swapButton.classList.toggle("rotated");

  // ラベル・プレースホルダの更新
  langSelects[0].textContent = isChabbyToJapanese ? "ちゃびー語" : "日本語";
  langSelects[1].textContent = isChabbyToJapanese ? "日本語" : "ちゃびー語";
  textareas[0].placeholder = isChabbyToJapanese
    ? "ちゃびー語を入力してください"
    : "日本語を入力してください";
  textareas[1].placeholder = "翻訳結果が表示されます";

  // 入力と出力を入れ替え
  const temp = textareas[0].value;
  textareas[0].value = textareas[1].value;
  textareas[1].value = temp;

  triggerTranslation();
});
