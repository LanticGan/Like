$(function() {
		var listData = {
			listItems: [
				{
					href: "glgd/index.html",
					name: "高等学校校园秩序管理若干规定"
				},
				{
					href: "jl/index.html",
					name: "考场纪律"
				},
				{
					href: "qj/index.html",
					name: "学生请假管理规定(暂行)"
				},	
				{
					href: "sh/index.html",
					name: "学生伤害事故处理办法"
				},
				{
					href: "gl/index.html",
					name: "普通高等学校学生管理规定"
				},
				{
					href: "ttgl/index.html",
					name:  "学生团体管理条例"
				},
				{
					href: "aqgd/index.html",
					name:  "安全管理规定(摘要)"
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