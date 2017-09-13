$(function () {
	document.getElementById("img").onchange = function () {
		var imgFile = this.files[0];
		var fReader = new FileReader();
		fReader.onload = function () {
			var addImgNode = document.getElementById("addImg");
			addImgNode.childNodes[2].nodeValue = "";
			var prevImgNode = document.getElementById("preview-img");
			prevImgNode.style.display = "inline-block";
			prevImgNode.childNodes[1].src = fReader.result;
		};
		fReader.readAsDataURL(imgFile);	
	};
	

	$("#identify-form").on("submit", function (event) {
		event.preventDefault();
		if (document.getElementById("img").value) {
			document.getElementById("btn").disabled = "disabled";
			var form = new FormData(document.getElementById("identify-form"));
			$.ajax({
				type: "post",
				url: "/api/pho-certif",
				data: form,
				processData:false,
	            contentType:false,
				success: function () {
					alert("认证申请提交成功!");
					window.location.href = "/shexiang/index.mst";
				},
				error: function () {
					alert("上传失败！请重试!");
					window.location.reload();
				}
			})
		} else {
			alert("请上传学生证照片!")
		}
	})
});