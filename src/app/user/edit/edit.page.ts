import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { AlertController, MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// Não permite somente espaços nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  // 3) Atributos
  public profileForm: FormGroup; // Contém o formulário de contatos
  public pipe = new DatePipe('en_US'); // Formatar as datas
  public options: any;
  public user: any;

  constructor(
    public form: FormBuilder,
    public afs: AngularFirestore,
    public alert: AlertController,
    private menuCtrl: MenuController,
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit() {

    // Cria o formulário
    this.profileFormCreate();

    // Obtém dados do usuário logado
    this.auth.onAuthStateChanged(
      (userData) => {

        // Obtém dados documeto
        this.afs.firestore.doc(`profile/${userData.uid}`).get()
          .then(
            (uData) => {
              this.user = uData.data();

              if (this.profileForm) {
                this.profileForm.controls.uid.setValue(this.user.date.trim());
                this.profileForm.controls.name.setValue(this.user.name.trim());
                this.profileForm.controls.email.setValue(this.user.email.trim());
                this.profileForm.controls.cellphone.setValue(this.user.cellphone.trim());
                this.profileForm.controls.whatsapp.setValue(this.user.whatsapp);
                this.profileForm.controls.address.setValue(this.user.address.trim());
                this.profileForm.controls.gender.setValue(this.user.gender.trim());
                this.profileForm.controls.origin.setValue(this.user.origin.trim());
                this.profileForm.controls.status.setValue(this.user.status.trim());
                this.profileForm.controls.uid.setValue(this.user.uid.trim());
              }
            }
          )
          .catch(
            (error) => {
              console.error(`Erro: ${error}`);
            }
          )
      });

  }

  // Cria o formulário
  profileFormCreate() {

    this.profileForm = this.form.group({

      // Data o cadastro
      date: [''],

      // Campo 'Nome' (name)
      name: [
        '', // Valor inicial
        Validators.compose([ // Validação do campo
          Validators.required, // Obrigatório
          Validators.minLength(3), // Pelo menos 3 caracteres
          removeSpaces // Não permite somente espaços
        ]),
      ],

      // Campo 'E-mail' (email)
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email, // Valida somente se for um e-mail válido
          removeSpaces
        ]),
      ],

      cellphone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/),
          removeSpaces
        ]),
      ],

      whatsapp: [true],

      address: [
        '', // Valor inicial
        Validators.compose([ // Validação do campo
          Validators.required, // Obrigatório
          Validators.minLength(6), // Pelo menos 6 caracteres
          removeSpaces // Não permite somente espaços
        ]),
      ],

      gender: ['outro'],

      origin: [''],

      status: ['ativo'],

      uid: ['']

    });
  }

  // 7) Processa o envio do formulário]
  contactSend() {

    // Cria e formata a data
    this.profileForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.afs.collection('profile').doc(this.profileForm.value.uid).set(this.profileForm.value)
      .then(
        () => {

          // Feedback
          this.presentAlert();
        }
      )
      .catch(

        // Exibe erro se não salvar
        (error) => {
          alert('Erro ao salvar cadastro.' + error);
        }
      );
  }

  // Feedback
  // Exibe feedback
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Oba!',
      message: 'Seus dados foram alterados com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {

          // Reset do formulário
          // this.profileForm.reset();

          // Redireciona para conteúdo
          this.router.navigate(['/user/profile']);
        }
      }]
    });

    await alert.present();
  }
}