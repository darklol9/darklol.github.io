$(function() {

    let prevElement = $('.active')[0];
    let nav = $('.nav-links')[0];
    let scrolling = false;

    $(nav).children().each(function () {
        let href = $(this).children()[0];
        $(href).on('click', function (e) {
            e.preventDefault();
            let id = $(href).attr('href').replace('#', '');
            let section = $('#' + id);
            if (section.length === 0) return;
            section[0].scrollIntoView({behavior: 'smooth'});
            $(prevElement).removeClass('active');
            $(href).addClass('active');
            prevElement = href;
            scrolling = true;
            setTimeout(function () {
                scrolling = false;
            }, 1000);
        });
    });

    $(window).scroll(function () {
        if (scrolling) return;
        let scrollPos = $(document).scrollTop();
        let sections = $('section');
        sections.each(function () {
            let top = $(this).offset().top - 100;
            let bottom = top + $(this).outerHeight();
            if (scrollPos >= top && scrollPos <= bottom) {
                let id = $(this).attr('id');
                $(prevElement).removeClass('active');
                let href = $('.nav-links a[href="#' + id + '"]');
                href.addClass('active');
                prevElement = href;
            }
        });
    });

});