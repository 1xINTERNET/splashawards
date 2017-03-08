const jQuery = require('jquery');
const Bootstrap = require('bootstrap-sass');
const jQueryOnce = require('jquery-once');
const Slick = require('slick-carousel');

(function ($, Drupal) {

  /*Drupal.behaviors.exampleBehavior = {
    attach: (context) => {
      $('.my-selector', context).once('example-behavior').each(() => {});
    }
  };*/

  jQuery('.sponsor-slider').each(function(position, element) {
      $(element).slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3
      });
  });

})(jQuery, window.Drupal);
