import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit  {
  user: User = {
    id: 0,
    type: 0,
    name: '',
    email: '',
    cell: '',
    password: ''
  }


  constructor(private userService: UserService) { }


  ngOnInit(): void {

  }

  register(): void {
    this.userService.register(this.user).subscribe(() => {
      console.log('Usuário registrado com sucesso!');
    });
  }

}
