import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PassphraseService} from '../../services/passphrase.service';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [CommonModule, FormsModule, MatHint, MatCard, MatCardTitle, MatCardContent, MatFormField,
            MatLabel, MatFormField, MatInput, MatIcon],
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent
{
  passphrase = '';

  infoMessage = '';

  sessionName = '';

  creating = false;

  createdSessionId: string | null = null;

  constructor(
    private passphraseService: PassphraseService,
    private sessionService: SessionService,
    private router: Router
  )
  {}

  generatePassphrase(): void
  {
    this.passphraseService.getRandomPassphrase().subscribe(p => this.passphrase = p);
  }

  createSession(): void
  {
    if (!this.passphrase.trim())
    {
      return;
    }

    this.creating = true;
    this.sessionService.createSession(this.passphrase).subscribe({
      next: session =>
      {
        this.creating = false;
        this.createdSessionId = session.id;
        this.router.navigate(['/sessions']); // or navigate to session details
      },
      error: err =>
      {
        this.creating = false;
        console.error('Error creating session:', err);
      }
    });
  }
}
