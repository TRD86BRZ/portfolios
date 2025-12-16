// =======================================================
// 1. 変数とデータの定義
// =======================================================
let score = 0;
let clickPower = 1; // 1クリックで増えるポイント
let autoClickerRate = 0; // 1秒あたりの自動獲得ポイント
let rebirthPoints = 0; // ⭐ 転生ポイント: 永続的なボーナス

// ⭐ 転生に必要なスコアの閾値
const REBIRTH_THRESHOLD = 1; 

// アップグレードのデータ構造
const upgrades = {
    // クリック力強化アップグレード
    powerUp: {
        id: 'powerUpBtn',
        name: 'クリック力強化',
        cost: 10,
        effect: 2, // クリック力が2増加
        level: 0
    },
    // 自動化ブースターアップグレード
    booster: {
        id: 'boosterBtn',
        name: '自動化ブースター',
        cost: 1,
        effect: 5, // 1秒あたりの自動獲得ポイントが5増加
        level: 0
    }
};

// =======================================================
// 2. 要素の取得
// =======================================================
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickArea');
const upgradesContainer = document.getElementById('upgradesContainer');
const rebirthButton = document.getElementById('rebirthButton'); // ⭐ 転生ボタンの要素を取得
const rebirthPointsDisplay = document.getElementById('rebirthPoints'); // ⭐ 転生ポイント表示要素を取得

// =======================================================
// 3. アップグレード関連の関数
// =======================================================

// アップグレードボタンのHTMLを生成し、初期表示を行う
function initializeUpgrades() {
    for (const key in upgrades) {
        const upgrade = upgrades[key];
        const button = document.createElement('button');
        button.id = upgrade.id;
        button.onclick = () => buyUpgrade(key); 
        upgradesContainer.appendChild(button);
        updateUpgradeButton(upgrade);
    }
}

