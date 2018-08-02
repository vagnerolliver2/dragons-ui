import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SystemContentService } from './system-content.service';

@Injectable()
export class AuthService {
  private user;

  private mockedUsers = [
    { nome: 'Vágner Silveira',
      id: '1',
      email: 'vagner.olliver@gmail.com',
      password: '123'
    },
    { nome: 'Fulano',
      id: '1',
      email: 'admin',
      password: 'admin'
    }
  ];

  constructor(
    private systemContentService: SystemContentService,
    private router: Router,
    private toastr: ToastrService
  ) {  }

  authUser(password, email) {
    const user = this.mockedUsers.filter(mockedUser => {
      return email == mockedUser.email;
    });

    if (user.length < 1) {
      this.toastr.error('Dados inválidos.', 'Dragons');
      return false;
    } else if (user.length === 1) {
      if (user[0].password == password) {
         this.user = user[0];
      } else {
        this.toastr.error('Dados inválidos.', 'Dragons');
        return false;
      }
    }

    localStorage.setItem('logged', 'true');
    localStorage.setItem('name', this.user.nome);

    this.systemContentService.document.body.classList.remove('page-login');
    this.router.navigate(['/system']);
  }

  logout() {
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.systemContentService.document.body.classList.add('page-login');
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  loggedUserName() {
    return localStorage.getItem('name');
  }
}
