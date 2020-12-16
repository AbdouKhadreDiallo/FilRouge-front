import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Profils } from 'src/app/model/profils.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ProfilsService } from 'src/app/services/profil/profils.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
	currentUser = null;
	profils: Profils[] = [];
	registerForm: FormGroup;
	error = '';


	constructor(private http:HttpClient,private loginService: LoginService,private profilService: ProfilsService,private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { 
		this.registerForm = this.formBuilder.group({
			profil: this.profils,
			firstname: ['', [Validators.required]],
			email: ['', [
				Validators.required,
				Validators.email,
			]],
			lastname: ['', [Validators.required]],
			avatar: [''],
		});
	}

	ngOnInit(): void {
		this.profilService.getProfils().subscribe(
			data => {
				this.profils = data['hydra:member'];
			},
			err => console.log(err)
		);
	}
	onFileSelect(event: { target: { files: string | any[]; }; }){
		if (event.target.files.length>0) {
			const file = event.target.files[0];
			this.registerForm.get('avatar')?.setValue(file);
		}
	}

	addUser(){
		let attrs = ['firstname','lastname','email'];
		if (this.registerForm.value.avatar) {
			attrs.push('avatar');
		}
		const registerFormData = new FormData();
		for (let att of attrs) {
			registerFormData.append(att, this.registerForm.get(att).value);
		}
		console.log(registerFormData);
		

		if (this.registerForm.value.profil['libelle'] == 'APPRENANT') {
			this.http.post<any>(`${this.loginService.baseUrl}/apprenants`, registerFormData, this.loginService.httpOptions).subscribe(
				(response) => {
					console.log(response);
					Swal.fire({
						icon: 'success',
						text: 'ajout effectué avec succes'
					});
					this.router.navigate(["users"]);
				},
				error => {
					console.log(error);
				}

			);
		}
	}

}
