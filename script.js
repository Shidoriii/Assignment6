let imageList = [];
let currentIndex = 0;
let timer = null;

// AJAX to load the file (NOT jQuery as per instructions)
function loadImageList() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "images.txt", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const lines = xhr.responseText.trim().split("\n");
            imageList = lines.map(line => {
            const [filename, duration] = line.split(",");
            return {
                filename: filename.trim(),
                duration: parseInt(duration.trim(), 10)
            };
        });
        currentIndex = 0;
        displayImage();
        } else {
        alert("Failed to load image list.");
    }
    };
    xhr.onerror = function () {
        alert("Error while loading the image list.");
    };
    xhr.send();
}

function displayImage() {
    if (imageList.length === 0) return;

    const imageInfo = imageList[currentIndex];
    const $img = $("#current-image");

    if (timer) clearTimeout(timer);

    $img.fadeOut(400, function () {
        $img.attr("src", `images/${imageInfo.filename}`).fadeIn(400);
    });

    timer = setTimeout(() => {
        nextImage();
    }, imageInfo.duration);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imageList.length;
    displayImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    displayImage();
}

$(document).ready(function () {
    loadImageList();

    $("#next").click(function () {
        nextImage();
    });

    $("#prev").click(function () {
        prevImage();
    });

    $("#update").click(function () {
        loadImageList();
    });
});
