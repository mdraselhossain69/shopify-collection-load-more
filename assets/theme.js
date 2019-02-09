$(function(){
  
$('.js-show-more').on('click', function(evt) {
    evt.preventDefault();

    // only send on ajax request at a time
    if (
      $('.js-show-more').hasClass('btn--ajax-disabled') ||
      $('.js-show-more').hasClass('btn--disabled')
    )
      return;

    $('.js-show-more').addClass('btn--ajax-disabled');
    var $showMoreButton = $('.js-show-more');
    $.ajax({
      url: $showMoreButton.attr('href'),
      type: 'GET',
      dataType: 'html',
      beforeSend: function() {
                $showMoreButton.text('loading...');  
      }
    })
      .done(function(data) {
        var $data = $(data);
        var $newItems = $data.find('.grid__item--collection-template');
        var showMoreUrl = $data.find('.js-show-more').attr('href');
        var $showMoreButton = $('.js-show-more');
		//console.log($data)
        $('.grid--view-items').append($newItems);

        //update grid items selector so that the imagesLoaded plugin knows about them
        //$('.grid__item--collection-template') = $('.grid__item--collection-template');

        if (showMoreUrl.length) {
          $showMoreButton.attr('href', showMoreUrl);
        } else {
          $showMoreButton.addClass('btn--disabled');
        }
       
      })
      .always(function() {
        $showMoreButton.removeClass('btn--ajax-disabled');
      	$showMoreButton.text('view more');  
      });
});
                    
});