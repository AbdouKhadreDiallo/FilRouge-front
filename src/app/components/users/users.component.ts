import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { Users } from 'src/app/model/user.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public displayedColumns = ['id','firstname', 'lastname', 'email', 'profil', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  currentUser = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private route:ActivatedRoute, private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        console.log(data['hydra:member']);
        this.dataSource.data = data['hydra:member'] as Users[];
        
        console.log(this.dataSource);
      },
      err=>console.log(err)
    );
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }
  getUser(id: any): void {
		this.userService.get(id).subscribe(
			data => {
				this.currentUser = data;
				console.log(data);

			},
			error => {
				console.log(error);

			});
	}
  deleteUser(id: number): void {
		this.userService.delete(id).subscribe(
			response =>{
        Swal.fire({
           icon: 'success',
          text: 'Archivé avec succes',
        })
				console.log(response);
			},
			error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
			});
  }

}
