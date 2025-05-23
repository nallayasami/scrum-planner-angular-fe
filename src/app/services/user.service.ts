import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private key = 'scrum-username';

  getUsername(): string | null {
    return localStorage.getItem(this.key);
  }

  setUsername(name: string): void {
    localStorage.setItem(this.key, name);
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
