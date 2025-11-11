console.log("main.js!!");

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