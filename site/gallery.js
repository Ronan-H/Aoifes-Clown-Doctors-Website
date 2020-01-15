
var imgSrc;
var enlargedSrc;
var img;

var images = [];
var imgSrcArr = [];
var enlargedSrcArr = [];
var remThumbIds = [];

function load() {
    // create all the image elements
    var numImages = 34;
    var imagesUsed = 0;
    var tableWidth = 1;
    var rootImgsDir = "images/gallery_images/"; 
    var currentTableRow;
    
    currentTableRow = document.createElement("tr");
    
    for (var imgNum = 1; imgNum <= 34; ++imgNum) {
        imgSrc = rootImgsDir + "thumbs/gallery_img_thumb" + imgNum + ".jpg";
        enlargedSrc = rootImgsDir + "gallery_img" + imgNum + ".jpg";
        img = document.createElement("img");
        
        images.push(img);
        imgSrcArr.push(imgSrc);
        enlargedSrcArr.push(enlargedSrc);
        
        img.id = "img" + imgNum;
        remThumbIds.push(img.id);
        
        var td = document.createElement("td");
        
        td.appendChild(img);
        currentTableRow.appendChild(td);
        
        imagesUsed++;
        
        if (imagesUsed % tableWidth == 0) {
            // add the last row to the page
            if (imagesUsed != 0) document.getElementById("gallery-table").appendChild(currentTableRow);
            
            // create a new table row
            currentTableRow = document.createElement("tr");
        }
        
        img.src = imgSrc;
    }

    for (var i = 0; i < 3; i++) {
        enlargeImage(i);
    }
    
    if ((imagesUsed - 1) % tableWidth != 0) {
        // add the last row to the page
        if (imagesUsed != 0) document.getElementById("gallery-table").appendChild(currentTableRow);
        
        // create a new table row
        currentTableRow = document.createElement("tr");
    }
}

function enlargeImage(imgNum) {
    sessionStorage.setItem("enlargedThumbSrc", images[imgNum].src);
    images[imgNum].src = enlargedSrcArr[imgNum];
    sessionStorage.setItem("enlargedId", images[imgNum].id);
    images[imgNum].width = "600";
}

$(window).scroll(function() {
    for (var i = 0; i < remThumbIds.length; i++) {
        var imgId = "#" + remThumbIds[i];

        var imgDist = $(imgId).offset().top,
            windowBottom = $(this).scrollTop() + $(window).height();
        
        if (imgDist - windowBottom < 0){
            enlargeImage(parseInt(imgId.substring(4)));
            remThumbIds.shift();
            i--;
        }
        else {
            break;
        }
    }
});