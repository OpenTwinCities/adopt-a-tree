// TODO Turn this into a component
// Include reference to LocationView
class ThingMap{
  static addMarkersAround(lat, lng){
    var submitButton = $("#address_form input[type='submit']");
    $.ajax({
      type: 'GET',
      url: '/things.json',
      data: {
        'utf8': '✓',
        'lat': lat,
        'lng': lng,
        'limit': $('#address_form input[name="limit"]').val()
      },
      error: function(jqXHR) {
        $(submitButton).attr("disabled", false);
      },
      success: function(data) {
        $(submitButton).attr("disabled", false);
        if(data.errors) {
          $('#address').parent().addClass('error');
          $('#address').focus();
        } else {
          $('#address').parent().removeClass('error');
          var i = -1;
          var thingTitles = [];
          $(data).each(function(index, thing) {
            var thingType = thing.species || 'Thing';
            var thingTitle = thingType + '_' + thing.id;
            thingTitles.push(thingTitle);
            if($.inArray(thing.id, ThingMap.thingIds) === -1) {
              i += 1;
            } else {
              // continue
              return true;
            }
            setTimeout(function() {
              var point = new google.maps.LatLng(thing.lat, thing.lng);
              if(thing.user_id) {
                var color = 'green';
              } else {
                var color = 'red';
              }
              ThingMap.addMarker(thing.id, thingTitle, point, color);
              if(index === i) {
                // at this point the things should exist in the DOM
                ThingMap.addClassesAndIdsToThings(thingTitles);
              }
            }, i * 100);
          });
        }
      }
    });
  }

  static addMarker(thingId, thingTitle, point, color) {
    if(color === 'green') {
      var image = ThingMap.greenMarkerImage;
    } else if(color === 'red') {
      var image = ThingMap.redMarkerImage;
    }
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      icon: image,
      map: ThingMap.map,
      position: point,
      shadow: ThingMap.markerShadowImage,
      title: thingTitle,
      optimized: false
    });
    google.maps.event.addListener(marker, 'click', function(a, b, c) {
      if(activeInfoWindow) {
        activeInfoWindow.close();
      }
      var infoWindow = new google.maps.InfoWindow({
        maxWidth: 210
      });
      google.maps.event.addListener(infoWindow, 'closeclick', function() {
        isWindowOpen = false;
      });
      activeInfoWindow = infoWindow;
      activeThingId = thingId;
      activeMarker = marker;
      $.ajax({
        type: 'GET',
        url: '/info_window',
        data: {
          'thing_id': thingId
        },
        success: function(data) {
          // Prevent race condition, which could lead to multiple windows being open at the same time.
          if(infoWindow === activeInfoWindow) {
            infoWindow.setContent(data);
            infoWindow.open(ThingMap.map, marker);
            isWindowOpen = true;
          }
        }
      });
    });
    ThingMap.thingIds.push(thingId);
  }


  // This helps with testing and other... manipulations
  static addClassesAndIdsToThings(thingTitles){
    $(thingTitles).each(function(i, tt) {
      var $thing = $('div[title="' + tt + '"]');
      $thing.addClass('thing');
      $thing.attr('id', tt);
    });
  }

  static initialize(){
    ThingMap.thingIds = [];
    
    // Setup markers
    ThingMap.size = new google.maps.Size(27.0, 37.0);
    ThingMap.origin = new google.maps.Point(0, 0);
    ThingMap.anchor = new google.maps.Point(13.0, 18.0);
    ThingMap.greenMarkerImage = new google.maps.MarkerImage(AdoptA.green_marker_image_path,
        ThingMap.size,
        ThingMap.origin,
        ThingMap.anchor
      );
    ThingMap.redMarkerImage = new google.maps.MarkerImage(AdoptA.yellow_marker_image_path,
        ThingMap.size,
        ThingMap.origin,
        ThingMap.anchor
      );
    ThingMap.markerShadowImage = new google.maps.MarkerImage(AdoptA.shadow_marker_image_path,
        new google.maps.Size(46.0, 37.0),
        ThingMap.origin,
        ThingMap.anchor
      );
    
    ThingMap.center = new google.maps.LatLng(44.983333, -93.266667);
    ThingMap.mapOptions = {
        center: ThingMap.center,
        disableDoubleClickZoom: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 19,
        minZoom: 10,
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        scrollwheel: true,
        streetViewControl: true,
        zoom: 12,
        zoomControl: true
      };
    ThingMap.map = new google.maps.Map(document.getElementById("map"), ThingMap.mapOptions);


    google.maps.event.addListener(ThingMap.map, 'idle', function() {
      var center = map.getCenter();
      ThingMap.addMarkersAround(center.lat(), center.lng());
    });
  }
}


