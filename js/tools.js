$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('inputDate',
        function(curDate, element) {
            if (this.optional(element) && curDate == '') {
                return true;
            } else {
                if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                    return true;
                } else {
                    $.validator.messages['inputDate'] = 'Дата введена некорректно';
                    return false;
                }
            }
        },
        ''
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('input', '.form-input textarea', function() {
        this.style.height = (this.scrollHeight) + 'px';
    });

	$('body').on('click', '.form-input-clear', function(e) {
		$(this).parent().find('input').val('').trigger('change').trigger('blur');
		e.preventDefault();
	});

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-input span').html('<em>' + curName + '<a href="#"></a></em>');
        } else {
            curField.find('.form-file-input span').html(curField.find('.form-file-input span').attr('data-placeholder'));
        }
    });

    $('body').on('click', '.form-file-input span em a', function(e) {
        var curField = $(this).parents().filter('.form-file');
        curField.find('input').val('');
        curField.find('.form-file-input span').html(curField.find('.form-file-input span').attr('data-placeholder'));
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('keydown change', '.ajax-form .form-input input, .ajax-form .form-input textarea', function() {
        $(this).parents().filter('form').find('.message').remove();
    });

    $('body').on('click', '.ajax-form .form-submit input', function() {
        $(this).parents().filter('form').find('.message').remove();
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        var options = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            adaptiveHeight: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        };
        curGallery.slick(
            options
        ).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
    });

    $('body').on('click', '.text-with-hint-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.text-with-hint.open').removeClass('open');
            curBlock.removeClass('to-right');
            curBlock.addClass('open');
            var curPopup = curBlock.find('.text-with-hint-popup');
            if (curPopup.offset().left + curPopup.outerWidth() > $(window).width()) {
                curBlock.addClass('to-right');
            }
            if (curPopup.offset().top + curPopup.outerHeight() > $('.wrapper').outerHeight()) {
                curBlock.addClass('to-bottom');
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-popup-close', function(e) {
        $('.text-with-hint.open').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.text-with-hint').length == 0) {
            $('.text-with-hint.open').removeClass('open');
        }
    });

    $('.container table').each(function() {
        var curTable = $(this);
        if (!curTable.parent().hasClass('table-scroll')) {
            curTable.wrap('<div class="table-scroll"></div>');
        }
    });

	$('body').on('click', '.main-stream-video-link', function(e) {
		$('.main-stream-video-player').html('');
		$(this).parent().addClass('start');
		$(this).parent().find('.main-stream-video-player').html('<iframe width="560" height="315" src="' + $(this).attr('href') + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
		e.preventDefault();
	});

    var clipboard = new ClipboardJS('.main-map-window-coords span');
    clipboard.on('success', function(e) {
        $('.main-map-window-coords span').addClass('success');
    });

    $('.main-map-window-coords span').on('mouseleave', function() {
        $('.main-map-window-coords span').removeClass('success');
    });

    $('.main-map-window-routes a').click(function(e) {
        $('.main-map-window-routes').toggleClass('location-routes-enable');
        if ($('.main-map-window-routes').hasClass('location-routes-enable')) {
            if (myMap !== undefined) {
                myMap.controls.add('routePanelControl', {float: 'right'});

                var control = myMap.controls.get('routePanelControl');

                control.routePanel.state.set({
                    type: 'auto',
                    fromEnabled: true,
                    to: coords,
                    toEnabled: false
                });

                control.routePanel.options.set({
                    allowSwitch: false,
                    reverseGeocoding: false
                });
            }
        } else {
            if (myMap !== undefined) {
                myMap.controls.remove('routePanelControl');
            }
        }
        e.preventDefault();
    });

	$('body').on('click', '.speakers-search .form-input-clear', function(e) {
		filterSpeakers(true);
		e.preventDefault();
	});

	$('body').on('submit', '.speakers-ctrl form', function(e) {
		filterSpeakers(true);
		e.preventDefault();
	});

    $('body').on('click', '.speakers-container .pager a', function(e) {
        $('.speakers-container .pager a.active').removeClass('active');
        $(this).addClass('active');
        filterSpeakers(false);
        e.preventDefault();
    });

    $('body').on('click', '.speakers-letters a', function(e) {
        var curLink = $(this);
        if (curLink.hasClass('active')) {
            curLink.removeClass('active');
        } else {
            $('.speakers-letters a.active').removeClass('active');
            curLink.addClass('active');
        }
        filterSpeakers(false);
        e.preventDefault();
    });

    $('.main-stream-speaker').on('mouseenter', function() {
        var curSpeaker = $(this);
        $('.main-stream-speaker-window').remove();
        $('.wrapper').append('<div class="main-stream-speaker-window">' + curSpeaker.find('.main-stream-speaker-info').html() + '</div>');
        $('.main-stream-speaker-window').css({'left': curSpeaker.offset().left, 'top': curSpeaker.offset().top});
    });

    $('.main-stream-speaker').on('mouseleave', function() {
        $('.main-stream-speaker-window').remove();
    });

    $('.main-stream-speakers').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#main-stream-speakers-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#main-stream-speakers-next"></use></svg></button>',
        dots: false,
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        if (nextSlide > 0) {
            $('.main-stream-speakers').addClass('shift');
        } else {
            $('.main-stream-speakers').removeClass('shift');
        }
    });

    $('.programm').each(function() {
        redrawProgramm();
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('body').on('click', '.speaker-card-descr-more a', function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

});

function initForm(curForm) {
    if (curForm.hasClass('no-send-form')) {
        return;
    }

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input:focus, .form-input textarea:focus').each(function() {
        $(this).trigger('focus');
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
    });

    curForm.find('.form-input-date input').mask('00.00.0000');
    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date input').addClass('inputDate');

    curForm.find('.form-input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var isCorrectDate = true;
            var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
            if ($(this).attr('min')) {
                var minDateStr = $(this).attr('min');
                var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                if (userDate < minDate) {
                    isCorrectDate = false;
                }
            }
            if ($(this).attr('max')) {
                var maxDateStr = $(this).attr('max');
                var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                if (userDate > maxDate) {
                    isCorrectDate = false;
                }
            }
            if (isCorrectDate) {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    var curValueArray = curValue.split('.');
                    myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                    myDatepicker.show();
                    $(this).focus();
                }
            } else {
                $(this).addClass('error');
                return false;
            }
        }
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        if ($(this).hasClass('maxDate1Year')) {
            var curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() + 1);
            curDate.setDate(curDate.getDate() - 1);
            maxDate = curDate;
            var maxDay = curDate.getDate();
            if (maxDay < 10) {
                maxDay = '0' + maxDay
            }
            var maxMonth = curDate.getMonth() + 1;
            if (maxMonth < 10) {
                maxMonth = '0' + maxMonth
            }
            $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
        }
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" /></svg>',
            nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" /></svg>',
            minDate: minDate,
            maxDate: maxDate,
            startDate: startDate,
            toggleSelected: false
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        if ($(window).width() > 1119) {
            options['dropdownAutoWidth'] = true;
        }

        if (curSelect.parents().filter('.window').length == 1) {
            options['dropdownParent'] = $('.window-content');
        }

        curSelect.select2(options);

        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('.select2-container').removeClass('select2-container--full select2-container--full-multiple');
            }
        });

        if (curSelect.val() != '' && curSelect.val() !== null) {
            curSelect.trigger({type: 'select2:select'})
            curSelect.parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
        }
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('ajax-form')) {
                curForm.addClass('loading');
                var formData = new FormData(form);

                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    data: formData,
                    cache: false
                }).done(function(data) {
                    curForm.find('.message').remove();
                    if (data.status) {
                        curForm.find('.form-input input, .form-input textarea').each(function() {
                            $(this).val('').trigger('change blur').removeClass('error valid');
                            $(this).parent().removeClass('focus full');
                        });
                        curForm.prepend('<div class="message message-success">' + data.message + '</div>')
                    } else {
                        curForm.prepend('<div class="message message-error">' + data.message + '</div>')
                    }
                    curForm.removeClass('loading');
                });
            } else if (curForm.hasClass('window-form')) {
                var formData = new FormData(form);

                windowOpen(curForm.attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('html').hasClass('mobile-menu-open')) {
        $('html').removeClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.wrapper').css('margin-top', 0);
        $(window).scrollTop($('html').data('scrollTop'));
    }

    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        $(window).trigger('resize');

    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}

