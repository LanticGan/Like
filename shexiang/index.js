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
		loveBtnList[i].onclick = function () {
			if (this.classList.contains("un-love")) {
				this.classList.remove("un-love");
				this.classList.add("do-love");
				// Sent data to server ...

			} else {
				this.classList.remove("do-love");
				this.classList.add("un-love");
				// do sth ... 
			}
		}	
	}	

	var commentList = document.getElementsByClassName("comment-icon");
	for (i = 0; i < commentList.length; ++i) {
		commentList[i].onclick = function () {
			console.log(this.parentNode.parentNode.lastElementChild.style.display = 'block');
		}	
	}


});

