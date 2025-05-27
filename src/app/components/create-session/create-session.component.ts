import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PassphraseService} from '../../services/passphrase.service';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatIconModule, MatHint, MatCard,
            MatCardTitle,
            MatCardContent, MatFormField,
            MatFormField, MatInput, MatIcon, MatButton],
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
    this.sessionService.createSession(this.sessionName, this.passphrase).subscribe({
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
