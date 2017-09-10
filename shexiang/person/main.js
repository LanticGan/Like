$(function () {

	function getPhoto(url) {
		$.ajax({
			url: url,
			type: "get",
			success: function (data,status) {
				data.forEach(function (item) {
					if (item.self) {
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
							loveItem = $(`<img src="../src/icon/love-red.png" alt="love-item" class="love-icon">`)
						} else {
							loveItem = $(`<img src="../src/icon/love-white.png" alt="love-item" class="love-icon">`)
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
						var commentItem = $(`<img src="../src/icon/comment.png" alt="comment-icon">`);
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
					}
				});
			},
			error: function (xhr,status,error) {
				alert(xhr.status);
			}
		});
	};

	getPhoto("/api/posts?page=1");

}); 