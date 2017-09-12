$(function () {

	var phoId = document.getElementsByClassName("ph-info")[0].id;

	// follow 
	$(".ph-follow").on("click", function() {
		if (!this.classList.contains("follow-on")) {
			this.classList.add("follow-on");
			$(this).text("已关注");

			$.ajax({
				
				url: `/api/phos/${phoId}?followed=1`,
				type: 'put'
			})

		} else {
			this.classList.remove("follow-on");
			$(this).text("关注"); 
			$.ajax({
				url: `/api/phos/${phoId}?followed=0`,
				type: 'put'
			}) 
		}
	});

	//Get Photo 
	function getPhoto(url) {
		$.ajax({
			url: url,
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
						loveItem = $(`<img src="/shexiang/src/icon/love-red.png" alt="love-item" class="love-icon">`)
					} else {
						loveItem = $(`<img src="/shexiang/src/icon/love-white.png" alt="love-item" class="love-icon">`)
					}
					loveItem.on("load", function () {
						$(this).on("click", function (event) {
							var articleId = $(this).parents("article").children("a.frame").children()[1].id;
							if (this.src.match(/white/)) {
								this.src = "/shexiang/src/icon/love-red.png";
								var loveNumber = $(this).parent().parent().next().children()[0].firstChild;
								loveNumber.nodeValue = parseInt(loveNumber.nodeValue) + 1;
								$.ajax({
									url: `/api/posts/${articleId}?liked=1`,
									type: "PUT",
								});
							} else {
								this.src = "/shexiang/src/icon/love-white.png";
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
					var commentItem = $(`<img src="/shexiang/src/icon/comment.png" alt="comment-icon">`);
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

					if (item.self) {
						//Delete Article
						var deleteItem = $(`<a href="javascript:;">
										<img src="/shexiang/src/icon/delete.png" alt="delete" class="delete-icon">
									</a>`);
						deleteItem.click(function () {
							var deleteConfirm = confirm("要删除这张照片吗?")
							if (deleteConfirm) {
								$.ajax({
									url: `/api/posts/${item.id}`,
									type: "delete",
									success: function () {
										window.location.reload();
									}
								})
							}
						});
						article.children("header").append(deleteItem);

					} 

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
	
	getPhoto(`/api/posts?authorid=${phoId}`);

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