$(window).on('load resize', function() {
    if ($(window).width() > 1199) {
        if ($('.table-scroll').length > 0) {
            $('.table-scroll').mCustomScrollbar('destroy');
        }
    } else {
        if ($('.table-scroll').length > 0) {
            $('.table-scroll').each(function() {
                var curTableScroll = $(this);
                curTableScroll.mCustomScrollbar({
                    axis: 'x'
                });
            });
        }
    }

    $('.main-results-list').each(function() {
        $('.main-result').css({'height': 'auto'});
        var maxHeight = 0;
        $('.main-result').each(function() {
            var curHeight = $(this).outerHeight();
            if (curHeight > maxHeight) {
                maxHeight = curHeight;
            }
        });
        $('.main-result').css({'height': maxHeight + 'px'});
    });

    $('.speaker-card-descr-text').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('open with-more');
        if (curBlock.height() < curBlock.find('.speaker-card-descr-text-inner').height()) {
            curBlock.addClass('with-more');
        }
    });
});

function filterSpeakers(noLetter) {
	$('.speakers-container').addClass('loading');
	var curForm = $('.speakers-ctrl form');
	var curData = curForm.serialize();
    if ($('.pager a.active').attr('data-value') != undefined) {
		curData += '&PAGEN_1=' + $('.pager a.active').attr('data-value');
    }

	if ($('.speakers-letters a.active').length == 1 && !noLetter) {
		curData += '&letter=' + $('.speakers-letters a.active').html();
	}

	$.ajax({
		type: 'POST',
		url: curForm.attr('action'),
		dataType: 'html',
		data: curData,
		cache: false
	}).done(function(response) {
		$('.speakers-container .speakers').html($(response).find('.speakers').html());
		$('.speakers-container .pager').html($(response).find('.pager').html());
		$('.speakers-container .speakers-letters').html($(response).find('.speakers-letters').html());
		$('.speakers-container').removeClass('loading');

        $('html, body').animate({'scrollTop': 0});
	});
}