// ボタンのテキストと状態を更新する
function updateUpgradeButton(upgrade) {
    const button = document.getElementById(upgrade.id);
    if (!button) return; 
    
    button.textContent = 
        `${upgrade.name} Lv.${upgrade.level + 1} (コスト: ${upgrade.cost})`;
    
    // スコアが足りない場合はボタンを無効化
    if (score < upgrade.cost) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

// 全てのアップグレードボタンの状態を更新する
function updateAllUpgradeButtons() {
    for (const key in upgrades) {
        updateUpgradeButton(upgrades[key]);
    }
}

// アップグレードの購入ロジック
function buyUpgrade(upgradeKey) {
    const upgrade = upgrades[upgradeKey];

    if (score >= upgrade.cost) {
        // --- 購入処理 ---
        score -= upgrade.cost;
        upgrade.level += 1; 

        // --- ⭐ 効果の適用とコストの増加 ---
        if (upgradeKey === 'powerUp') {
            clickPower += upgrade.effect; // クリック力を増加
            upgrade.cost = Math.ceil(upgrade.cost * 1.5); // コスト増加
        } else if (upgradeKey === 'booster') {
            autoClickerRate += upgrade.effect; // 自動化レートを増加
            upgrade.cost = Math.ceil(upgrade.cost * 0.5); // コスト増加
        }
        
        // --- 画面の更新と保存 ---
        scoreDisplay.textContent = score;
        updateUpgradeButton(upgrade); 
        updateAllUpgradeButtons(); 
        updateRebirthStatus(); // ⭐ 転生ステータスを更新
        saveGame(); 
    }
}

// =======================================================
// 4. データ保存・読み込み機能
// =======================================================

function saveGame() {
    const gameData = {
        score: score,
        clickPower: clickPower,
        autoClickerRate: autoClickerRate,
        upgrades: upgrades,
        rebirthPoints: rebirthPoints // ⭐ 転生ポイントを保存に追加
    };
    localStorage.setItem('clickerGameSave', JSON.stringify(gameData));
    console.log("ゲームを保存しました！");
}

function loadGame() {
    const savedData = localStorage.getItem('clickerGameSave');
    
    if (savedData) {
        const gameData = JSON.parse(savedData);
        
        // データを変数に反映
        score = gameData.score;
        clickPower = gameData.clickPower;
        autoClickerRate = gameData.autoClickerRate;
        rebirthPoints = gameData.rebirthPoints || 0; // ⭐ 転生ポイントをロード
        
        // アップグレードの状態を反映
        for (const key in gameData.upgrades) {
            if (upgrades[key]) {
                upgrades[key] = gameData.upgrades[key];
            }
        }
        
        // 画面を更新
        scoreDisplay.textContent = score;
        updateAllUpgradeButtons();
        updateRebirthStatus(); // ⭐ 転生ステータスを更新
        console.log("保存データをロードしました。");
        return true; 
    }
    // 初期状態の場合も転生ポイントの表示は更新
    updateRebirthStatus();
    return false; 
}

// ⭐ ゲームをリセット (転生ポイントは保持しない完全リセット)
function resetGame() {
    localStorage.removeItem('clickerGameSave');
    window.location.reload(); 
}

// ⭐ 転生機能のロジック
function rebirth() {
    if (score >= REBIRTH_THRESHOLD) {
        // --- 転生ポイントの計算 ---
        // 獲得スコアの平方根に基づいたポイントを付与 (増えすぎないように)
        const newRebirthPoints = Math.floor(Math.sqrt(score / 1000)); 
        rebirthPoints += newRebirthPoints;
        
        // --- ゲームの初期化 ---
        score = 0
        // 基本値に戻す
        clickPower = 1;
        autoClickerRate = 0;
        
        // アップグレードの状態を初期化
        for (const key in upgrades) {
            upgrades[key].level = 0;
            // 初期コストに戻す
            if (key === 'powerUp') upgrades[key].cost = 10;
            if (key === 'booster') upgrades[key].cost = 1; 
        }

        // --- 転生ボーナスの適用 ---
        // 転生ポイント1ptあたり、クリック力が1増加し、自動レートが1増加
        clickPower += rebirthPoints;
        autoClickerRate += rebirthPoints;
        
        // --- 画面の更新と保存 ---
        scoreDisplay.textContent = score;
        updateAllUpgradeButtons();
        updateRebirthStatus();
        saveGame();
        
        alert(`転生しました！${newRebirthPoints} 転生ポイントを獲得！`);
    } else {
        alert(`転生には ${REBIRTH_THRESHOLD} ポイントが必要です！`);
    }
}

// ⭐ 転生ボタンとポイント表示を更新
function updateRebirthStatus() {
    rebirthPointsDisplay.textContent = rebirthPoints;
    
    if (score >= REBIRTH_THRESHOLD) {
        const potentialPoints = Math.floor(Math.sqrt(score / 1000));
        rebirthButton.disabled = false;
        rebirthButton.textContent = `転生する (獲得: ${potentialPoints} Pt)`;
    } else {
        rebirthButton.disabled = true;
        // 残りスコアを計算し、カンマ区切りで表示 (より見やすくするため)
        const remaining = REBIRTH_THRESHOLD - score;
        rebirthButton.textContent = `転生まであと ${remaining.toLocaleString()} ポイント`;
    }
}

// =======================================================
// 5. イベントリスナーとゲームループ
// =======================================================

// クリックボタンのイベントリスナー
clickButton.addEventListener('click', () => {
    score += clickPower; 
    scoreDisplay.textContent = score.toLocaleString(); // ⭐ カンマ区切りで表示
    updateAllUpgradeButtons(); 
    updateRebirthStatus(); 
});

// 自動クリック処理 (1秒ごとに実行されるゲームループ)
setInterval(() => {
    if (autoClickerRate > 0) {
        score += autoClickerRate; 
        scoreDisplay.textContent = score.toLocaleString(); // ⭐ カンマ区切りで表示
        updateAllUpgradeButtons();
        updateRebirthStatus(); 
        saveGame(); 
    }
}, 1000); 

// =======================================================
// 6. ゲームの初期化 (起動時に実行)
// =======================================================

initializeUpgrades(); 
loadGame();