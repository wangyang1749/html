var list = document.getElementsByClassName("swiper-slide")
var x = 0;
setInterval(function () {
    list[x].click();
    x = x + 1;
    if (x == list.length) x = 0;
}, 5000);

var list = document.getElementsByClassName("swiper-slide")
var y = 0;
setInterval(function () {
    list[y].click();
    y = y + 1;
    if (y == list.length) y = 0;
}, 1000);
var list = document.getElementsByClassName("swiper-slide")

var list = document.getElementsByClassName("swiper-slide")

for (var i = 0; i < 1000; i++) {
    list[i].click();
}

while(true){
    (function () {
        var list = document.getElementsByClassName("swiper-slide")
        for(var i = 0;i<list.length;i++){
            list[i].click()
        }
    })()
}

