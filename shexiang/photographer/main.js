$(function () {
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