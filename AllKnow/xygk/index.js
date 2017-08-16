$(function() {
		var listData = {
			listItems: [
				{
					href: "lxfs/index.html",
					name: "各部门联系方式"
				},
				{
					href: "lxlx/index.html",
					name: "来校路线"
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