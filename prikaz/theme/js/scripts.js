$(document).ready(function() {


    $('.property-item-wrap .like').click(function() {
        $(this).toggleClass('active');
    });

    if (window.matchMedia('(min-width: 992px)').matches) {
        $('.properties-wrapper').enllax();
    }
    if (window.matchMedia('(max-width: 991px)').matches) {
        $('.form-title h3').click(function() {
            $('.form-fields-wrap').slideToggle(400);
            $(this).find('.open-small-form').toggleClass('rotate');
        });
    }





});



$(window).on('load resize', function() {
    /*if (window.matchMedia('(min-width: 992px)').matches) {
    	var menuHeight = $('.menu-wrap').outerHeight();
    	$('.inner-title').css('top', menuHeight);

    	var innerSliderheight = $('#front-slider .item').outerHeight();
    	$('.inner-title').height(innerSliderheight - menuHeight);
    } */

    var owl = $("#front-slider");
    owl.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        autoplay: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut"
    });
    var owl1 = $("#similar-slider");
    owl1.owlCarousel({
        items: 4,
        loop: false,
        nav: true,
        navText: [''],
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        autoplay: true,
        margin: 30,
        responsiveClass: true,

        responsive: {
            0: {
                items: 1
            },
            575: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1199: {
                items: 4
            }
        },
    });

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 1; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        onInitialized: function() {
            updateSizeSync1();
        },
        items: 1,
        slideSpeed: 2000,
        // nav: true,
        // navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        autoplay: true,
        dots: false,
        loop: false,
        responsiveRefreshRate: 200,
    }).on('changed.owl.carousel', syncPosition);

    function updateSizeSync1() {
        var allItems = $('#sync1 .item');
        var smallestItem = allItems[0];
        $(allItems).each(function() {
            if ($(this).height() < $(smallestItem).height())
                smallestItem = $(this);
        });
        var addHeight = $(smallestItem).height();
        $('#sync1 .item').height(addHeight);
    }

    sync2
        .on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            onInitialized: function() {
                updateSizeSync2();
            },
            items: 3,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1199: {
                    items: 3
                }
            },
            dots: false,
            margin: 30,
            nav: true,
            navText: [''],
            loop: false,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
        }).on('changed.owl.carousel', syncPosition2);

    function updateSizeSync2() {
        var allItems = $('#sync2 .item');
        var smallestItem = allItems[0];
        $(allItems).each(function() {
            if ($(this).height() < $(smallestItem).height())
                smallestItem = $(this);
        });
        var addHeight = $(smallestItem).height();
        $('#sync2 .item').height(addHeight);
    }

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        // try {
        // 	if (current > end) {
        // 		sync2.data('owl.carousel').to(current, 100, true);
        // 	}
        // 	if (current < start) {
        // 		sync2.data('owl.carousel').to(current - onscreen, 100, true);
        // 	}
        // } catch (e) {
        // 	console.log(e);
        // }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
});

$(window).on('load', function() {
    var docH = $('body').height();
    console.log(docH);
    var footH = $('footer').height();
    console.log(footH);
    scrolShow = docH - footH * 2.5;
    console.log(scrolShow);

    function checkPosition() {
        if ($(this).scrollTop() > scrolShow) {
            $('#btt').fadeIn(300);
        } else {
            $('#btt').fadeOut(300);
        }
    }

    // Show or hide the sticky footer button
    $(window).scroll(checkPosition);

    // Animate the scroll to top
    $('#btt').click(function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });

    checkPosition();
});