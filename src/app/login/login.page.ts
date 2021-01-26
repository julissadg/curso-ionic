import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService : LoginService , private route : Router ) { 
    this.formLogin = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
  }

  loginClick(){
    const data = new LoginRequest();
    data.email = this.formLogin.get('email').value;
    data.password = this.formLogin.get('password').value;

    this.loginService.login(data).subscribe(res=>{
      console.log(res.token);
      if(res.token){
        this.route.navigate(['home'])
      }else{
        alert("Email o contraseña invalidos");
      }
    }, err =>{
        console.log(err);
        alert("Email o contraseña invalidos");
    });

  }

}
