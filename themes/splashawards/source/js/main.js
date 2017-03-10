const jQuery = require('jquery');
const Bootstrap = require('bootstrap-sass');
const jQueryOnce = require('jquery-once');
const Slick = require('slick-carousel');

(function ($, Drupal) {
    Drupal.behaviors.splashawards = {
        attach: function (context, settings) {
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

            var parentTeaserSelector = '.view-compositstartpage.view-id-compositstartpage.view-display-id-block_2';

            if (jQuery(context).find(parentTeaserSelector + ' select').length > 0) {
                var $menu = jQuery('<ul>'),
                    dataKey = 'category-tid',
                    $submitButton = jQuery(context).find(parentTeaserSelector + ' .form-actions .js-form-submit'),
                    menuItemSelectedClass = 'selected';

                $menu.toggleClass('nomination-category-menu js-nomination-category-menu');
                jQuery(context).find(parentTeaserSelector + ' select').parent().append($menu);

                // reading the select-options creating the menu-list based on the their content
                jQuery(context).find(parentTeaserSelector + ' select option').each(function (position, element) {
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

                // attaching event-listener to rendered out menue
                jQuery(context).find('.js-nomination-category-menu li').on('click', function(event) {
                    jQuery(event.target).siblings('.' + menuItemSelectedClass).toggleClass(menuItemSelectedClass);
                    jQuery(event.target).toggleClass(menuItemSelectedClass);

                    // finding the requested option-and selecting it
                    jQuery(context).find(
                        parentTeaserSelector + ' select option[value=' +
                        jQuery(event.target).data(dataKey) + ']'
                    ).selected();
                    $submitButton.click();
                });
            }
        }
    };
})(jQuery, window.Drupal);
