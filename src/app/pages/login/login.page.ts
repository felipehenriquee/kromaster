;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loading: any;
  public form : FormGroup;
  public registro = false;
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private loadingController: LoadingController, 
    private toastController: ToastController) { 
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required

      ])],
      password: ['', Validators.compose([
        Validators.required

      ])]
    })
  }

  ngOnInit() {
  }
  async login(){
    const user = {email: this.form.controls['email'].value, password: this.form.controls['password'].value,}
    await this.presentLoading();
    try {
      const user2 = await this.authService.login(user);
      window.localStorage.setItem('userId', user2.user.uid);
      
    } catch (error) {
      console.error(error);
      let message;
      switch(error.code){
        case "auth/email-already-in-use":
          message = "Email já cadastrado"
          break
        case "auth/invalid-email":
          message = "Email inválido"
      }
      this.presentToast(message);
    } finally{
      this.loading.dismiss();

    }
  }

  async registrar(){
    const user = {email: this.form.controls['email'].value, password: this.form.controls['password'].value,}
    await this.presentLoading();
    try {
      const user2 = await this.authService.register(user)
      window.localStorage.setItem('userId', user2.user.uid);
    } catch (error) {
      console.error(error);
      let message;
      switch(error.code){
        case "auth/email-already-in-use":
          message = "Email já cadastrado"
          break
        case "auth/invalid-email":
          message = "Email inválido"
      }
      this.presentToast(message);
    } finally{
      this.loading.dismiss();

    }
    
    // console.log("registro")
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
  resetForm(){

    
    this.form.controls["email"].setValue(null);
    this.form.controls["password"].setValue(null);

}
}
