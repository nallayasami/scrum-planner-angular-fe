import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, MatCard, MatCardHeader, MatCardContent,
            MatFormField, MatCardActions, MatLabel, MatCardSubtitle, MatCardTitle, MatInput,
            MatButton],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = '';
  showPrompt = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const existingName = this.userService.getUsername();
    if (!existingName) {
      this.showPrompt = true;
    } else {
      this.username = existingName;
    }
  }

  saveUsername(): void {
    if (this.username.trim()) {
      this.userService.setUsername(this.username);
      this.showPrompt = false;
    }
  }
}
