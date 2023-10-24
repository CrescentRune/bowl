import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  template: `
    <div>app-root works</div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Bowl';
}
