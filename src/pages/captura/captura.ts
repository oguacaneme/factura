import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { Platform, ActionSheetController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CapturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-captura',
  templateUrl: 'captura.html',
})
export class CapturaPage {

  image: string = '';
_zone: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
             private camera: Camera,
            public platform: Platform,
           public loadingCtrl: LoadingController,
         public actionsheetCtrl: ActionSheetController) {

            this._zone = new NgZone({ enableLongStackTrace: false });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CapturaPage');
  }


  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take Photo',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
});

actionSheet.present();
}



takePicture() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
});

loader.present();

  // Take a picture saving in device, as jpg and allows edit
  this.camera.getPicture({
    quality: 100,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 1000,
    sourceType: 1,
    allowEdit: true,
    saveToPhotoAlbum: true,
    correctOrientation: true
  }).then((imageURI) => {
    loader.dismissAll();

    // bind the URI returned by API
    this.image = imageURI;

  }, (err) => {
    console.log(`ERROR -> ${JSON.stringify(err)}`);
  });
}
}
