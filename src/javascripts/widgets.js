
/*
function init() {
  alert("test");
};

$(document).ready(function() { 
	$('body').append("<div class='adk_fixed' id='adk_fixed'><div class='adk-top'><div class='close'></div><div class='adk-title'>REKLAMA</div></div><div id='adk-adcode'></div></div>");
};

*/

(function($) {  
	$.fn.nsSlideOut = function(options) {

		var defaults = {
			width: '300px',
			height: '220px',
			placement: 'http://adsearch.adkontekst.pl/_/ads0/?QAPS_AKPL=--6347-106877-#10811--&noChache=uvw04y'
		};
		
		var options = $.extend(defaults, options); 

		$('body').append("<div class='adk-fixed' id='adk-fixed'><div class='adk-top'><div class='close'></div><div class='adk-title'>REKLAMA</div></div><div class='adk-adcode'></div></div>");
		
		$('.adk-fixed').height(options['height'])
			       .width( options['width'] );

		$('.adk-fixed .close').click(function(){ $(".adk-fixed").hide(); });

		var script = document.createElement("script"); 
		script.setAttribute("type", "text/javascript"); 
		script.setAttribute("src", options["placement"]); 
		document.getElementsByClassName('adk-adcode')[0].appendChild(script);

		
 		return this;
	};
})(jQuery);
