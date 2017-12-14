webpackJsonp([0],{

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/map-direction/map-direction.module": [
		274,
		4
	],
	"../pages/search-modal/search-modal.module": [
		276,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__map_direction_map_direction__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_modal_search_modal__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, http, modal) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.modal = modal;
        this.search = false;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.displayGoogleMap();
        this.getMarkers();
    };
    HomePage.prototype.onLoadUser = function (name) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__map_direction_map_direction__["a" /* MapDirectionPage */], { userName: name });
    };
    HomePage.prototype.displayGoogleMap = function () {
        var latLng = new google.maps.LatLng(13.7448301, 100.7226306);
        var mapOptions = {
            center: latLng,
            zoom: 11,
            disableDoubleClickZoom: false,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    };
    HomePage.prototype.getMarkers = function () {
        var _this = this;
        this.http.get('assets/data/markers.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.addMarkersToMap(data);
        });
    };
    HomePage.prototype.addInfoWindowToMarker = function (marker) {
        var _this = this;
        var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>' + marker.lat + '</br>' + marker.lng + '</div>';
        var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent + '<button id = "myid" style="background-color:red;color:white;width:100%;height:30px;font-size:16px;">ประเมินราคา</button>'
        });
        var sendLatLng = marker.lat + ',' + marker.lng;
        google.maps.event.addListenerOnce(infoWindow, 'domready', function () {
            document.getElementById('myid').addEventListener('click', function () {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__map_direction_map_direction__["a" /* MapDirectionPage */], { userName: sendLatLng });
            });
        });
        marker.addListener('click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    HomePage.prototype.closeAllInfoWindows = function () {
        for (var _i = 0, _a = this.infoWindows; _i < _a.length; _i++) {
            var window = _a[_i];
            window.close();
        }
    };
    HomePage.prototype.addMarkersToMap = function (markers) {
        for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
            var marker = markers_1[_i];
            var position = new google.maps.LatLng(marker.latitude, marker.longitude);
            var toMarker = new google.maps.Marker({
                position: position,
                title: marker.name,
                lat: marker.latitude,
                lng: marker.longitude,
                icon: 'assets/imgs/pin-home.png'
            });
            toMarker.setMap(this.map);
            this.addInfoWindowToMarker(toMarker);
        }
    };
    // funtion ba ba ba
    HomePage.prototype.toggleSearch = function () {
        if (this.search) {
            this.search = false;
        }
        else {
            this.search = true;
        }
    };
    HomePage.prototype.resizeMap = function () {
        var _this = this;
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
        }, 200);
    };
    // Search Modal
    HomePage.prototype.openModal = function () {
        var myModalOptions = {
            enableBackdropDismiss: false,
            cssClass: 'pricebreakup'
        };
        var searchModal = this.modal.create(__WEBPACK_IMPORTED_MODULE_5__search_modal_search_modal__["a" /* SearchModalPage */], myModalOptions);
        searchModal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mapContainer'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object)
    ], HomePage.prototype, "mapContainer", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/superball/ionProject/src/pages/home/home.html"*/`<ion-header hidden>\n  <ion-navbar color="secondary">\n  	\n    <ion-title>\n      Map\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)=\'toggleSearch()\'>\n        <ion-icon name="search"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)=\'choosePosition()\'>\n        <ion-icon name="ios-locate-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n	<div class="switch">\n	  <button ion-button icon-only color="light" (click)=\'toggleSearch()\'><ion-icon name="search"></ion-icon></button>\n	  <button ion-button color="light" (click)="(switch = \'map\'); resizeMap()" [class.active]="(switch == \'map\')" icon-only><ion-icon name="map"></ion-icon></button>\n	  <button ion-button color="light" icon-only menuToggle><ion-icon name="list"></ion-icon></button>\n	</div>\n\n	<div class="currentitem" *ngIf="currentregional">\n	  <button ion-item no-lines (click)="viewPlace(currentregional.title)">\n	    <h2>{{ currentregional.title }}</h2>\n	    <ion-note item-right icon-only><ion-icon name="ios-arrow-forward"></ion-icon></ion-note>\n	  </button>\n	</div>\n<ion-content>\n    <ion-row #searchbar id="floating-panel" [hidden]="!search">\n      <ion-searchbar placeholder="Search" (click)="openModal()" class="searchbar searchbar-ios searchbar-left-aligned"><div class="searchbar-input-container"><button class="searchbar-md-cancel disable-hover button button-md button-clear button-clear-md button-clear-md-dark" clear="" color="dark" ion-button="" mode="md" type="button"><span class="button-inner"><ion-icon name="md-arrow-back" role="img" class="icon icon-ios ion-md-arrow-back" aria-label="arrow back"></ion-icon></span><div class="button-effect"></div></button><div class="searchbar-search-icon"></div><input class="searchbar-input" dir="auto" placeholder="Search" type="search" autocomplete="off" autocorrect="off" spellcheck="false"><button class="searchbar-clear-icon disable-hover button button-ios button-clear button-clear-ios" clear="" ion-button="" type="button"><span class="button-inner"></span><div class="button-effect"></div></button></div><button class="searchbar-ios-cancel disable-hover button button-ios button-clear button-clear-ios" clear="" ion-button="" mode="ios" type="button" tabindex="-1"><span class="button-inner">Cancel</span><div class="button-effect"></div></button></ion-searchbar>\n      \n    </ion-row>\n    \n  <div #mapContainer id="map"></div>\n  \n</ion-content>\n`/*ion-inline-end:"/Users/superball/ionProject/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _d || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_map_direction_map_direction__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_search_modal_search_modal__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_map_direction_map_direction__["a" /* MapDirectionPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_search_modal_search_modal__["a" /* SearchModalPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/map-direction/map-direction.module#MapDirectionPageModule', name: 'MapDirectionPage', segment: 'map-direction', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-modal/search-modal.module#SearchModalPageModule', name: 'SearchModalPage', segment: 'search-modal', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_map_direction_map_direction__["a" /* MapDirectionPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_search_modal_search_modal__["a" /* SearchModalPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["b" /* HttpModule */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/superball/ionProject/src/app/app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"/Users/superball/ionProject/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapDirectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MapDirectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapDirectionPage = (function () {
    function MapDirectionPage(navCtrl, navParams, plt) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.plt.ready().then(function () {
            _this.start = 'penn station, new york, ny'; //{lat:xxxx,lng:xxxxxx}
            _this.end = 'grand central station, new york, ny';
            _this.showMap();
        });
    }
    MapDirectionPage.prototype.ngOnInit = function () {
        this.name = this.navParams.get('userName');
    };
    MapDirectionPage.prototype.ionViewWillEnter = function () {
        this.showMap();
    };
    MapDirectionPage.prototype.showMap = function () {
        var markerArray = [];
        //declear>>>
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        //declear<<<
        var options = {
            zoom: 13,
            center: { lat: 40.771, lng: -73.974 }
        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        directionsDisplay.setMap(this.map);
        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow;
        // Display the route between the initial start and end selections.
        this.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, this.map);
    };
    MapDirectionPage.prototype.calculateAndDisplayRoute = function (directionsDisplay, directionsService, markerArray, stepDisplay, map) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }
        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
            origin: 'Bangkok',
            destination: this.name,
            travelMode: 'DRIVING'
        }, function (response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                //showSteps(response, markerArray, stepDisplay, map);
                //>>>>
                var myRoute = response.routes[0].legs[0];
                for (var i = 0; i < myRoute.steps.length; i++) {
                    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
                    marker.setMap(map);
                    marker.setPosition(myRoute.steps[i].start_location);
                    //attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
                    //>>>
                    google.maps.event.addListener(marker, 'click', function () {
                        // Open an info window when the marker is clicked on, containing the text
                        // of the step.
                        var getposition_lat = marker.getPosition().lat();
                        var getposition_lng = marker.getPosition().lng();
                        alert(JSON.stringify(myRoute));
                        stepDisplay.setContent(myRoute.steps[0].instructions + "<br>" + getposition_lat + "<br>" + getposition_lng + "<br>");
                        stepDisplay.open(map, marker);
                    });
                    //>>>
                }
                //>>>
            }
            else {
                alert('ไม่สามารถระบุแผนที่ได้');
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object)
    ], MapDirectionPage.prototype, "mapRef", void 0);
    MapDirectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map-direction',template:/*ion-inline-start:"/Users/superball/ionProject/src/pages/map-direction/map-direction.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Blank\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-card>\n        <ion-card-content>\n          <p>{{ name }} </p>\n            <div #directionsPanel></div>\n        </ion-card-content>\n    </ion-card>\n  \n    <div #map id="map"></div>\n</ion-content>\n`/*ion-inline-end:"/Users/superball/ionProject/src/pages/map-direction/map-direction.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__["a" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__["a" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]) === "function" && _d || Object])
    ], MapDirectionPage);
    return MapDirectionPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=map-direction.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SearchModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchModalPage = (function () {
    function SearchModalPage(navParams, view) {
        this.navParams = navParams;
        this.view = view;
    }
    SearchModalPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    SearchModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchModalPage');
    };
    SearchModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-modal',template:/*ion-inline-start:"/Users/superball/ionProject/src/pages/search-modal/search-modal.html"*/`<!--\n  Generated template for the SearchModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>SearchModal</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="closeModal()">close</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n`/*ion-inline-end:"/Users/superball/ionProject/src/pages/search-modal/search-modal.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]) === "function" && _b || Object])
    ], SearchModalPage);
    return SearchModalPage;
    var _a, _b;
}());

//# sourceMappingURL=search-modal.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map