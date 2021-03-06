import $ from 'jquery';

$(document).ready(function () {
  $('.js-file-input').on('change',(event)=>{
    $('.js-file-name').text($(event.currentTarget).val());
  });

  createProductSpin();

  $('body').on(
    'click',
    'input.product-refresh',
    function(event) {
      event.preventDefault();

      var query = $(event.target.form).serialize() + '&ajax=1&action=productrefresh';
      var actionURL = $(event.target.form).attr('action');

      $.post(actionURL, query, null, 'json').then(function(resp) {
        prestashop.emit('product updated', {
          reason: {
            productUrl: resp.productUrl,
          }
        });
      });
    }
  );

  prestashop.on('product dom updated', function(event) {
    createProductSpin();
    $($('.tabs .nav-link.active').attr('href')).addClass('active').removeClass('fade');
  });

  function createProductSpin()
  {
    $('#quantity_wanted').TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'material-icons touchspin-up',
      verticaldownclass: 'material-icons touchspin-down',
      buttondown_class: 'btn btn-touchspin js-touchspin',
      buttonup_class: 'btn btn-touchspin js-touchspin'
    });
  }

});
