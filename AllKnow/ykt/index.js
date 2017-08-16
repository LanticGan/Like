$(function() {
		var listData = {
			listItems: [
				{
					href: "sy/index.html",
					name: "一卡通使用"
				},
				{
					href: "glgd/index.html",
					name: "一卡通管理规定(暂行)"
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