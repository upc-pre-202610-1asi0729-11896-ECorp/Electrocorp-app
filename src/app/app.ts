import { Component } from '@angular/core';
import { AppLayoutComponent } from './shared/presentation/components/app-layout/app-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
