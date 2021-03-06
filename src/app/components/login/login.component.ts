import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  token: any;


  constructor(public loginService: LoginService, builder: FormBuilder) { 
    this.loginForm = builder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
    //return;
    this.loginService.getToken(this.loginForm.value.username, this.loginForm.value.password);
    //console.log(this.loginService.getToken(this.loginForm.value.login, this.loginForm.value.password));
    
    this.token = this.loginService.decodeToken();
    console.log(this.token);
    this.loginService.redirectByRole(this.token.roles[0]);
  }

  

}
