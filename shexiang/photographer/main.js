$(function () {

	function getPhosList (url) {
		$.ajax({
			url: url,
			type: "get",
			success: function (data) {
				data.forEach( function (element, index) {
					var resumeDom = $(`<div class="resume">
			            		</div>`);
					if (element.resume) {
						for (var eLength = 0; eLength < (element.resume.length / 16) + 1; eLength ++) {
							if ( eLength == element.resume.length / 16) {
								var rContent = element.resume.slice(eLength * 16,  element.resume.length)
	
							} else {
								var rContent = element.resume.slice(eLength * 16,  (eLength + 1) * 16)
							}
							var tempP = $(`<p>${rContent}</p>`)
							resumeDom.append(tempP);
						}
					} else {
						var tempP = $(`<p>null</p>`)
					}

					var phosItem = $(`<a href=${element.id}/ id=${element.id} class="photographer">
			            <div class="avatar">
			                <img src=${element.avatar} alt="">
			            </div>
			        
			            <div class="desciption">
			            	<p class="weui-grid__label">${element.nickname}
			            		<span stlye="color:#e1e1e1 !important;">|</span>
			            		${element.intro}</p>
			            </div>
			       		</a>
					`);

					phosItem.children(".desciption").append(resumeDom);
					$(".photographer-list").append(phosItem);
				});
			},
		});
	}

	getPhosList("/api/phos");


	function toggleBtn() {
		if (!this.classList.contains("item-on")) {
			this.classList.add("item-on");
			var otherBar = $(this).siblings(".btn-item");
			for(var i = 0; i < otherBar.length; ++i) {
				if (otherBar[i].classList.contains("item-on")) {
					otherBar[i].classList.remove("item-on");
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

