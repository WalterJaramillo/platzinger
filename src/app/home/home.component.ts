import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  friends: User[];
  query: string = '';
  friendEmail: string = '';

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private requestService: RequestsService) { 

      this.authenticationService.getStatus().subscribe((status)=> {
        this.userService.getUserById(status.uid).valueChanges().subscribe((data: User)=> {
          this.user = data;
        }, (err)=> {
          console.log(err);
        })
      }, (err)=> {
        console.log(err);
      });


      this.userService.getUsers().valueChanges().subscribe((data: User[])=> {
        this.friends = data;
      }, (err)=> {
        console.log(err);
      });
  }
  

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logOut().then( (data)=> {
      alert('Sesion cerrada');
      this.router.navigate(['login']);
    }).catch((err)=> {
      console.log(err);
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    }

    this.requestService.createRequest(request).then( (result)=> {
      alert('Solicitud Enviada');
    }).catch( (err)=> {
      alert('hubo un error');
      console.error(err);
    })
  }
}
