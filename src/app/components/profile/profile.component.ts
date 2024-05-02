import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute, Route } from '@angular/router';
import { ReservaService } from 'src/app/core/services/reserva.service';
import { Reserva } from 'src/app/core/models/reserva.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user?: User;
  email?: string;
  cell?: string;
  reservas: Reserva[] = []
  userId = this.authService.getUserIdFromToken();

  constructor(private authService: AuthService, private route: ActivatedRoute, private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    if (this.userId !== null) {
      this.authService.getUser(this.userId).subscribe(
        user => {
          this.user = user;
          if (this.userId !== null) {
            this.getReservasByUser();
          }
        },
        error => {
          console.error('Erro ao carregar perfil:', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado no token.');
    }
  }

  getReservasByUser(): void {
    this.reservaService.getReservasByUser().subscribe(
      reservas => {
        this.reservas = reservas;
      },
      error => {
        console.error('Erro ao carregar reservas:', error);
      }
    );
  }

  updateProfile(): void {
    const user: User = {
      email: this.email,
      cell: this.cell
    } as User
    this.authService.updateUser(user);
  }

}
