jQuery(function () {
    initCardsSorting();
    initCustomInfoCarousel();
    initCustomTextCarousel();
    initProjectsCarousel();
    initComingSoonCountDown();
    initHeaderHeight();
    initAjaxLoadMoreFunction();
    initCounterFunction();
    initTabNav();
    
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
    ;
    init(condition);
  
    function init(condition) {
        if (condition || condition == null) {
  
            var carouselGallerySlider = $('.teamSliderHolder .slideset').bxSlider({
                slideSelector: $('.teamSliderHolder .slide'),
                pager: true,
                controls: false,
                auto: false,
                touchEnabled: false,
                minSlides: 1,
                maxSlides: 4,
                moveSlides: 1,
                slideWidth: 270,
                shrinkItems: true,
                slideMargin: 30,
                startSlide: 0,
                infiniteLoop: false
            });
  
            $('.teamSliderHolder .btn-next').click(function() {
                carouselGallerySlider.goToNextSlide();
  
                return false;
            });
  
  
            $('.teamSliderHolder .btn-prev').click(function() {
                carouselGallerySlider.goToPrevSlide();
  
                return false;
            });
  
            ResponsiveHelper.addRange({
                '500..': {
                    on: function() {
                        carouselGallerySlider.destroySlider();
                        carouselGallerySlider.reloadSlider({
                            slideSelector: $('.teamSliderHolder .slide'),
                            pager: true,
                            controls: false,
                            auto: false,
                            touchEnabled: false,
                            minSlides: 1,
                            maxSlides: 4,
                            moveSlides: 1,
                            slideWidth: 270,
                            shrinkItems: true,
                            slideMargin: 30,
                            infiniteLoop: true
                        });
  
                    },
                    off: function() {
                        carouselGallerySlider.destroySlider();
                        carouselGallerySlider.reloadSlider({
                            slideSelector: $('.teamSliderHolder .slide'),
                            pager: true,
                            controls: false,
                            auto: false,
                            touchEnabled: false,
                            minSlides: 1,
                            maxSlides: 1,
                            moveSlides: 1,
                            slideWidth: 270,
                            shrinkItems: true,
                            slideMargin: 30,
                            infiniteLoop: true
                        });
                    }
                }
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
                moveSlides: 2,
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

function initAjaxLoadMoreFunction()
{
	var condition = $('.ajaxListHolder').size()
	    // && false
	;init(condition);

	function init(condition)
	{
	    if(condition || condition == null)
	    {
			var $container = $('.ajaxListHolder');

			if($container.find('.next').length)
			{
				$('.loadMoreBtn').attr('href', $container.find('.next a').attr('href'));
				$container.find('.pagination').remove();
			}
			else
			{
				$('.loadMoreBtn').hide();
			}

			$container.isotope(
				{
					itemSelector: '.load-item',
					animationEngine: 'best-available',
					transitionDuration : '0.6s'
				});

			$('.filterBTNHolder a').on( 'click', function()
			{
				var _this = $(this);
				var filterValue = _this.attr('data-filter');

				$('.filterBTNHolder li').removeClass('active');
				_this.closest('li').addClass('active');

				$container.isotope({ filter: filterValue });

				return false;
			});

			$('.loadMoreBtn').click(function()
			{
				var _this = $(this);
				var _href = _this.attr('href');

				$.ajax({
					url: _href,
					success: function(data){
						var requiredObject =  $('div.ajaxListHolder', data);
						var _items = requiredObject.find('.load-item');
						var _nextPageLink = requiredObject.find('.next');

						if(_nextPageLink.length)
						{
							$('.loadMoreBtn').attr('href', _nextPageLink.find('a').attr('href'));
						}
						else
						{
							$('.loadMoreBtn').hide();
						}

						$container.append( _items ).isotope( 'appended', _items ).isotope('layout');

						setTimeout(function()
						{
							$('.filterBTNHolder .active a').trigger('click');
						},500);
					}
				});

				// $container.isotope();

				return false;
			});
	    }
	}
}

function initCounterFunction() {
    var condition = $('.countersHolder').length
        // && false
    ;init(condition);

    function init(condition) {

        if (condition || condition == null) {
            Number.prototype.formatMoney = function (c, d, t) {
                var n = this,
                    c = isNaN(c = Math.abs(c)) ? 2 : c,
                    d = d == undefined ? "." : d,
                    t = t == undefined ? "," : t,
                    s = n < 0 ? "-" : "",
                    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            };
            $('.countersHolder').viewportChecker({
                offset: '20%',
                callbackFunction: function (elem, action) {
                    $('.countersHolder .box').each(function (index, elm) {
                        var $container = $(this),
                            $number = $container.find('.value'),
                            initial = ($container.data('initial') || '0') + '',
                            target = ($container.data('target') || '10') + '',
                            prefix = $container.data('prefix') || '',
                            suffix = $container.data('suffix') || '',
                            commaNumber;
                        // 0 for integers, 1+ for floats (number of digits after the decimal)
                        precision = 0,
                            usingComma = false;
                        if (target.indexOf('.') != -1) {
                            precision = target.length - 1 - target.indexOf('.');
                        } else if (target.indexOf(',') != -1) {
                            precision = target.length - 1 - target.indexOf(',');
                            usingComma = true;
                            target = target.replace(/\,/gim, '');
                        }
                        initial = window[precision ? 'parseFloat' : 'parseInt'](initial, 10);
                        target = window[precision ? 'parseFloat' : 'parseInt'](target, 10);

                        if (/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)) {
                            if (usingComma) {
                                $number.html(prefix + target.toFixed(precision).replace('\.', ',') + suffix);
                            } else {
                                $number.html(prefix + target.toFixed(precision) + suffix);
                            }

                            return;
                        }

                        if (usingComma) {
                            commaNumber = +initial.toFixed(precision);
                            $number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
                        } else {
                            $number.html(prefix + initial.toFixed(precision) + suffix);
                        }

                        var current = initial,
                            step = 25,
                            stepValue = (target - initial) / 25,
                            interval = setInterval(function (usingComma) {
                                current += stepValue;
                                step--;
                                if (usingComma) {
                                    commaNumber = +current.toFixed(precision);
                                    $number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
                                } else {
                                    $number.html(prefix + current.toFixed(precision) + suffix);
                                }
                                if (step <= 0) {
                                    if (usingComma) {
                                        commaNumber = +target.toFixed(precision);
                                        $number.html(prefix + commaNumber.formatMoney(0, '', ',') + suffix);
                                    } else {
                                        $number.html(prefix + target.toFixed(precision) + suffix);
                                    }
                                    window.clearInterval(interval);
                                }
                            }, 40, usingComma);
                    });
                }
            });
        }
    }
}

// &quot;tab&quot; key handling
function initTabNav() {
	jQuery('#navbarNavDropdown').tabNav({
		items: 'li'
	});
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

/*
 * Accessible TAB navigation
 */
;(function($){
	var isWindowsPhone = /Windows Phone/.test(navigator.userAgent);
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	$.fn.tabNav = function(opt) {
		var options = $.extend({
			hoverClass: 'show',
			items: 'li',
			opener: '>a',
			delay: 10
		},opt);

		if(isWindowsPhone || isTouchDevice) {
			return this;
		}

		return this.each(function() {
			var nav = $(this), items = nav.find(options.items);

			items.each(function(index, navItem) {
				var item = $(this), navActive, touchNavActive;
				var link = item.find(options.opener), timer;

				link.bind('focus', function() {
					navActive = nav.hasClass('js-nav-active');
					touchNavActive = window.TouchNav && TouchNav.isActiveOn(navItem);
					if(!navActive || touchNavActive) {
						initSimpleNav();
					}
					item.trigger(navActive && touchNavActive ? 'itemhover' : 'mouseenter');
				}).bind('blur', function() {
					item.trigger(navActive && touchNavActive ? 'itemleave' : 'mouseleave');
				});

				var initSimpleNav = function() {
					if(!initSimpleNav.done) {
						initSimpleNav.done = true;
						item.hover(function() {
							clearTimeout(timer);
							timer = setTimeout(function() {
								item.addClass(options.hoverClass);
							}, options.delay);
						}, function() {
							clearTimeout(timer);
							timer = setTimeout(function() {
								item.removeClass(options.hoverClass);
							}, options.delay);
						});
					}
				};
			});
		});
	};
}(jQuery));
