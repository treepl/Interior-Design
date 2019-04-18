jQuery(function () {
    initCardsSorting();
});
// $('.dropdown-toggle').dropdown();


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