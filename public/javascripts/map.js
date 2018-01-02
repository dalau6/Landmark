function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.4849, lng: -119.9663},
    zoom: 6
  })
  add.forEach(function(element) {
    var geocoder = new google.maps.Geocoder()
    geocodeAddress(geocoder, map)
    function geocodeAddress(geocoder, resultsMap) {
      if(Array.from(new Set(city)).length===1 || Array.from(new Set(zip)).length===1) {
        map.setZoom(11)
        var address = element
      } 
      else if(add.length === 1) {
        map.setZoom(16)
        var address = element
      } else {
        var address = element
      }
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location)
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location,
            title: address,
            animation: google.maps.Animation.DROP,
          })
          var infowindow = new google.maps.InfoWindow({
            content: '<a href="/property?id='+address+"\""+'>'+address+'</a>'
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });
        } else {
        }
      }) 
    }
  })
}
