$(function() {
		var listData = {
			listItems: [
				{
					href: "xsrk/xsrk.html",
					src: "res/icon/xs.png",
					name: "新生入口"
				},
				{
					href: "xygk/index.html",
					src: "res/icon/xygk.png",
					name: "校园概况"
				},				
				{
					href: "byszn/index.html",
					src: "res/icon/byszn.png",
					name: "毕业生指南"
				},			
				{
					href: "xymz/index.html",
					src: "res/icon/xymz.png",
					name: "校医门诊"
				},
				{
					href: "jdzq/index.html",
					src: "res/icon/jdzq.png",
					name: "奖贷助勤"
				},
				{
					href: "yxpx/index.html",
					src: "res/icon/yxpx.png",
					name: "优秀评选"
				},		
				{
					href: "xygl/index.html",
					src: "res/icon/xygl.png",
					name: "校园管理"
				},
				{
					href: "ykt/index.html",
					src: "res/icon/ykt.png",
					name: "一卡通"
				},	
				{
					href: "sqjbl/index.html",
					src: "res/icon/sqjbl.png",
					name: "申请及办理"
				},		

			]
		};
		(function () {
		  var template = $('#template').html();
		  Mustache.parse(template);
		  var rendered = Mustache.render(template, listData);
		  $('#listContainer').html(rendered);
		})();

});