$(document).ready(function(){

//initphoto
    var photoPage = 1;
    function getPhoto(page) {
		$.ajax({
			url: "../api/posts?page=" + page,
			type: "get",
			success: function (data,status) {
				data.forEach(function (item) {
					// create Img DOM
					var img = $(`<img id=${item.id} src=${item.thumb} hidden>`);
					img.on("load", function () {
						$(this).parent(".frame").addClass(img[0].naturalHeight > img[0].naturalWidth 
							? "vertical-photo" : "horizontal-photo");
						$(this).prev().text("");
						$(this).removeAttr("hidden");
					})

					// create LoveIcon DOM
					var loveItem = "";
					if(item.doilike){
						loveItem = $(`<img src="src/icon/love-red.png" alt="love-item" class="love-icon">`)
					} else {
						loveItem = $(`<img src="src/icon/love-white.png" alt="love-item" class="love-icon">`)
					}
					loveItem.on("load", function () {
						$(this).on("click", function (event) {
							var articleId = $(this).parents("article").children("a.frame").children()[1].id;
							if (this.src.match(/white/)) {
								this.src = "src/icon/love-red.png";
								var loveNumber = $(this).parent().parent().next().children()[0].firstChild;
								loveNumber.nodeValue = parseInt(loveNumber.nodeValue) + 1;
								$.ajax({
									url: `/api/posts/${articleId}?liked=1`,
									type: "PUT",
								});
							} else {
								this.src = "src/icon/love-white.png";
								var loveNumber = $(this).parent().parent().next().children()[0].firstChild;
								loveNumber.nodeValue = parseInt(loveNumber.nodeValue) - 1;
								$.ajax({
									url: `/api/posts/${articleId}?liked=0`,
									type: "PUT",
								});
							}
						})
					})

					//commitAction 
					var commentItem = $(`<img src="src/icon/comment.png" alt="comment-icon">`);
					commentItem.on("load", function () {
						$(this).on("click",function () {
							var articleId = $(this).parents("article").children("a.frame").children()[1].id;
							var formParent = this.parentNode.parentNode.parentNode.lastElementChild;
							formParent.style.display = 'block';
							var form = formParent.firstElementChild;
							form.elements[0].focus();
							$(form).on("submit", function (event) {
								event.preventDefault();
								$.ajax({
									url: `/api/posts/${articleId}/comments`,
									type: "post",
									data: {
										content: this.elements[0].value
									}
								});
								var newCommentDom = $(`<div> 
									<a href="#" style="display: block" class="user-comment">
										<span class="author">我: </span>
										<span>${this.elements[0].value}</span>
									</a>
									</div>`)
								$(formParent).prev().append(newCommentDom);
								form.elements[0].blur();
								formParent.style.display = 'none';
							})
						})

					})

					// create otherUserComments DOM
					var commentsContainer = $(`<div></div>`);	 
					$.ajax({
						url: `/api/posts/${item.id}/comments` ,
						type: "get",
						success: function (result) {
							var comments = result;
							var userName;
							comments.forEach(function (comment) {
								var ucObj = $(`<a href=${comment.user} style="display: block" class="user-comment"></a>`)
								if (comment.self) {
									userName = "我";
								} else {
									userName = comment.name;
								}
								var uName = $(`<span class="author">${userName}: </span>`)
								var uContent = $(`<span>${comment.content}</span>`)
								ucObj.append(uName);
								ucObj.append(uContent);
								commentsContainer.append(ucObj);
							})
						},
					});

					// create article DOM
					var article = $(`
						<article class="photo-share" id="ta">
							<header class="user">
								<a href="phhome/phhome.html" >
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
								</div>
							</div>

							<div class="love-numbers">
								<span>${item.likes}</span>
								<span>次赞</span>
							</div>

							<div class="communication">			
							</div>
				 
							<div class="comment-form">
								<form action="">
									<input type="text" placeholder="评论">
									<input type="submit" style="display:none;"> 
								</form>
							</div> 
						</article>`);

					article.children(".frame").append(img);
					article.children(".communication").append(commentsContainer);
					article.find(".comment-icon").append(commentItem);
					article.find(".love-item").append(loveItem);
					$("#target").append(article);

				});
			},

			error: function (xhr,status,error) {
				alert(xhr.status);
			}

		});
	};

	getPhoto(photoPage);


// back-to-top Action 
	$("#back-to-top").on("click", function () {
		document.body.scrollTop = 0;
		this.style.display = 'none';
	})

var unlock = true;
// Listen Touchmove Event
	$(document).on("touchstart", function(e) {
		var finger = e.targetTouches[0];
		var initY = finger.clientY;
		$(this).on("touchmove", function (ev) {
		// get more photo 
			var Ctop = document.body.scrollTop
	        var Cheight = document.body.clientHeight
	        if (Ctop > Cheight * 0.9 && unlock) {
	        	photoPage += 1;
	        	getPhoto(photoPage);
	        	unlock = false;
	        	setTimeout(function () {
	        		unlock = true;
	        	}, 5000);
	        }
			var presentY = ev.targetTouches[0].clientY;
			if (presentY > initY) {
				$("#back-to-top").css("display", "block");
			} else {
				$("#back-to-top").css("display", "none");
			}
		})
	});




//  getPhoto
	var hotPhoto = document.getElementById("btn-item1");
	var followPhoto = document.getElementById("btn-item2");

	hotPhoto.addEventListener("click", function () {

		if (!hotPhoto.classList.contains("item-on")) {
			hotPhoto.classList.add("item-on");
			
		}
		if (followPhoto.classList.contains("item-on")) {
			followPhoto.classList.remove("item-on");
		}

	}, false);

	followPhoto.addEventListener("click", function () {
		if (!followPhoto.classList.contains("item-on")) {
			followPhoto.classList.add("item-on");
		}
		if (hotPhoto.classList.contains("item-on")) {
			hotPhoto.classList.remove("item-on");
		}
	}, false);


	document.getElementById("image").onchange = function () {
		var imgFile = this.files[0];
		var fReader = new FileReader();
		fReader.onload = function () {
			document.getElementsByClassName("container")[0].style.display = "none";
			document.getElementById("preview-photo").src = fReader.result;
			document.getElementById("photo-submit").style.display = "block";
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
            	alert("照片发布成功!");
            	window.location.href = "index.html";
            },
            error:function(e){
              	alert("很抱歉，照片发布失败，请重试。");  
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

		$("#show-original").removeAttr("hidden").attr("href", $(this).attr("href"));
		setTimeout(function() {
			$("#show-original").removeClass("show-original-hidden");
		});
	});

});

