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

	var loveBtnList = document.getElementsByClassName("love-icon");
	for (var i = 0; i < loveBtnList.length; ++i) {
		loveBtnList[i].onclick = function () {

			if (this.src.match(/white/)) {
				this.src = "src/icon/love-red.png";
		s	} else {
				this.src = "src/icon/love-white.png";
			}
		}	
	}	

	var commentList = document.getElementsByClassName("comment-icon");
	for (i = 0; i < commentList.length; ++i) {
		commentList[i].onclick = function () {
			this.parentNode.parentNode.lastElementChild.style.display = 'block';
		}	
	}

	document.getElementById("image").onchange = function () {
		var imgFile = this.files[0];
		var fReader = new FileReader();
		fReader.onload = function () {
			document.getElementsByClassName("container")[0].style.display = "none";
			document.getElementById("preview-photo").src = fReader.result;
			document.getElementById("photo-submit").style.display = "block";
			console.log()
		}
		fReader.readAsDataURL(imgFile);
	}
	
	$("#share-text").on("click", function() {
		var form = new FormData(document.getElementById("imgForm"));
		$.ajax({
			url:"/api/posts",
            type:"post",
            data:form,
            processData:false,
            contentType:false,
            success:function(data){
            	alert("上传成功!");
            },
            error:function(e){
              	alert("上传失败!");  
            }  
         });  
	});

	//Touchmove Event Listener
	$(document).on("touchstart", function (e) {
	})

});

