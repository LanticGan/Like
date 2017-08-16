$(function() {
		var listData = {
			listItems: [
				{
					href: "bdzc/index.html",
					name: "报道注册时间、地点"
				},
				{
					href: "dt/index.html",
					name: "党团组织关系"
				},
				{
					href: "ygzysx/index.html",
					name: "有关注意事项"
				},
				{
					href: "bdlc/index.html",
					name: "报道流程"
				},
				{
					href: "jddd/index.html",
					name: "各院、系、部接待地点"
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