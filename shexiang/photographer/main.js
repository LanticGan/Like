$(function () {


	function getPhosList (url) {
		$.ajax({
			url: url,
			type: "get",
			success: function (data) {
				data.forEach( function (element, index) {
					var phosItem = $(`<a href="../phhome/phhome.html" class="photographer">
			            <div class="avatar">
			                <img src="../src/img/test.png" alt="">
			            </div>
			            <p class="weui-grid__label">Cris</p>
			            <p class="weui-grid__label">14级摄影系</p>
			            <div class="desciption">
			            	<p>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa commodi, fugit suscipit ut, sunt at ipsa esse quam, a corporis libero labore. Dolore, cum. Doloribus corrupti illum cum totam veritatis.</p>
			            </div>
			       		</a>
					`)
				});
			},
		});
	}


	$(".weui-navbar__item").on("click", function() {
		if (!this.classList.contains("weui-bar__item_on")) {
			this.classList.add("weui-bar__item_on");
			var otherBar = $(this).siblings(".weui-navbar__item");
			for(var i = 0; i < otherBar.length; ++i) {
				if (otherBar[i].classList.contains("weui-bar__item_on")) {
					otherBar[i].classList.remove("weui-bar__item_on");
				}
			}
		}
	});
}); 