import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join-session.component.html'
})
export class JoinSessionComponent {
  passphrase = '';
  errorMessage = '';

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {}

  join(): void {
    const username = this.userService.getUsername();
    if (!username || !this.passphrase.trim()) {
      this.errorMessage = 'Username or passphrase is missing.';
      return;
    }

    this.sessionService.joinSession(this.passphrase.trim(), username).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/vote', this.passphrase.trim()]);
      },
      error: () => {
        this.errorMessage = 'Could not join session. Check passphrase.';
      }
    });
  }
}
