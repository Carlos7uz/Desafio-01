import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user?: User;
  email?: string;
  cell?: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUserProfile();
    console.log(this.loadUserProfile())
  }

  loadUserProfile(): void {
    const userId = this.authService.getUserIdFromToken();
    console.log(userId)
    if (userId !== null) {
      this.authService.getUser(userId).subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Erro ao carregar perfil:', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado no token.');
    }
  }
/*

getUser(): void{
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.authService.getUser(id).subscribe(profile =>
    (this.user = profile)
  )
}

 */


  updateProfile(): void {
    const user: User = {
      email: this.email,
      cell: this.cell
    } as User
    this.authService.updateUser(user);
  }

}
