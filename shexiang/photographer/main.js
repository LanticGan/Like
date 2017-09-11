$(function () {

	function getPhosList (url) {
		$.ajax({
			url: url,
			type: "get",
			success: function (data) {
				data.forEach( function (element, index) {
					var phosItem = $(`<a href="/shexiang/phhome/pho.mst" id=${element.id} class="photographer">
			            <div class="avatar">
			                <img src=${element.avatar} alt="">
			            </div>
			            <p class="weui-grid__label">${element.nickname}</p>
			            <p class="weui-grid__label">${element.intro}</p>
			            <div class="desciption">
			            	<p>${element.resume}</p>
			            </div>
			       		</a>
					`);
					$(".photographer-list").append(phosItem);
				});
			},
		});
	}

	getPhosList("/api/phos");


	function toggleBtn() {
		if (!this.classList.contains("weui-bar__item_on")) {
			this.classList.add("weui-bar__item_on");
			var otherBar = $(this).siblings(".weui-navbar__item");
			for(var i = 0; i < otherBar.length; ++i) {
				if (otherBar[i].classList.contains("weui-bar__item_on")) {
					otherBar[i].classList.remove("weui-bar__item_on");
				}
			}
		}
	}

	$("#latest").click(function () {
			toggleBtn.call(this);
			$(".photographer-list").empty();
			getPhosList("/api/phos?order=new");
	});

	$("#hot").click(function () {
			toggleBtn.call(this);
			$(".photographer-list").empty();
			getPhosList("/api/phos?order=hot");
	});

	$("#followed").click(function () {
			toggleBtn.call(this);
			$(".photographer-list").empty();
			getPhosList("/api/phos?following=1");
	});
}); 

