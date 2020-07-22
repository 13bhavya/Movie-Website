import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-map-agm',
  templateUrl: './map-agm.component.html',
  styleUrls: ['./map-agm.component.css']
})
export class MapAgmComponent implements OnInit {
  @ViewChild('search') search: ElementRef;
  title: string = 'AGM project';
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsService: google.maps.DirectionsService;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  getString: any;
  getTimesstamp: Number;
  placeId: string;

  origin = "Collins St, Melbourne, Australia";
  destination = "MCG Melbourne, Australia";
  travelMode: google.maps.TravelMode.DRIVING;
  private geoCoder;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  onClick() {
    console.log(this.search);
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

      // setTimeout(() => {
      //   this.getDirection()
      // }, 5000)
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.search.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    })
    this.getDirection();
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getString = position.coords.altitude;
        this.getTimesstamp = position.timestamp;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getDirection() {
    console.log("getDirection")
    let origin = this.origin;
    let destination = this.destination;
    let travelMode = this.travelMode
    this.directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: travelMode,
    },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(result)
        }
      })
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event.placeId);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.placeId = $event.placeId;

    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      this.setCurrentLocation()
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
