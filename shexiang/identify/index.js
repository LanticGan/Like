$(function () {
	document.getElementById("img").onchange = function () {
		var imgFile = this.files[0];
		var fReader = new FileReader();
		fReader.onload = function () {
			console.log(this.result);
			var addImgNode = document.getElementById("addImg");
			addImgNode.childNodes[2].nodeValue = "";
			var prevImgNode = document.getElementById("preview-img");
			prevImgNode.style.display = "inline-block";
			prevImgNode.childNodes[1].src = fReader.result;
		};
		fReader.readAsDataURL(imgFile);	
	};
	
	
});