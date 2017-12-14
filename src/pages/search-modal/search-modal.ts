import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the SearchModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html',
})
export class SearchModalPage {

  constructor (public navParams: NavParams, private view: ViewController) {
  }

  closeModal(){
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchModalPage');
  }

}
