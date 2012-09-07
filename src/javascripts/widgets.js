/*

  nsContext widgets - ver 0.05

*/ 
(function($) {  
	$.fn.ns_slideout = function(options) {

		var defaults = {
			width: '300px',
			height: '220px',
			placement: 'http://adsearch.adkontekst.pl/_/ads0/?QAPS_AKPL=--6347-106877-#10811--&noChache=uvw04y',
			distanceTop: '900px',
			title: "REKLAMY",
      position: "right"
		};
		
		var options = $.extend(defaults, options); 
    
    // Build widget HTML
		$('body').append("<div class='adk-fixed' id='adk-fixed'><div class='adk-top'><div class='close'></div><div class='adk-title'></div></div><div class='adk-adcode'></div></div>");

	// Set widget title
    $(".adk-title").html( options["title"] );

    var widget = $('.adk-fixed');

    // Set Class name for different positions
    widget.addClass( "adk-position-"+options["position"] )

		
		// Set widget size
		widget.height( options['height'] ).width( options['width'] );
			
	  // Hide widget by default
		widget.css( options['position'],  "-"+options['width'] );

    // Remove widget on Close Button click
		widget.find('.close').click(function(){ $(".adk-fixed").remove(); });

    // Insert Ad Script
		var script = document.createElement("script"); 
		script.setAttribute("type", "text/javascript"); 
		script.setAttribute("src", options["placement"]); 
		$('.adk-adcode')[0].appendChild(script);

		var on_scroll = function() {
      var distanceTop = parseInt( options['distanceTop']);

      var animation = {}
      animation[ options["position"] ] = 0;

      if( $(window).scrollTop() > distanceTop || 
          distanceTop == 0  || 
          $(window).height() === $(document).height() ) {
        
        widget.animate( animation ,300);
      } else {

        animation[ options["position"] ] = "-"+options["width"]; 
        widget.stop(true).animate( animation ,100);
      }
		};

    // Show widget on certain page height
		$(window).scroll( on_scroll );

		// Show if page not high enough to have scroll
		on_scroll()

 		return this;
	};
})(jQuery);
