$(function() {
		var listData = {
			listItems: [
				{
					href: "ybbx/index.html",
					name: "学生医保报销办法及流程"
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