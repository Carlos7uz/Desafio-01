import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn: boolean | null = null;

  @Output() private logout = new EventEmitter();

  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getIsAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  onLogout(): void {
    this.logout.emit();
  }
}
