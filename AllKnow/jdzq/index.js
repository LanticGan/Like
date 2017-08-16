$(function() {
		var listData = {
			listItems: [
				{
					href: "gj/index.html",
					name: "国家奖学金评选暂行办法"
				},
				{
					href: "lz/index.html",
					name: "国家励志奖学金评选暂行办法"
				},
								{
					href: "pk/index.html",
					name: "国家贫困助学金评选暂行办法"
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