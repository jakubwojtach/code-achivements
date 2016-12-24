/*
@desc: Custom Slider for the absolutely positioned slides.
@author: Jakub Wojtach
@params: 
arrowNext - div with the next arrow 
arrowPrev - div with the previous arrow 
container - div with all of the slides inside
className - name of the class(best to use 'active')
slidesClass - 
*/
var slider ={
    init: function(arrowNext, arrowPrev, container, className, slidesClass, controls, content){
        slider.attachNumbers(container, className);
        slider.switchSlide(arrowNext, arrowPrev, container, className, slidesClass, controls, content);
        slider.attachArrowAttrs(arrowNext, arrowPrev, container, slidesClass);
        slider.fillCaptions(controls ,slidesClass);
        slider.attachNumbersContent(content);
    },
    /*
    @desc: Assigning numbers for the slide: 
    1) next slide
    2) actual slide
    3) previous slide
    */
    attachNumbers: function(container, className){
        var children = $(container).children();
        var length = children.length;
            children.each(function(index){
                $(this).attr("data-number", index+1);
                $(this).attr("data-next",index+2);
                $(this).attr("data-prev", index);
                if(index === 0){
                    $(this).attr("data-prev", "null");
                    $(this).addClass(className);
                }
                if(index === (length - 1)){
                    $(this).attr("data-next", "null");
                } 
        });
    },
    /*
    @desc Attaching numbers to the slider controls
    */
    attachArrowAttrs: function(arrowNext, arrowPrev, container, slidesClass){
        
        var actualSlide = $(slidesClass);
        var actualSlideNext = actualSlide.attr("data-next");
        var actualSlidePrev = actualSlide.attr("data-prev");
        $(arrowNext).attr("data-next", actualSlideNext);
        $(arrowPrev).attr("data-prev", actualSlidePrev);

        var topParentNext = $(arrowNext).parent().parent();
        var topParentPrev = $(arrowPrev).parent().parent();
        if(($(arrowPrev).attr("data-prev"))=== "null"){
           $(topParentPrev).fadeOut('fast');
        }
        if(($(arrowPrev).attr("data-prev"))!== "null"){
           $(topParentPrev).fadeIn('fast');
        }
        if(($(arrowNext).attr("data-next"))=== "null"){
           $(topParentNext).fadeOut('fast');
        }
        if(($(arrowNext).attr("data-next"))!== "null"){
           $(topParentNext).fadeIn('fast');
        }
    },
    /*
    @desc Actions for the slides change
    */
    switchSlide: function(arrowNext, arrowPrev, container, className, activeClass, controls, content){
       var nextData = $(arrowNext).attr('data-next');
       var prevData = $(arrowPrev).attr('data-prev');   
       $(arrowNext).on('click', function(e){
            e.preventDefault();
            var next = $(activeClass).next();
            var actual = $(activeClass);
            actual.removeClass(className);
            next.addClass(className);
            slider.attachArrowAttrs(arrowNext, arrowPrev, container, activeClass);
            slider.fillCaptions(controls, activeClass);
            slider.changeContentNext(activeClass, content);
       }); 
       $(arrowPrev).on('click', function(e){
            e.preventDefault();
            var prev = $(activeClass).prev();
            var actual = $(activeClass);
            actual.removeClass(className);
            prev.addClass(className);
            slider.attachArrowAttrs(arrowNext, arrowPrev, container, activeClass);
            slider.fillCaptions(controls, activeClass);
            slider.changeContentPrev(activeClass, content);
       });
    },
    /*
    @desc Attaching captions for each of the slides from the data name.
    */
    fillCaptions: function(controls, activeClass){
        var next = $(activeClass).next().attr('data-name');
        var prev = $(activeClass).prev().attr('data-name');
        var nextCaptionLv1 = $(controls).children().eq(1);
        var nextCaptionLv2 = $(nextCaptionLv1).children().eq(1);
        var nextCaptionLv3 = $(nextCaptionLv2).children().eq(1);
        var prevCaptionLv1 = $(controls).children().eq(0);
        var prevCaptionLv2 = $(prevCaptionLv1).children().eq(1);
        var prevCaptionLv3 = $(prevCaptionLv2).children().eq(1);

        nextCaptionLv3.stop().html(next).hide(0).fadeIn();
        prevCaptionLv3.stop().html(prev).hide(0).fadeIn();

    },
    attachNumbersContent: function(content){
        var childrenObject = $(content).children();
        childrenObject.each(function(index){
            $(this).attr('data-content', index+1);
            if(index === 0){
                $(this).fadeIn();
            }
        });
    },
    changeContentNext: function( activeSlide, content){
        var actualSlide = $(activeSlide).attr('data-number');
        var prevSlide = actualSlide - 1;
        var previousContent = $(content).find("[data-content=" + prevSlide + "]");
        var matchingContent = $(content).find("[data-content=" + actualSlide + "]");
        previousContent.hide();
        matchingContent.fadeIn();
    },
    changeContentPrev: function( activeSlide, content){
        var actualSlide = $(activeSlide).attr('data-number');
        var prevSlide = parseInt(actualSlide) + 1;
        var previousContent = $(content).find("[data-content=" + prevSlide + "]");
        var matchingContent = $(content).find("[data-content=" + actualSlide + "]");
        previousContent.hide();
        matchingContent.fadeIn();
    }
}
