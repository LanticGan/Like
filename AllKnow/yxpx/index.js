$(function() {
		var listData = {
			listItems: [
				{
					href: "gb/index.html",
					name: "优秀学生干部评选办法"
				},
				{
					href: "bys/index.html",
					name: "优秀毕业生评选办法"
				},
				{
					href: "shxs/index.html",
					name: "优秀学生(三好学生)评选办法"
				},	
				{
					href: "ty/index.html",
					name: "优秀团员、优秀团干部和“五·四”红旗团支部评选办法"
				},
				{
					href: "qs/index.html",
					name: "精神文明寝室评选办法"
				},
				{
					href: "bj/index.html",
					name:  "优秀班集体评选办法"
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