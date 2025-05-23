import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fireworks-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fireworks">
      🎆🎇🎆 Everyone voted the same! 🎇🎆🎇
    </div>
  `
})
export class FireworksAnimationComponent {}
