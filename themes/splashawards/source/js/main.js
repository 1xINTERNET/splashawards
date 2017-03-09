const jQuery = require('jquery');
const Bootstrap = require('bootstrap-sass');
const jQueryOnce = require('jquery-once');
const Slick = require('slick-carousel');

(function ($, Drupal) {
    Drupal.behaviors.splashawards = {
        attach: function (context, settings) {
            if (jQuery(context).find('#views-exposed-form-nomination-list-block-2 select').length > 0) {
                var $menu = jQuery('<ul>'),
                    dataKey = 'category-tid',
                    $submitButton = jQuery(context).find('#views-exposed-form-nomination-list-block-2 .js-form-submit'),
                    menuItemSelectedClass = 'selected';

                $menu.toggleClass('nomination-category-menu js-nomination-category-menu');
                jQuery(context).find('#views-exposed-form-nomination-list-block-2 select').parent().append($menu);

                // reading the select-options creating the menu-list based on the their content
                jQuery(context).find('#views-exposed-form-nomination-list-block-2 select option').each(function (position, element) {
                    var tid = element.value,
                        categoryName = element.innerText,
                        $listElement = jQuery('<li>');

                    // mark the menu-representing the selected option as selected
                    if(jQuery(element).is(':selected')) {
                        $listElement.toggleClass(menuItemSelectedClass);
                    }

                    $listElement.text(categoryName);
                    $menu.append($listElement);
                    $listElement.data(dataKey, tid);
                });

                jQuery(context).find('.sponsor-slider').each(function (position, element) {
                    $(element).slick({
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    });
                });

                jQuery(context).find('.nomination-screenshots-slider').each(function (position, element) {
                    $(element).slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipe: false,
                        touchMove: false,
                        autoplay: true,
                        arrows: false,
                        autoplaySpeed: 2000
                    });
                });

                // attaching event-listener to rendered out menue
                jQuery(context).find('.js-nomination-category-menu li').on('click', function(event) {
                    jQuery(event.target).siblings('.' + menuItemSelectedClass).toggleClass(menuItemSelectedClass);
                    jQuery(event.target).toggleClass(menuItemSelectedClass);

                    // finding the requested option-and selecting it
                    jQuery(context).find(
                        '#views-exposed-form-nomination-list-block-2 select option[value=' +
                        jQuery(event.target).data(dataKey) + ']'
                    ).selected();
                    $submitButton.click();
                });
            }
        }
    };
})(jQuery, window.Drupal);
