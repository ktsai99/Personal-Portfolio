$(document).ready(function () {
    
    $('nav a[href*="#"]').on('click',function(){
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top -100
        }, 1000);
    });

    
});