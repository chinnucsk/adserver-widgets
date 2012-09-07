nscontext-widgets
=================

Website widgets


## Usage 

In website HEAD load all require resources: jquery, stylesheets and nscontext-widgets.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="http://www.nscontext.com/widgets/style.css" />
    <script type="text/javascript" src="http://www.nscontext.com/widgets/widgets.js" ></script>

You can use those resources from our server or download them and place on your server directly.

Also in head configure the placement:

    <script type="text/javascript">
      //<![CDATA[
        jQuery.noConflict();
        (function($) {
        $(document).ready( function() {
          $().ns_slideout({
            width: '300px',
            title: "Ciekawe artykuły z sieci",
            height: '220px',
            placement: 'http://emisja.contentstream.pl/_/ads1/?QAPS_ADART=9468f1f6243d00fb8e5477d6ec2de786',
            distanceTop: '1600px',
            position: 'right'
          });
        });
        })(jQuery);
      //]]>
    </script>

Remember to you own placement scripts in order to earn from click.

## Where to get placement scripts ?

* Adkontekst.pl
* ContentStream.pl 


## Configure the placement

Slide Out placement have several parameters that you can use to customize the user experience.

* width - placement width in pixels (default: "300px")
* height - placement height in pixels (default: "220px")
* title - text that will be shown in placement header (default: "REKLAMY")
* distanceTop - distance from page top in pixels on which placement will be shown (default: "900px")
* placement - URL to one of nscontext compatible placement scripts
* position - right or left side of the website (default: "right")

## Need help ?

Contact us anytime: contact [at] nscontext [dot] com
