$(document).ready(function(){


		var btn1 = document.getElementById("btn-item1");
		var btn2 = document.getElementById("btn-item2");

		btn1.addEventListener("click", function () {
			if (!btn1.classList.contains("item-on")) {
				btn1.classList.add("item-on");
			}
			if (btn2.classList.contains("item-on")) {
				btn2.classList.remove("item-on");
			}
		}, false);

		btn2.addEventListener("click", function () {
			if (!btn2.classList.contains("item-on")) {
				btn2.classList.add("item-on");
			}
			if (btn1.classList.contains("item-on")) {
				btn1.classList.remove("item-on");
			}
		}, false);



		var loveBtnList = document.getElementsByClassName("un-love");
		for (var i = 0; i < loveBtnList.length; ++i) {
			var loveBtn = loveBtnList[i];
			loveBtn.addEventListener("click", function () {
			if (loveBtn.classList.contains("un-love")) {
				loveBtn.classList.remove("un-love");
				loveBtn.classList.add("do-love");
				// Sent data to server ...

			} else {
				loveBtn.classList.remove("do-love");
				loveBtn.classList.add("un-love");
				// do sth ...
				}
			});
		}
});

