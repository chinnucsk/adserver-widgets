/*

  nsContext widgets - ver 0.1.0

*/ 
(function($) {  
  "use strict";    
  
  /* Cookie Manager */ 
  var CookieCapping = {
    
    set: function set(cookiekey,value) {
      var exdate = new Date();
      exdate.setDate( exdate.getDate() + 1 );
      var c_value = escape(value) + "; path=/; expires="+exdate.toUTCString();
      document.cookie = cookiekey+"=" + c_value;
    },
    get: function get(cookiekey) {
      var val = null;
      /* w3c cookie managment implementation */
      var i,x,y,ARRcookies=document.cookie.split(";");
      for (i=0;i<ARRcookies.length;i++)
      {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x=== cookiekey ) {
          val = unescape(y);
        }
      }
      return val
    },
    
    /*  Create capping manager */
    create: function create( cookiekey, bannedshows, capping ) { 
      var cookie_bannedshows = cookiekey + "_bannedshows",
          cookie_showscount = cookiekey + "_showscount";

      return {
        ban: function () {
          CookieCapping.set( cookie_bannedshows, bannedshows )
        },
        canShow: function () {
          var bannedshowscount  = Number( CookieCapping.get(cookie_bannedshows) ),
              showscount = Number( CookieCapping.get(cookie_showscount) );

          if( bannedshowscount > 0 ) {
            bannedshowscount -= 1;
            CookieCapping.set( cookie_bannedshows, bannedshowscount );
            return false;
          }

          if( capping > 0 && showscount >= capping ) {
            return false;
          } else {
            showscount += 1;
            CookieCapping.set( cookie_showscount, showscount );
          };
          
          return true;
        }
      }
      
    }
    /* */
  };
  
  

  $.fn.na_onimage = function(options) {
    "use strict";

    var defaults = {
      selector: "img",
      width: "580",
      height: "100",
      color: "FF0000",
      plid: "0",
      maxAds: "3", 
      bannedShows: 0,
      capping: 0,
      adserver: "adkontekst"
    }, shownAds = 0;
        
    /* dont do anything withour prid & caid */
    if( options["prid"] === undefined || options['caid'] === undefined ) {
      return;
    }

    var options = $.extend(defaults, options);    
        
    var cookie = CookieCapping.create("onimage_counter", options.bannedShows, options.capping);

    //we dont really like IE7
    if ( navigator.appVersion.indexOf("MSIE 7.") != -1) {
      return;
    }
        
    // dont show if user dont want to see
    if( ! cookie.canShow() ) {
      return this;
    }

    /* Max Ads on images limitation */
    if( options.maxAds > 5 ) {
      options.maxAds = 5;
    }
        
    var afterLoad = function() {
      var image = $(this);
      
      var width = image.width(),
        height = image.height();
      
      /* Do nothing for too small images */
      if( height < 300 || width < 200 ) {
        return;
      };

      if( shownAds >= options.maxAds ) {
        return;
      } else {
        shownAds += 1;
      };
         
      /* ads */
      var ads = {
        rows: "1",
        cols: "2",
        width: 580
      };
      
      ads.width = width - 50;
      
      if( width < 600 ) {
        ads.cols = 1;
      };
        
        
      /* colors */
      var colors = {
        bg: "FFFFFF",
        text: "000000",
        frame: "FFFFFF",
        color: options.color
      };

      var adserver = ({
        "adkontekst": {
          domain: "adsearch.adkontekst.pl",
          prefix: "AKPL"
        },
        "interia": {
          domain: "emisja.adsearch.pl",
          prefix: "default"
        },
        "pp": {
          domain: "emisja.pp.ns.adkontekst.pl",
          prefix: "default"
        }
      })[options.adserver];
         
      /* adkontekst placement */
      var placement = "http://"+adserver.domain+"/_/ads0/?QAPS_"+
        adserver.prefix+"=--"+
        options["prid"]+"-"+options["caid"]+
        "-"+colors.color+","+colors.bg+","+colors.text+","+colors.color+","+colors.frame+","+colors.bg+","+colors.frame+","+
        ads.width+",100,"+ads.rows+","+ads.cols+",2,2,2,2,t,1,3,1,2,4,t,"+options.plid+",f,--&noChache=false";
   
   
      /* create wrapper */
      var wrapper = image.wrap(function() {
        return '<div class="na_onimage"/>';
      }).parent();         
      
      
      /* copy important styles from image */
      wrapper.css( {
        float: image.css("float"),
        width: Math.max( image.width(), image.attr("width")),
        height: Math.max(image.height(), image.attr("height"))
      } );
      /* copy other props */
      
      var cssprops = ["margin-top","margin-right", "margin-bottom", "margin-left",
                      "padding-top","padding-right", "padding-bottom", "padding-left",
                      "outline-top","outline-right", "outline-bottom", "outline-left"];
      
      $.each(cssprops, function(index,propname) {
        wrapper.css(propname, image.css(propname) );
      });
      
      /* restet style for image */ 
      image.css("margin",0);
      image.css("padding",0);
      image.css("outline",0);

      /* add placement script */
      var script = document.createElement("script"); 
      script.setAttribute("type", "text/javascript"); 
      script.setAttribute("src", placement); 
      wrapper[0].appendChild(script);
      
      /* add close button */
      var button = $("<div>"); 
      button.addClass("close"); 
      button.click( function(e){ 
      cookie.ban()
        wrapper.find(".close, iframe").remove(); 
        e.preventDefault();
        e.stopPropagation();
      });

      //wrapper.bind("DOMSubtreeModified", appendButton);

      /* active checking - not best but it works on IE */
      (function watchCloseButton(){
        if( wrapper.find("iframe")[0] )
          wrapper.find("iframe")[0].parentNode.appendChild(button[0]);
        else
          setTimeout(watchCloseButton,500);
      })();

    };
        
    /* Check if image is loaded and if not wait for it */
    $(options.selector).each( function() {
      var img = $(this);
      if( img.height() > 0 )
        afterLoad.call(this);
      else
        img.load( afterLoad );
    });
        
  };

  $.fn.ns_slideout = function(options) {
    "use strict";

    var defaults = {
      width: '300px',
      height: '220px',
      placement: 'http://adsearch.adkontekst.pl/_/ads0/?QAPS_AKPL=--6347-106877-#10811--&noChache=uvw04y',
      distanceTop: '900px',
      title: "REKLAMY",
      position: "right",
      bannedShows: 0,
      capping: 0
    };
        
    var options = $.extend(defaults, options); 

    // Configure capping
    var cookie = CookieCapping.create("counter", options.bannedShows, options.capping);
    
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

    // Make sure that close button is visiable
    var bottom;   
    if( (bottom = $(window).height() - widget.height() ) < 0  ) {
      widget.css("bottom",bottom);
    }
            
    // Hide widget by default
    widget.css( options['position'],  "-"+options['width'] );

    // Remove widget on Close Button click
    widget.find('.close').click( function(){ 
      cookie.ban()
      $(this).closest(".adk-fixed").remove(); 
    });

    // Insert Ad Script
    var placement = options["placement"];
    if( ! $.isArray(placement) ){ 
      var script = document.createElement("script"); 
      script.setAttribute("type", "text/javascript"); 
      script.setAttribute("src", placement); 
      widget.find('.adk-adcode')[0].appendChild(script);
    } else {
      $.each(placement, function(idx, plc) {
        console.log(plc);
        var script = document.createElement("script"); 
        script.setAttribute("type", "text/javascript"); 
        script.setAttribute("src", plc); 
        widget.find('.adk-adcode')[0].appendChild(script);
      } );
    };  

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
