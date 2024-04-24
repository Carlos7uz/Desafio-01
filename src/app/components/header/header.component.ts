import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean | null = null;

  @Output() private logout = new EventEmitter();

  onLogout(): void {
    this.logout.emit();
  }
}
