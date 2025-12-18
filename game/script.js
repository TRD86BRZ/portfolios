// =======================================================
// 1. 変数とデータの定義
// =======================================================
let score = 0;
let clickPower = 1;      // 基本クリック力
let autoClickerRate = 0; // 基本自動獲得レート
let rebirthPoints = 0;   // 転生ポイント（永続倍率用）

const REBIRTH_THRESHOLD = 10000; // 1万から転生可能
const REBIRTH_BONUS_PER_POINT = 1; // 1ptにつき+100%（1倍分）加算

const upgrades = {
    powerUp: {
        id: 'powerUpBtn',
        name: 'クリック力強化',
        initialCost: 10,
        cost: 10,
        effect: 2,
        level: 0
    },
    booster: {
        id: 'boosterBtn',
        name: '自動化ブースター',
        initialCost: 100,
        cost: 100,
        effect: 5,
        level: 0
    }
};

// =======================================================
// 2. 要素の取得
// =======================================================
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickArea');
const upgradesContainer = document.getElementById('upgradesContainer');
const rebirthButton = document.getElementById('rebirthButton');
const rebirthPointsDisplay = document.getElementById('rebirthPoints');

// =======================================================
// 3. 計算ロジック（倍率の適用）
// =======================================================

// 現在の合計倍率を計算 (1pt = 2倍, 2pt = 3倍...)
function getMultiplier() {
    return 1 + (rebirthPoints * REBIRTH_BONUS_PER_POINT);
}

// 現在の最終的なクリック力を計算
function getTotalClickPower() {
    return clickPower * getMultiplier();
}

// =======================================================
// 4. 表示更新
// =======================================================

function updateDisplay() {
    scoreDisplay.textContent = Math.floor(score).toLocaleString();
    rebirthPointsDisplay.textContent = rebirthPoints.toLocaleString();
    
    // アップグレードボタンの更新
    for (const key in upgrades) {
        const upgrade = upgrades[key];
        const btn = document.getElementById(upgrade.id);
        if (btn) {
            btn.textContent = `${upgrade.name} Lv.${upgrade.level} (コスト: ${upgrade.cost.toLocaleString()})`;
            btn.disabled = score < upgrade.cost;
        }
    }

    // 転生ボタンの更新
    const potentialPoints = Math.floor(Math.sqrt(score / 1000));
    if (score >= REBIRTH_THRESHOLD && potentialPoints > 0) {
        rebirthButton.disabled = false;
        rebirthButton.textContent = `転生する (獲得: ${potentialPoints} Pt / 現在:${getMultiplier()}倍)`;
    } else {
        rebirthButton.disabled = true;
        const remaining = REBIRTH_THRESHOLD - score;
        rebirthButton.textContent = `転生まであと ${Math.max(0, remaining).toLocaleString()} ポイント`;
    }
}

// =======================================================
// 5. ゲーム機能
// =======================================================

function buyUpgrade(upgradeKey) {
    const upgrade = upgrades[upgradeKey];
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        upgrade.level += 1;

        if (upgradeKey === 'powerUp') {
            clickPower += upgrade.effect;
            upgrade.cost = Math.ceil(upgrade.cost * 1.5);
        } else if (upgradeKey === 'booster') {
            autoClickerRate += upgrade.effect;
            upgrade.cost = Math.ceil(upgrade.cost * 2.0);
        }
        
        updateDisplay();
        saveGame();
    }
}

function rebirth() {
    const potentialPoints = Math.floor(Math.sqrt(score / 1000));
    if (score >= REBIRTH_THRESHOLD && potentialPoints > 0) {
        if (!confirm(`${potentialPoints} ポイント獲得して転生しますか？\n（スコアとアップグレードがリセットされます）`)) return;

        rebirthPoints += potentialPoints;
        
        // リセット処理
        score = 0;
        clickPower = 1;
        autoClickerRate = 0;
        
        for (const key in upgrades) {
            upgrades[key].level = 0;
            upgrades[key].cost = upgrades[key].initialCost;
        }

        saveGame();
        updateDisplay();
        alert(`転生しました！現在の倍率: ${getMultiplier()}倍`);
    }
}

// =======================================================
// 6. システム・ループ
// =======================================================

function saveGame() {
    const gameData = {
        score, clickPower, autoClickerRate, rebirthPoints, upgrades
    };
    localStorage.setItem('clickerGameSave_v2', JSON.stringify(gameData));
}

function loadGame() {
    const savedData = localStorage.getItem('clickerGameSave_v2');
    if (savedData) {
        const data = JSON.parse(savedData);
        score = data.score;
        clickPower = data.clickPower;
        autoClickerRate = data.autoClickerRate;
        rebirthPoints = data.rebirthPoints;
        Object.assign(upgrades, data.upgrades);
    }
    updateDisplay();
}

// クリックイベント
clickButton.addEventListener('click', () => {
    score += getTotalClickPower();
    updateDisplay();
});

// 転生ボタンイベント
rebirthButton.addEventListener('click', rebirth);

// 自動クリックループ (1秒ごと)
setInterval(() => {
    if (autoClickerRate > 0) {
        // 自動獲得分にも転生倍率を適用する場合
        score += (autoClickerRate * getMultiplier());
        updateDisplay();
        // 5秒に1回保存するなど負荷軽減してもOK
    }
}, 1000);

// 初期化
function init() {
    // アップグレードボタンの生成
    for (const key in upgrades) {
        const upgrade = upgrades[key];
        const button = document.createElement('button');
        button.id = upgrade.id;
        button.className = 'upgrade-btn';
        button.onclick = () => buyUpgrade(key);
        upgradesContainer.appendChild(button);
    }
    loadGame();
}

init();