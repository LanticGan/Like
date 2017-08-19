$(function () {
	// follow 
	$(".ph-follow").on("click", function() {
		if (!this.classList.contains("follow-on")) {
			this.classList.add("follow-on");
			$(this).text("已关注"); 
		} else {
			this.classList.remove("follow-on");
			$(this).text("关注"); 
		}
	});

	
}); 