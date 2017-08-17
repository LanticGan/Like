$(document).ready(function(){

//initphoto
	function getPhoto() {
		$.get("../api/posts", function (data,status) {
			data.forEach(function (item) {
				var img = $(`<img src=${item.thumb} hidden>`);
				img.on("load", function () {
					$(this).parent(".frame").addClass(img[0].naturalHeight > img[0].naturalWidth 
						? "vertical-photo" : "horizontal-photo");
					$(this).prev().text("");
					$(this).removeAttr("hidden");
				})
				var loveItem = "";
				if(item.doilike){
					loveItem = $(`<img src="src/icon/love-red.png" alt="love-item" class="love-icon">`)
				} else {
					loveItem = $(`<img src="src/icon/love-white.png" alt="love-item" class="love-icon">`)
				}
				loveItem.on("click", function () {
					console.log(this.src);
				})
				var article = $(`
					<article class="photo-share" id="ta">
						<header class="user">
							<a href="http://www.baidu.com" >
								<img src=${item.avat} alt="avatar" class="avatar">
								<span>${item.intro}</span>
								<span class="dividing-line">|</span>
								<span>${item.name}</span>
							</a>
						</header>
				
						<a class="frame" style="display:block" href=${item.orig}>
							<span style="font-size:14px;">loading...</span>
						</a>

						<div class="author-comment">
								<span class="author">${item.name}:</span>
								<span>${item.content}</span>
						</div>

						<div class="operate">
							<div class="love-item">
							</div>
							<div class="comment-icon">
								<img src="src/icon/comment.png" alt="comment-icon">
							</div>
						</div>

						<div class="love-numbers">
							<span>${item.likes}</span>
							<span>次赞</span>
						</div>

						<div class="communication">
							<div class="user-comment">
								<span class="author">lantic:</span>
								<span>testtesdda</span>
							</div>
							<div class="user-comment">
								<span class="author">lantic:</span>
								<span>testtesdda</span>
							</div>				
						</div>
			 
						<div class="comment-form">
							<form action="">
								<input type="text" placeholder="评论">
							</form>
						</div> 
					</article>`);

				article.children(".frame").append(img);
				article.find(".love-item").append(loveItem);
				$("#target").append(article);


			});
		});
	};

	getPhoto();
// btn listner
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

// love event listner
	console.log(typeof getPhoto)

	var loveBtnList = document.getElementsByClassName("love-item");
	for (var i = 0; i < loveBtnList.length; ++i) {
		loveBtnList[i].onclick = function () {
			if (this.src.match(/white/)) {
				this.src = "src/icon/love-red.png";
			} else {
				this.src = "src/icon/love-white.png";
			}
		}	
	}


//
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


// show photo viewer
	$(document).on("click", "a.frame", function(ev) {
		ev.preventDefault();
		var img = $(this).children("img")[0]
		,	pswpElem = $(".pswp")[0]
		,	items = [
				{
					src: img.src
				,	msrc: img.src
				,	w: img.naturalWidth
				,	h: img.naturalHeight
				}
			]
		, 	options = {
				index: 0
			,	tapToClose: true
			,	tapToToggleControls: false
			,	fullscreenEl: false
			,	shareEl: false
			,	getThumbBoundsFn: function() {
					var pageYScroll = window.pageYOffset || document.documentElement.scrollTop
					,	rect = img.getBoundingClientRect();
					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				}
			}
		,	gallery = new PhotoSwipe(pswpElem, PhotoSwipeUI_Default, items, options);
		gallery.listen('initialZoomIn', function() {
			gallery.ui.hideControls();
		});
		gallery.listen("initialZoomInEnd", function() {
			gallery.ui.hideControls();
		});
		gallery.listen("close", function() {
			$("#show-original").addClass("show-original-hidden");
			setTimeout(function() {
				$("#show-original").attr("hidden", "true");
			}, 333);
		});
		gallery.init();

		return false;
	});

});

