import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private loginSerice: LoginService, private router: Router) { }

  ngOnInit(): void {
    $(".hamburger").on('click', function(){
      $(".wrapper").toggleClass("active")
    })
  }
  logout(){
    this.loginSerice.logout();
    this.router.navigate(['']);
  }

}
