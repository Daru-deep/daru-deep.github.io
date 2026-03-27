$(function(){

    $(".slider").slick({
        autoplay:true,
        autoplaySpeed:3000,       
        adaptiveHeight:true,
        infinite:true               

    });
});

window.addEventListener("scroll",function(){
const elm = document.querySelector("#header");
const scroll = window.pageYOffset;
if(scroll > 500){
    $(elm).fadeOut();
    console.log(scroll);
  } else {
    $(elm).fadeIn();
    console.log(scroll);
}

})
