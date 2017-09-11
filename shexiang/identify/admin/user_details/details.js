$(function () {
	$("#agree").click(function () {
		var aResult = confirm("确定审核通过吗?");
	})

	$("#refuse").click(function () {
		var reasonItem = document.getElementsByClassName("reason")[0];
		reasonItem.style.display = "block";
		$("#refuse-reason").focus();
		$("#reasonForm").on("submit", function (event) {
			event.preventDefault();
			var rReason = this.elements[0].value;
			var rResult = confirm(`拒绝理由为:${rReason}\n确定拒绝吗?`);
		})
	})
});