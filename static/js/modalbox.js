var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var modalCaption = document.getElementById("caption");
var captionText = document.getElementById("page-caption");

img.onclick = function(){
  modal.style.display = "block";
  modal.style.margin = "auto";
  modalImg.src = this.src;
  modalCaption.innerHTML = captionText.textContent;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
