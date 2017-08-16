$(function() {
		var listData = {
			listItems: [
				{
					href: "hcp/index.html",
					name: "关于办理火车票学生优惠卡的规定"
				},
				{
					href: "bb/index.html",
					name: "毕业生报到证补办、改派流程"
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