$(function () {
	var uId = document.getElementsByClassName("info")[0].id;
	$("#agree").click(function () {
		var aResult = confirm("确定审核通过吗?");
		if (aResult) {
			$.ajax({
				url: `/api/pho-certif/${uId}?passed=1`,
				type: "put",
				success: function () {
					alert("操作成功!");
					window.location.reload();
				},
				error: function (error) {
					alert("error!")
				}
			})
		}
	})

	$("#refuse").click(function () {
		var rResult = confirm("确定拒绝认证吗?");
		if (rResult) {
			$.ajax({
				url: `/api/pho-certif/${uId}?passed=0`,
				type: "put",
				success: function () {
					alert("操作成功!");
					window.location.reload();
				},
				error: function (error) {
					alert("error!")
				}
			})
		}
		/*var reasonItem = document.getElementsByClassName("reason")[0];
		reasonItem.style.display = "block";
		$("#refuse-reason").focus();
		$("#reasonForm").on("submit", function (event) {
			event.preventDefault();
			var rReason = this.elements[0].value;
			var rResult = confirm(`拒绝理由为:${rReason}\n确定拒绝吗?`);
		})*/
	})
});