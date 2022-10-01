var accordions = document.getElementsByClassName("accordion");
for (var i = 0; i < accordions.length; i++) {
    accordions[i].onclick = function () {
        for (var i = 0; i < accordions.length; i++) {
            accordions[i].childNodes[1].src = "../minimal_assets/v2/assets/images/angle_down.svg";
            accordions[i].classList.remove('is-open');
            var content = accordions[i].nextElementSibling;
            content.style.maxHeight = null;
        }
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            this.classList.toggle('is-open');
            this.childNodes[1].src = "../minimal_assets/v2/assets/images/angle_up.svg";
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
}