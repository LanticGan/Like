$(function() {
		var listData = {
			listItems: [
				{
					href: "tjs/index.html",
					name: "毕业生推荐书及就业协议管理暂行规定"
				},
				{
					href: "jylc/index.html",
					name: "四川传媒学院毕业生就业流程"
				},
				{
					href: "jywd/index.html",
					name: "毕业生就业问答"
				},
				{
					href: "byspq/index.html",
					name: "毕业生派遣的几种情况说明"
				},
				{
					href: "jcjy/index.html",
					name: "高校毕业生基层就业的基本政策"
				},
				{
					href: "szyf/index.html",
					name: "四川省“三支一扶”计划"
				},
				{
					href: "zyfw/index.html",
					name: "关于实施大学生志愿服务"
				},
				{
					href: "zcbw/index.html",
					name: "国家促进普通高校毕业生就业政策百问"
				},
				{
					href: "cjjycy/index.html",
					name: "促进高校毕业生就业创业意见有关问题的通知"
				},	
				{
					href: "zjgztz/index.html",
					name: "总参谋部、总政治部、教育部、财政部关于做好普通高等学校应届毕业生征集工作的通知"
				},
				{
					href: "yzrw/index.html",
					name: "应征入伍服义务兵役高等学校毕业生学费补偿国家助学贷款代偿暂行办法"
				},
				{
					href: "sxbl/index.html",
					name: "毕业生有关手续办理"
				},
				{
					href:"lxdh/index.html",
					name:"部门联系电话"
				}
			]
		};
		(function () {
		  var template = $('#template').html();
		  Mustache.parse(template);
		  var rendered = Mustache.render(template, listData);
		  $('#listContainer').html(rendered);
		})();

});