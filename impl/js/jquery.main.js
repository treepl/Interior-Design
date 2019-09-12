jQuery(function () {
    initCardsSorting();
    initCustomInfoCarousel();
    initCustomTextCarousel();
    initProjectsCarousel();
    initComingSoonCountDown();
    initHeaderHeight();
});
// $('.dropdown-toggle').dropdown();

// TODO

function initHeaderHeight(){

    var header = document.querySelector('header');
    header.style.setProperty('--header-min-height', $('#header').outerHeight() + 'px'); 
}
 

function initProjectsCarousel() {
                
    var condition = $('.carouselGalleryHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {

            var _bigSlider = $('.carouselGalleryHolder .imageHolder').bxSlider({
                mode : 'fade',
                slideSelector : '.slide',
                adaptiveHeight : true,
                pagerCustom : $('.carouselGalleryHolder .thumbnail ul'),
                controls : false,
                onSlideAfter : function($slideElement, oldIndex, newIndex)
                {
                    $('.carouselGalleryHolder .thumbnail ul li').removeClass('active');
                    $('.carouselGalleryHolder .thumbnail ul li').eq(newIndex - 1).addClass('active');
                }
            });

            var _thumbSlider = $('.carouselGalleryHolder .thumbnail ul').bxSlider({
                slideMargin : 10, 
                infiniteLoop : false,
                pager : false,
                controls : false,
                minSlides : 2,
                maxSlides : 4,
                touchEnabled: false,
                moveSlides : 1,
                slideWidth : 118
            });

            $('.carouselGalleryHolder .btn-next').click(function() {
                _thumbSlider.goToNextSlide();

                return false;
            });

            $('.carouselGalleryHolder .btn-prev').click(function() {
                _thumbSlider.goToPrevSlide();

                return false;
            });
        }
    }
}

function initCardsSorting() {
    var condition = $('.cardsFilterGridHolder').size()
        // && false
    ;
    init(condition);

    function init(condition) {
        if (condition || condition == null) {
            $('.cardsFilterGridHolder .col').hide();
            $grid = $('.cardsFilterGridHolder').isotope({
                itemSelector: '.col',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function (instance, image) {
                $('.cardsFilterGridHolder .col').show();
                $grid.isotope('layout');
            });

            $('.cardsFilterBTNHolder [data-filter]').on('click', function () {
                var _this = $(this);
                var filterValue = _this.attr('data-filter');

                $('.cardsFilterBTNHolder li').removeClass('active');
                _this.closest('li').addClass('active');

                $grid.isotope({
                    filter: filterValue
                });

                return false;
            });

            $('a.masonryGalleryLightbox').fancybox(); 
        }
    }
}

function initCustomInfoCarousel() {
    var condition = $('.teamSliderHolder').size()
        // && false
        ;init(condition);

    function init(condition) {
        if(condition || condition == null) {

            var carouselGallerySlider = $('.teamSliderHolder .slideset').bxSlider({
                slideSelector : $('.teamSliderHolder .slide'),
                pager : true,
                controls : false,
                auto : false,
                touchEnabled: false,
                minSlides: 1,
                maxSlides: 4,
                moveSlides: 3,
                slideWidth: 270,
                shrinkItems: true,
                slideMargin : 30,
                infiniteLoop : true
            });

            $('.teamSliderHolder .btn-next').click(function() {
                carouselGallerySlider.goToNextSlide();

                return false;
            });

            $('.teamSliderHolder .btn-prev').click(function() {
                carouselGallerySlider.goToPrevSlide();

                return false;
            });

        }
    }
}

function initCustomTextCarousel() {
    var condition = $('.textSliderHolder').size()
        // && false
        ;init(condition);

    function init(condition) {
        if(condition || condition == null) {

            var carouselGallerySlider = $('.textSliderHolder .slideset').bxSlider({
                slideSelector : $('.textSliderHolder .slide'),
                pager : true,
                controls : false,
                auto : false,
                touchEnabled: false,
                minSlides: 1,
                maxSlides: 2,
                moveSlides: 1,
                slideWidth: 570,
                shrinkItems: true,
                slideMargin : 30,
                infiniteLoop : true
            });

            $('.textSliderHolder .btn-next').click(function() {
                carouselGallerySlider.goToNextSlide();

                return false;
            });

            $('.textSliderHolder .btn-prev').click(function() {
                carouselGallerySlider.goToPrevSlide();

                return false;
            });

        }
    }
}


/*Coming Soon*/
function initComingSoonCountDown() {
    var condition = $('.comingSoonTimerHolder').size()
        // && false
    ;init(condition);

    function init(condition) {
        if(condition || condition == null) {
            $('.comingSoonTimerHolder').countdowntimer({
                dateAndTime : "2019/11/11 00:00:00",
                size : "lg",
                regexpMatchFormat : "([0-9]{1,3}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
                regexpReplaceWith : '<div class="column"> <div class="holder"> <span>$1</span> <p>days</p></div></div><div class="column"> <div class="holder"> <span>$2</span> <p>hours</p></div></div><div class="column"> <div class="holder"> <span>$3</span> <p>minutes</p></div></div><div class="column"> <div class="holder"> <span>$4</span> <p>seconds</p></div></div>'
            });
        }
    }
}
/*End Coming Soon*/