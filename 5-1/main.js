// 各種要素を変数に入れる
const file = document.querySelector("#file");
const rakugaki = document.querySelector("#rakugaki");
const color = document.querySelector("#color");
const paint = document.querySelector("#paint");
const camera = document.querySelector("#camera");
const face = document.querySelector("#face");
const video = document.querySelector("#video");
let pen_color = "rgb(0, 0, 0)";
let mouse_on = false;
let prev_point = { x: 0, y: 0 }
let ranugaki_mode = false;
let video_mode = false;
console.log("main.js!!");
// 初期化
function init() {
    face?.addEventListener("click", clickFace, false);
    camera?.addEventListener("click", clickCamera, false);
    paint?.addEventListener("click", clickPaint, false);
    file?.addEventListener("change", loadLocalImage, false);
    color?.addEventListener("change", colorChange, false);
    rakugaki?.addEventListener("resize", resize, false);
    rakugaki?.addEventListener("mousedown", drawStart, false);
    rakugaki?.addEventListener("mousemove", drawLine, false);
    rakugaki?.addEventListener("mouseup", drawEnd, false);
    rakugaki?.addEventListener("mouseleave", drawEnd, false);
}

// 画像をクリックしたときの処理
function clickFace() {
    file.click();
}

// 画像を読み込む
function loadLocalImage(e) {
    const fileData = e.target.files[0];
    if (fileData.type.match("image.*")) {
        const reader = new FileReader();
        reader.onload = function () {
            faceDraw(reader.result);
            file.value = "";
        }
        reader.readAsDataURL(fileData)
    }
}

// 画像を書き出す
function faceDraw(data) {
    const ctx = face.getContext("2d");
    const img = new Image();
    ctx.clearRect(0, 0, face.width, face.height);
    img.src = data;
    img.onload = function () {
        let height, width, x, y;
        if (img.width / img.height > 1) {
            height = face.height;
            width = img.width * (height / img.height);
            x = (face.width - width) / 2;
            y = 0;
        } else {
            width = face.width;
            height = img.height * (width / img.width);
            x = 0;
            y = (face.height - height) / 2;
        }
        ctx.drawImage(img, x, y, width, height);
        // グレースケールに変換

    }
}

// グレースケールに変換
function grayscale(ctx) {

}

// カメラボタンクリック時の処理
function clickCamera() {
    video_mode = !video_mode;
    camera.classList.toggle("on");
    video.classList.toggle("hide");
    if (video_mode) {
        loadVideo();
    } else {
        takePhoto();
    }
}

// カメラを起動する
function loadVideo() {

}

// カメラで撮影した画像を表示する
function takePhoto() {

}

// ペイントボタンクリック時の処理
function clickPaint() {
    ranugaki_mode = !ranugaki_mode;
    paint.classList.toggle("on");
    // お絵かき領域を切り替える


    // パレット切り替え

}

// 画面サイズ変更時の処理
function resize() {
    rakugaki.width = rakugaki.offsetWidth;
    rakugaki.height = rakugaki.offsetHeight;
}

// ペンの書き始め
function drawStart(e) {

}

// ペンの書き途中
function drawLine(e) {

}

// ペンの書き終わり
function drawEnd() {

}

// ペンの色変更
function colorChange(e) {

}

// 初期化
init();

window.onload = ()=>{
	console.log("onload!!");

	// JavaScriptここから
	//サウンドオブジェクト
	const snd01 =new Howl({
		src: "./sounds/se01.mp3",
		loop: true
	});
	const snd02 =new Howl({
		src: "./sounds/se02.mp3",
		loop: true
	});
	const snd03 =new Howl({
		src: "./sounds/seヒヨコ.mp3",
		loop: true
	});
	const snd04 =new Howl({
		src: "./sounds/se_keltutei_5.mp3",
		loop: true
	});
	const snd05 =new Howl({
		src: "./sounds/se_keltutei_40.mp3"
		
	});
	const snd06 =new Howl({
		src: "./sounds/se_keltutei_45.mp3"
		
	});
	const snd07 =new Howl({
		src: "./sounds/se_inu_1.mp3",
		loop: true
	});
	const snd08 =new Howl({
		src: "./sounds/se_neko_1.mp3",
		loop: true
	});
	const snd09 =new Howl({
		src: "./sounds/se03.mp3",
		loop: true
	});
	const snd10 =new Howl({
		src: "./sounds/se_waigoe.mp3",
		loop: true
	});
	// ボタンを取得して、クリックイベントをつける
	const btn01 = document.querySelector("#btn01");
	console.log(btn01);//確認
	btn01.addEventListener("click", ()=>{
		console.log("btn01押された")
		snd01.play();//
	});
	const btn02 = document.querySelector("#btn02");
	console.log(btn02);//確認
	btn02.addEventListener("click", ()=>{
		console.log("btn02押された")
		snd02.play();//
	});
	const btn03 = document.querySelector("#btn03");
	console.log(btn03);//確認
	btn03.addEventListener("click", ()=>{
		console.log("btn03押された")
		snd03.play();//
	});
	const btn04 = document.querySelector("#btn04");
	console.log(btn04);//確認
	btn04.addEventListener("click", ()=>{
		console.log("btn04押された")
		snd04.play();//
	});
	const btn05 = document.querySelector("#btn05");
	console.log(btn05);//確認
	btn05.addEventListener("click", ()=>{
		console.log("btn05押された")
		snd05.play();//
	});
	const btn06 = document.querySelector("#btn06");
	console.log(btn06);//確認
	btn06.addEventListener("click", ()=>{
		console.log("btn06押された")
		snd06.play();//
	});
	const btn07 = document.querySelector("#btn07");
	console.log(btn07);//確認
	btn07.addEventListener("click", ()=>{
		console.log("btn07押された")
		snd07.play();//
	});
	const btn08 = document.querySelector("#btn08");
	console.log(btn08);//確認
	btn08.addEventListener("click", ()=>{
		console.log("btn08押された")
		snd08.play();//
	});
	const btn09 = document.querySelector("#btn09");
	console.log(btn09);//確認
	btn09.addEventListener("click", ()=>{
		console.log("btn09押された")
		snd09.play();//
	});
	const btn10 = document.querySelector("#btn10");
	console.log(btn10);//確認
	btn10.addEventListener("click", ()=>{
		console.log("btn10押された")
		snd10.play();//
	});
}