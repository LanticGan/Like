$(function() {
	var $table = $("table");

	function setTable(data) {
		var tableRows = $table.find("tr").slice(1);

		data.forEach((row, i) => {
			row.forEach((item, j) => {
				$(tableRows[i].children[j]).children().remove();
				if (item) {
					$(tableRows[i].children[j]).append($(`
						<div class="item">
							${item.course} <br>
							@${item.place}
						</div>
					`));
				}
			});
		});
	}

	$("#pick-btn").on("click", function() {
		weui.picker(pickerSelections, {
			onConfirm: function(result) {
				$.ajax({
					type: "GET",
					url: "/api/timetable?grade=" + encodeURIComponent(result[0])
						+ "&major=" + encodeURIComponent(result[1])
						+ "&classname=" + encodeURIComponent(result[2]),
					success: function(data) {
						setTable(data);
					},
					error: function() {
						alert("出错");
					}
				});
			}
		});
	});
});