adserver-widgets
=================

Website widgets:
* slider
* image


## *Slider* usage 

In website HEAD load all require resources: jquery, stylesheets and adserver-widgets.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="http://adserver.netsprint.eu/widgets/style.css" />
    <script type="text/javascript" src="http://adserver.netsprint.eu/widgets/widgets.js" ></script>

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
                position: 'right',
                bannedShows: 5,
                capping: 20
              });
            });
        })(jQuery);
      //]]>
    </script>

Remember to you own placement scripts in order to earn from click.

### Configure the placement

Slide Out placement have several parameters that you can use to customize the user experience.

* width - placement width in pixels (default: "300px")
* height - placement height in pixels (default: "220px")
* title - text that will be shown in placement header (default: "REKLAMY")
* distanceTop - distance from page top in pixels on which placement will be shown (default: "900px")
* placement - URL to one of nscontext compatible placement scripts
* position - right or left side of the website (default: "right")
* bannedShows - how many shows should be ommited after user click the X button (default: 0)
* capping - will limit number of shows per user per day (default: 0 = no limit)

## *Image* usage 

In website HEAD load all require resources: jquery, stylesheets and adserver-widgets.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="http://adserver.netsprint.eu/widgets/style.css" />
    <script type="text/javascript" src="http://adserver.netsprint.eu/widgets/widgets.js" ></script>

You can use those resources from our server or download them and place on your server directly.

Also in head configure the placement:

    <script type="text/javascript">
      //<![CDATA[
        jQuery.noConflict();
        (function($) {
            $(document).ready( function() {    
              $().na_onimage({
                selector: "img",
                prid: "6347",
                caid: "97019",
                plid: "32324",
                maxAds: "1",
                color: "0000bb",
                bannedShows: 1
              });
            });
        })(jQuery);
      //]]>
    </script>

Remember to you own placement scripts in order to earn from click.

### Configure the placement

Slide Out placement have several parameters that you can use to customize the user experience.

* selector - querySelector that will define images that should (default: "img")
* prid - publisher id used in Adkontest 
* caid - channel id used in Adkontekst
* plid - placement id used in Adkontekst (optional)
* maxAds - limit number of images that will get ads on them per each page show
* color - color of header and link in Ad
* bannedShows - how many shows should be ommited after user click the X button (default: 0)
* capping - will limit number of shows per user per day (default: 0 = no limit)

### Important

* images support only Adkontekst.pl emission
* images must have widht > 300px and height > 300px

## Where to get placement scripts ?

* Adkontekst.pl
* ContentStream.pl 

## FAQ

* Slider may dont work properly on older browsers like IE7. Please use <!DOCTYPE html> for your website document. This should allow CSS 'position: fixed' to work.

## Need help ?

Contact us anytime: adserver [at] netsprint [dot] eu
