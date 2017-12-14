import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { MapDirectionPage } from '../map-direction/map-direction';
import { SearchModalPage } from '../search-modal/search-modal';
import { ModalOptions } from 'ionic-angular/components/modal/modal-options';
declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
  infoWindows: any;
  search: boolean = false;
  constructor(public navCtrl: NavController, public http: Http, private modal: ModalController) {
  }

  ionViewWillEnter() {
    this.displayGoogleMap();
    this.getMarkers();
    
  }

  onLoadUser(name: DoubleRange){
    this.navCtrl.setRoot(MapDirectionPage,{userName:name});
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(13.7448301, 100.7226306);

    let mapOptions = {
      center: latLng,
      zoom: 11,
      disableDoubleClickZoom: false,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
  getMarkers() {
    this.http.get('assets/data/markers.json')
    .map((res) => res.json())
    .subscribe(data => {
      this.addMarkersToMap(data);
    });
  }
  addInfoWindowToMarker(marker) {
    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>'+ marker.lat +'</br>'+ marker.lng +'</div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent+'<button id = "myid" style="background-color:red;color:white;width:100%;height:30px;font-size:16px;">ประเมินราคา</button>'
    });
    var sendLatLng  = marker.lat+','+ marker.lng ;
    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('myid').addEventListener('click', () => {
        this.navCtrl.push(MapDirectionPage,{userName:sendLatLng});
      });
    });
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }
  
  addMarkersToMap(markers) {
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var toMarker = new google.maps.Marker({
        position: position,
        
        title: marker.name,
        lat: marker.latitude,
        lng: marker.longitude,
        
        icon: 'assets/imgs/pin-home.png'});
      toMarker.setMap(this.map);
      this.addInfoWindowToMarker(toMarker);
    }
  }
  // funtion ba ba ba
  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }
  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }
  

  // Search Modal
  openModal(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false,
      cssClass : 'pricebreakup'
    };
    
    const searchModal = this.modal.create(SearchModalPage,myModalOptions);
    searchModal.present();
  }

}