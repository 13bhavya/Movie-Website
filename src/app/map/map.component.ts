import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) gmap: ElementRef;

  map: google.maps.Map;
  lat = 43.755080;
  lng = -79.311630;
  coordinates = new google.maps.LatLng(this.lat, this.lng)

  markers = [
    {
      position: new google.maps.LatLng(43.755080, -79.311630),
      map: this.map,
      title: "Marker 1",
      setContent: new google.maps.Circle
    },
    {
      position: new google.maps.LatLng(43.755080, -80.311630),
      map: this.map,
      title: "Marker 2",
      setContent: "askm sa sd a" 
    },
    {
      position: new google.maps.LatLng(43.755080, -81.311630),
      map: this.map,
      title: "Marker 3",
      setContent: "askm sa sd a" 
    }
  ];

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }

  mapInitializer() {

    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);

    // this.marker.addListener("click", () => {
    //   const infoWindow = new google.maps.InfoWindow({
    //     content: this.marker.getTitle()
    //   });
    //   infoWindow.open(this.marker.getMap(), this.marker);
    // });

    this.marker.setMap(this.map);

    this.loadAllMarkers();
  }

  constructor() { }

  ngOnInit(): void {
    this.mapInitializer()

  }

}
