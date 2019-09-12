{% component type: "module", source: "Google Map", layout: "", collectionVariable: "map" %}

<section class="map-holder" width="1920" height="615">
    <div class="google-map-holder" id="mapHolder" style=" height:500px;"></div>
</section>
<script>
    $(function(){
        initGoogleMaps();
    });

    function initGoogleMaps() {
        var condition = $('#mapHolder').length
            // && false
        ;init(condition);

        function init(condition) {
            if(condition || condition == null) {
                var myLatLng = {lat: +'{{map.items[0].LocationLat}}', lng: +'{{map.items[0].LocationLng}}' };
                var mapOptions = {
                    zoom: 13,
                    center: myLatLng,
                    scrollwheel: false,
                    styles: 
                    [
                            {
                                "featureType": "administrative",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": "-100"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 65
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": "50"
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": "-100"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "lightness": "30"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "lightness": "40"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#ffff00"
                                    },
                                    {
                                        "lightness": -25
                                    },
                                    {
                                        "saturation": -97
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "lightness": -25
                                    },
                                    {
                                        "saturation": -100
                                    }
                                ]
                            }
                    ]
                    
                };

                var mapElement = document.getElementById('mapHolder');
                var map = new google.maps.Map(mapElement, mapOptions);
                var _markers = [
                    {% for item in map.items -%}
                    {% if forloop.last == true -%}
                    ['{{map.items[0].Name}}', +'{{map.items[0].LocationLat}}', +'{{map.items[0].LocationLng}}']
                            {% else -%}
                        ['{{map.items[0].Name}}', +'{{map.items[0].LocationLat}}', +'{{map.items[0].LocationLng}}'],
                    {% endif -%}
                    {% endfor -%}
                ];

                var latlngbounds = new google.maps.LatLngBounds();

                for (var i = 0; i < _markers.length; i++) {
                    var _marker = _markers[i];
                    var myLatLng = new google.maps.LatLng(_marker[1], _marker[2]);
                    var marker = new google.maps.Marker({
                        position: {lat: _marker[1], lng: _marker[2]},
                        map: map,
                        icon: none,
                        title: _marker[0]
                    });
                    latlngbounds.extend(myLatLng);
                }

                if(_markers.length > 1) {
                    map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));
                }
                
            }
        }
    }
</script>