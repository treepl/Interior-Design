jQuery(function () {
    initCardsSorting();
    initCustomInfoCarousel();
    initCustomTextCarousel();
    initProjectsCarousel();
    initComingSoonCountDown();
    initHeaderHeight();
    initCounterFunction();
    initTabNav();
    initTabNavDrop();
    initHoverForEdge();
    initTabProjects();
    initTabTeam();
});


function initHoverForEdge() {
	jQuery('.card').hover(function() {
        $(this).addClass('hover');
    });
    
    $('.card').mouseleave(function() {
        $(this).removeClass('hover');
    });
}


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

            var _bigSlider = $('.carouselGalleryHolder .imageHolder').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.carouselGalleryHolder .thumbnail ul'
              });

    
            var _thumbSlider = $('.carouselGalleryHolder .thumbnail ul').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.carouselGalleryHolder .imageHolder',
                dots: false,
                centerMode: true,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button" tabindex="0"><i class="icon icon-left-arrow"></i> </button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button" tabindex="0"><i class="icon icon-right-arrow"></i></button>',
                focusOnSelect: true
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
  
            $('.teamSliderHolder .slideset').slick({
                dots: true,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button" tabindex="0"><i class="icon icon-left-arrow"></i> </button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button" tabindex="0"><i class="icon icon-right-arrow"></i></button>',
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 3
                        }
                      },
                    {
                      breakpoint: 980,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 690,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
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

            var carouselGallerySlider = $('.textSliderHolder .slideset').slick({
                dots: true,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="icon icon-left-arrow"></i> </button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="icon icon-right-arrow"></i></button>',
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [
                    
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
           
                  ]
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
		hoverClass: 'show',
		items: 'li.dropdown'
	});
}
function initTabNavDrop() {
	jQuery('#navbarNavDropdown li.dropdown').tabNav({
		hoverClass: 'show',
		items: '.dropdown-menu'
	});
}
function initTabProjects() {
	jQuery('.portfolio-list').tabNav({
		hoverClass: 'hover',
		items: '.card'
	});
}
function initTabTeam() {
	jQuery('.team-slider').tabNav({
		hoverClass: 'hover',
		items: '.card'
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
                dateAndTime : "2020/09/09 00:00:00",
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
			hoverClass: 'hover',
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