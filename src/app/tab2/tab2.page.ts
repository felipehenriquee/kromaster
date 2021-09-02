import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { CardsService } from './../services/cards.service';
import { Cards } from './../models/cards';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public selectedPhoto;
  public imgUrl;
 
  private card: Cards;
  public loading: any;
  public form : FormGroup;
  public platform: Platform
  constructor(private cardsService: CardsService,
    private loadingController: LoadingController, 
    private toastController: ToastController,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    private file: File,
    private fb: FormBuilder, ) {
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required

      ])],
      descricao: ['', Validators.compose([
        Validators.required

      ])],
      pa: ['', Validators.compose([
        Validators.required

      ])],
      pm: ['', Validators.compose([
        Validators.required

      ])],
      pv: ['', Validators.compose([
        Validators.required

      ])],
      poderes: ['', Validators.compose([
        Validators.required

      ])]
    })

  }
  async add(){
    await this.presentLoading();
    
    this.card = {
      nome: this.form.controls['nome'].value,
      id: "none",
      pm: this.form.controls['pm'].value,
      pa: this.form.controls['pa'].value,
      pv: this.form.controls['pv'].value,
      poderes: this.form.controls['poderes'].value,
      descricao: this.form.controls['descricao'].value,
      foto: "https://cartajouer.com/3851-home_default/Purchase-Gold-KAS3-11-Nakunbra-Saison-3-Krosmaster-Arena-Hokatsu.jpg"
    }
    this.cardsService.addCards(this.card)
    .then(()=>{
      this.presentToast("Cadastrado com sucesso");
      this.form.reset();
    })
    .catch((e)=>{
      this.presentToast(e.message);
    }).finally(() =>{
      this.loading.dismiss();
    });

    
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde',
      
    });
    return this.loading.present();

    
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async openGallery(){
    const option: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    try {
      const fileUri = await this.camera.getPicture(option).then((imageData)=>{
        this.selectedPhoto = this.dataUrltoBlob('data:image/jpeg;base64,'+imageData);
        this.uploadPicture();
      }, (err)=>{
        this.presentToast(err)
      }
      );
      let file: string;
      
  
    } catch (error) {
      console.log(error)
    }
  }
  uploadPicture(){
    const  ref = this.afStorage.ref('icard/ionic.jpg');
    const task = ref.put(this.selectedPhoto);
  }

  dataUrltoBlob(foto){
    let binary = atob(foto.split(',')[1]);
    let array = []
    for (let i=0; i<binary.length; i++){
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
  }
  

}
