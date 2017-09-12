$(document).ready(function(){

//initphoto
    var photoPage = 1,
    	theLatestPhotoTime;
    function getPhoto(url) {
		$.ajax({
			url: url,
			type: "get",
			success: function (data,status) {
				theLatestPhotoTime = data[data.length - 1].time;
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
							var formParent = this.parentNode.parentNode.parentNode.lastElementChild;
							formParent.style.display = 'block';
							var form = formParent.firstElementChild;
							form.elements[0].focus();
						})

					})

					// create otherUserComments DOM
					var commentsContainer = $(`<div></div>`);
					var comments = item.comments,
						userName;

					function createCommentsDom (commentsList) {
						commentsList.forEach(function (comment) {
						var ucObj = $(`<a href="javascript:;" style="display: block" class="user-comment" ></a>`)
						if (comment.self) {
							userName = "我";
						} else {
							userName = comment.name;
						}
						var contentStr = comment.content;
						if (contentStr[0] == "@") {
							var splitCharPosition = contentStr.indexOf(":");
							var repliedName = contentStr.slice(1,splitCharPosition);
							userName = `${userName} 回复 ${repliedName}`;
							comment.content = contentStr.slice(splitCharPosition+2);
						}
						var uName = $(`<span class="author">${userName}: </span>`)
						var uContent = $(`<span>${comment.content}</span>`)
						ucObj.append(uName);
						ucObj.append(uContent);
						ucObj.on("click", function () {
							var commentFormParent = this.parentNode.parentNode.parentNode.lastElementChild;
							if (commentFormParent.style.display != "block") {
								commentFormParent.style.display = "block";
							} 
							var commentForm = commentFormParent.firstElementChild;
							var commentInput = commentForm.firstElementChild;
							commentInput.value = `@${comment.name}: `
							commentInput.focus();

						})
						commentsContainer.append(ucObj);
						})
					}
					
					createCommentsDom(comments);
					
					//Remaing comments
					var remainComentsCount = item.comment_count - comments.length;
					if (remainComentsCount > 0) {
						var remainComents = $(`<a href="javascript:;" style="display: block" class="user-comment" >
								<span class="author" style="color:#616161">显示剩余${remainComentsCount}条评论 </span>
							</a>`);
						remainComents.click(function () {
							$.ajax({
								url: `/api/posts/${item.id}/comments`,
								type: "get",
								success: function (data) {
									commentsContainer.empty();
									createCommentsDom(data);
								}
							})
						})
						commentsContainer.append(remainComents);
					}


					// create article DOM
					var article = $(`
						<article class="photo-share" id="ta">
							<header class="user">
								<a href="photographer/${item.user}/" >
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


					// comment submit
					var articleId = article.children("a.frame").children()[1].id;
					article.children(".comment-form").children().on("submit", function (event) {
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
						article.children(".communication").append(newCommentDom);
						this.elements[0].blur();
						this.style.display = 'none';
					})

				});
			},

			error: function (xhr,status,error) {
				alert(xhr.status);
			}

		});
	};

	getPhoto("/api/posts");
	var userFollow = 0; // Help the scroll event to judge if the articles is followed.  

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
		// Get More Photo 
			var Ctop = document.body.scrollTop;
	        var Cheight = document.body.clientHeight;
	        if (Ctop > Cheight * 0.8 && unlock) {
	        	var sTime = encodeURIComponent(theLatestPhotoTime);
	        	if (userFollow) {
	        		getPhoto(`../api/posts?time=${sTime}&following=1`);
	        	} else {
	        		getPhoto(`../api/posts?time=${sTime}`);
	        	}
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




//  Toggle Photo
	var hotPhoto = document.getElementById("btn-item1");
	var followPhoto = document.getElementById("btn-item2");

	hotPhoto.addEventListener("click", function () {

		if (!hotPhoto.classList.contains("item-on")) {
			hotPhoto.classList.add("item-on");
			photoPage = 1;
			$("#target").empty();
			getPhoto(`../api/posts?page=${photoPage}` );
		}
		if (followPhoto.classList.contains("item-on")) {
			followPhoto.classList.remove("item-on");
		}

	}, false);

	followPhoto.addEventListener("click", function () {
		if (!followPhoto.classList.contains("item-on")) {
			followPhoto.classList.add("item-on");
			$("#target").empty();
			photoPage = 1;
			getPhoto(`../api/posts?page=${photoPage}&following=1`);
			userFollow = 1;
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
		var shareResult = confirm("要发布照片吗?")
		if (shareResult) {
			this.style.display = "none";
			var form = new FormData(document.getElementById("imgForm"));
			$.ajax({
				url:"/api/posts",
	            type:"post",
	            data:form,
	            processData:false,
	            contentType:false,
	            success:function(data){
	            	alert("照片发布成功!");
	            	window.location.href = "index.mst";
	            },
	            error:function(e){
	              	alert("很抱歉，照片发布失败，请重试。");
	              	window.location.reload();
	            }  
	         });
		}
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

