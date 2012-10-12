/*

  nsContext widgets - ver 0.07

*/ 
(function($) {  
	$.fn.ns_slideout = function(options) {
    var defaults = {
			width: '300px',
			height: '220px',
			placement: 'http://adsearch.adkontekst.pl/_/ads0/?QAPS_AKPL=--6347-106877-#10811--&noChache=uvw04y',
			distanceTop: '900px',
			title: "REKLAMY",
      position: "right",
      bannedShows: 0
		};
		
		var options = $.extend(defaults, options); 


    /* Cookie Manager */ 
    var cookie = new (function(shows) {
      var set = function(value) {
        var exdate = new Date();
        exdate.setDate( exdate.getDate() + 1 );
        var c_value = escape(value) + "; path=/; expires="+exdate.toUTCString();
        document.cookie = "counter=" + c_value;
      };
      var get = function() {
        var val = null;
        /* w3c cookie managment implementation */
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
          x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
          y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
          x=x.replace(/^\s+|\s+$/g,"");
          if (x=="counter") {
            val = unescape(y);
          }
        }
        return val
      };   
      this.ban = function () {
        set( shows )
      };
      this.canShow = function () {
        var counter = Number( get() )
        if( counter > 0 ) {
          set( -- counter )
          return false;
        }
        return true;
      };
    })( options["bannedShows"] );
		
    
    // Build widget HTML
		var widget = $("<div class='adk-fixed'><div class='adk-top'><div class='close'></div><div class='adk-title'></div></div><div class='adk-adcode'></div></div>");
		
		// dont show if user dont want to see
		if( cookie.canShow() ) {
      $('body').append(widget); 
    } else {
      return this;
    }
	// Set widget title
    widget.find(".adk-title").html( options["title"] );


    // Set Class name for different positions
    widget.addClass( "adk-position-"+options["position"] )

		
		// Set widget size
		widget.height( options['height'] ).width( options['width'] );
			
	  // Hide widget by default
		widget.css( options['position'],  "-"+options['width'] );

    // Remove widget on Close Button click
		widget.find('.close').click( function(){ 
		  cookie.ban()
		  $(this).closest(".adk-fixed").remove(); 
		});

    // Insert Ad Script
		var script = document.createElement("script"); 
		script.setAttribute("type", "text/javascript"); 
		script.setAttribute("src", options["placement"]); 
		widget.find('.adk-adcode')[0].appendChild(script);

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
