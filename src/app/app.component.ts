import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService} from './services/user/user.service';
// import { Location } from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'archeo';
  message = '';
  messageConnexion = '';
  successmsgFormContact ='';
  errormsgFormContact = ''
  divSuccess = false;
  divError = false;
  hidden_h_f = false;

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    if(location.pathname == '/admin'){
      this.hidden_h_f = true;
    }
  }

  //fonction pour ouvrir le modal de création de compte
  modalCreationCompte(){
    document.getElementById("closeModalConnexion").click();
    document.getElementById("creationCompte").click();
    this.messageConnexion = '';
  }

  //fonction pour ouvrir le modal de connexion
  modalConnexion(){
    document.getElementById("closeModalCreation").click();
    document.getElementById("connexion").click();
    this.message = '';
  }


  // fonction pour la création d'un nouvel compte utilisateur
  register(form:NgForm){
    this.userService.createNewUser(form.value).subscribe(
      res=>{
        if(res['error'] == true){
          this.message = res['message'];
        }else{
          form.resetForm();
          document.getElementById("closeModalCreation").click();
          document.getElementById("connexion").click();
        }
      },
      err=>{
        this.message = "création échouée, veuillez réessayer !!!";
      }
    )
  }


  //fonction de connexion
  login(form:NgForm){
    this.userService.login(form.value).subscribe(
      res=>{
        if(res['error'] == true){
          this.messageConnexion = res['message'];
        }else{
          form.resetForm();
          localStorage.setItem('connected', "true");
          document.getElementById("connexion").style.display ="none";
          document.getElementById("deconnexion").style.display ="block";
          document.getElementById("closeModalConnexion").click();
        }
      },
      err=>{
        this.messageConnexion = "Email ou mot de passe incorrecte";
      }
    )
  }


  //fonction de déconnexion
  logout():void{
    document.getElementById("connexion").style.display ="block";
    document.getElementById("deconnexion").style.display ="none";
    localStorage.setItem('connected', "false");
    this.messageConnexion ='';
  }

  sendMessage(form:NgForm){
    this.userService.sendMesg(form.value).subscribe(
      res=>{
        if(res['error'] == true){
          this.divError = true;
          this.divSuccess = false;
          this.successmsgFormContact ='';
          this.errormsgFormContact = res['message'];
        }else{
          form.resetForm();
          this.divSuccess = true;
          this.divError = false;
          this.errormsgFormContact = '';
          this.successmsgFormContact = res['message'];
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
  
}
