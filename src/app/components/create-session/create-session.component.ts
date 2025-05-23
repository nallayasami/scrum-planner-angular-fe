import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassphraseService } from '../../services/passphrase.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-session.component.html',
})
export class CreateSessionComponent {
  passphrase = '';
  creating = false;
  createdSessionId: string | null = null;

  constructor(
    private passphraseService: PassphraseService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  generatePassphrase(): void {
    this.passphraseService.getRandomPassphrase().subscribe(p => this.passphrase = p);
  }

  createSession(): void {
    if (!this.passphrase.trim()) return;

    this.creating = true;
    this.sessionService.createSession(this.passphrase).subscribe({
      next: session => {
        this.creating = false;
        this.createdSessionId = session.id;
        this.router.navigate(['/sessions']); // or navigate to session details
      },
      error: err => {
        this.creating = false;
        console.error('Error creating session:', err);
      }
    });
  }
}
