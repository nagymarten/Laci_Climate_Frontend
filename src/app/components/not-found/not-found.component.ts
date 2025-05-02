import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  private router = inject(Router);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    const storedLang = localStorage.getItem('selectedLang') || 'hu';
    this.translate.setDefaultLang(storedLang);
    this.translate.use(storedLang);

    const darkMode = localStorage.getItem('isDarkMode');
    if (darkMode === 'true') {
      document.querySelector('html')?.classList.add('my-app-dark');
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
