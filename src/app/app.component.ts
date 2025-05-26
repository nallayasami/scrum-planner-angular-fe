import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
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