function redrawProgramm() {
    $('.programm-timescale').html('');
    $('.programm-list').html('');

    if (programmData != null) {

        var minHour = 23;
        var maxHour = 0;
        for (var i = 0; i < programmData.length; i++) {
            for (var j = 0; j < programmData[i].data.length; j++) {
                var curEvent = programmData[i].data[j];
                var curHour = Number(curEvent.start.substring(0, 2));
                if (curHour < minHour) {
                    minHour = curHour;
                }
                curHour = Number(curEvent.end.substring(0, 2));
                if (curHour > maxHour) {
                    maxHour = curHour;
                }
            }
        }
        maxHour++;
        var countHour = maxHour - minHour;
        var currentHour = 0;
        for (var i = minHour; i < maxHour; i++) {
            $('.programm-timescale').append('<div class="programm-timescale-item"><span>' + ('0' + i).substr(-2) + ':00</span></div>');
            currentHour++;
        }
        var scheduleHeight = $('.programm-timescale').height();

        var programmHTML =  '';
        for (var i = 0; i < programmData.length; i++) {
            var part_startHour = 0;
            var part_startMinutes = 0;
            var part_endHour = 0;
            var part_endMinutes = 0;

            for (var j = 0; j < programmData[i].data.length; j++) {
                var curEvent = programmData[i].data[j];

                if (j == 0) {
                    var part_startHour = Number(curEvent.start.substr(0, 2));
                    var part_startMinutes = Number(curEvent.start.substr(-2));
                }
                var part_endHour = Number(curEvent.end.substr(0, 2));
                var part_endMinutes = Number(curEvent.end.substr(-2));

            }
            var part_eventTop = (((part_startHour - minHour) + part_startMinutes / 60) / countHour) * 100;
            var part_eventBottom = (((part_endHour - minHour) + part_endMinutes / 60) / countHour) * 100;
            var part_eventHeight = part_eventBottom - part_eventTop;

            programmHTML += '<div class="programm-part" style="top:calc(' + part_eventTop + '%); height:calc(' + part_eventHeight + '%);">';
            programmHTML +=     '<div class="programm-part-inner">' +
                                    '<div class="programm-part-title">' + programmData[i].name + '</div>';
            if (typeof(programmData[i].title) != 'undefined') {
                programmHTML +=     '<div class="programm-part-text">' + programmData[i].title + '</div>';
            }
            programmHTML +=     '</div>' +
                            '</div>';

            for (var j = 0; j < programmData[i].data.length; j++) {
                var curEvent = programmData[i].data[j];

                var startHour = Number(curEvent.start.substr(0, 2));
                var startMinutes = Number(curEvent.start.substr(-2));
                var eventTop = (((startHour - minHour) + startMinutes / 60) / countHour) * 100;
                var endHour = Number(curEvent.end.substr(0, 2));
                var endMinutes = Number(curEvent.end.substr(-2));
                var eventBottom = (((endHour - minHour) + endMinutes / 60) / countHour) * 100;
                var eventHeight = eventBottom - eventTop;

                var classTotal = '';
                if (typeof(programmData[i].title) == 'undefined') {
                    classTotal = 'programm-item-big';
                }

                programmHTML += '<a href="' + curEvent.link + '" class="window-link programm-item ' + classTotal + '" style="top:calc(' + eventTop + '%); height:calc(' + eventHeight + '%);">' +
                                    '<div class="programm-item-inner">' +
                                        '<div class="programm-item-header">' +
                                            '<span><strong>' + curEvent.start + ' – ' + curEvent.end + '</strong>#' + curEvent.type + '</span>' +
                                        '</div>' +
                                        '<div class="programm-item-title">' + curEvent.title + '</div>' +
                                        '<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#programm-item-arrow"></use></svg>' +
                                    '</div>' +
                                '</a>';
            }
        }

        $('.programm-list').append(programmHTML);
        $(window).trigger('resize');
    }
}

$(window).on('resize', function() {

    $('.programm').each(function() {
        $('.programm-timescale-item').css({'height': 174});
        $('.programm').css({'margin-bottom': -174});

        var isValid = false;
        while (!isValid) {
            isValid = true;
            $('.programm-item').each(function() {
                var curItem = $(this);
                if (curItem.outerHeight() < curItem.find('.programm-item-inner').outerHeight()) {
                    isValid = false;
                }
            });
            if (!isValid) {
                var curHeght = $('.programm-timescale-item').eq(0).outerHeight();
                curHeght++;
                $('.programm-timescale-item').css({'height': curHeght});
                $('.programm').css({'margin-bottom': -curHeght});
            }
        }

        $('.programm-part-inner').css({'width': 'auto'});
        $('.programm-part').each(function() {
            var curPart = $(this);
            curPart.find('.programm-part-inner').css({'width': curPart.outerHeight()});
        });
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight / 2) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }
});