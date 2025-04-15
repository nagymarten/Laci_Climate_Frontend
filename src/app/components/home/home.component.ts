import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AvatarModule } from 'primeng/avatar';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    CommonModule,
    TranslateModule,
    SelectModule,
    FormsModule,
    AnimateOnScrollModule,
    AvatarModule,
    ScrollTopModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isDark = signal(false);
  languageOptions = [
    { label: 'English', value: 'en', icon: 'flag-icon flag-icon-gb' },
    { label: 'Magyar', value: 'hu', icon: 'flag-icon flag-icon-hu' },
  ];

  selectedLangValue = 'hu';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.selectedLangValue);
    this.translate.use(this.selectedLangValue);
  }

  toggleDark() {
    this.isDark.update((d) => !d);
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
    }
  }

  onLangChange(lang: string) {
    this.selectedLangValue = lang;
    this.translate.use(lang);
  }
}
