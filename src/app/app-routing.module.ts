import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AddProfilComponent } from './components/profils/add-profil/add-profil.component';
import { EditProfilComponent } from './components/profils/edit-profil/edit-profil.component';
import { ProfilsComponent } from './components/profils/profils.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{
		path: 'admin', component: AdminComponent,
		children: [
			{
				path: '', component: UsersComponent
			},
			{
				path: 'users', component: UsersComponent
			},
			{
				path: 'users/add', component: AddUserComponent
			},
			{
				path: 'profils', component: ProfilsComponent
			},
			{
				path: 'profils/add', component: AddProfilComponent
			},
			{
				path: 'profils/:id', component: EditProfilComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
