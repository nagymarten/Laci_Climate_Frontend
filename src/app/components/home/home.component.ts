import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AvatarModule } from 'primeng/avatar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeNode } from 'primeng/api';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import emailjs from '@emailjs/browser';

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
    OrganizationChartModule,
    MatIconModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private translate = inject(TranslateService);

  @ViewChild('contactFormRef') contactForm!: ElementRef;

  isDark = signal(false);
  name = '';
  message = '';
  email = '';
  phone = '';
  languageOptions = [
    { label: 'English', value: 'en', icon: 'flag-icon flag-icon-gb' },
    { label: 'Magyar', value: 'hu', icon: 'flag-icon flag-icon-hu' },
  ];

  selectedLangValue = 'hu';
  data: TreeNode[] = [];

  ngOnInit(): void {
    const storedLang = localStorage.getItem('selectedLang');
    if (storedLang && ['hu', 'en'].includes(storedLang)) {
      this.selectedLangValue = storedLang;
    }

    this.translate.setDefaultLang(this.selectedLangValue);
    this.translate.use(this.selectedLangValue);

    if (typeof window !== 'undefined') {
      const darkMode = localStorage.getItem('isDarkMode');
      if (darkMode === 'true') {
        this.isDark.set(true);
        document.querySelector('html')?.classList.add('my-app-dark');
      }
    }

    this.updateOrganizationChart();
  }

  private updateOrganizationChart(): void {
    this.translate
      .get([
        'ORGANIZATION.TITLE',
        'ORGANIZATION.SPLIT',
        'ORGANIZATION.PARAPET',
        'ORGANIZATION.CASSETTE',
      ])
      .subscribe((translations) => {
        this.data = [
          {
            label: translations['ORGANIZATION.TITLE'],
            expanded: true,
            children: [
              {
                label: translations['ORGANIZATION.SPLIT'],
                expanded: true,
              },
              {
                label: translations['ORGANIZATION.PARAPET'],
                expanded: true,
              },
              {
                label: translations['ORGANIZATION.CASSETTE'],
                expanded: true,
              },
            ],
          },
        ];
      });
  }

  toggleDark() {
    const newValue = !this.isDark();
    this.isDark.set(newValue);
    localStorage.setItem('isDarkMode', String(newValue));

    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark', newValue);
    }
  }

  onLangChange(lang: string) {
    this.selectedLangValue = lang;
    localStorage.setItem('selectedLang', lang);
    this.translate.use(lang);
    this.updateOrganizationChart();
  }

  sendMessage() {
    const localizedTitles = {
      en: 'Your request has been received',
      hu: 'Megkaptuk az üzenetét',
    };

    const localizedReplies = {
      hu: `Kedves ${this.name}!\n\nKöszönjük, hogy felvette velünk a kapcsolatot! Megkaptuk az alábbi kérését: „${localizedTitles['hu']}”. Igyekszünk azt 3 munkanapon belül feldolgozni.\n\nÜdvözlettel:\nMitrik László`,
      en: `Hi ${this.name},\n\nThank you for reaching out! We have received your request: "${localizedTitles['en']}" and will process it within 3 business days.\n\nBest regards,\nMitrik László`,
    };

    const templateParams = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message,
      title: localizedTitles[this.selectedLangValue as 'hu' | 'en'],
      auto_reply_message:
        localizedReplies[this.selectedLangValue as 'hu' | 'en'],
    };

    // 1. Send to you (admin)
    emailjs
      .send(
        'service_iv5svdv',
        'template_lgz5yv7',
        templateParams,
        'UiZnfR01s1uECBEHS'
      )
      .then(() => {
        // 2. Send auto-reply to user
        emailjs
          .send(
            'service_iv5svdv',
            'template_msr2hhd',
            templateParams,
            'UiZnfR01s1uECBEHS'
          )
          .then(() => {
            alert(
              this.selectedLangValue === 'hu'
                ? 'Üzenet elküldve! Válaszüzenetet is küldtünk.'
                : 'Message sent! Auto-reply was sent to the user.'
            );
          })
          .catch((err) => {
            console.warn('Auto-reply failed:', err);
          });
      })
      .catch((error) => {
        alert(
          (this.selectedLangValue === 'hu'
            ? 'Hiba történt: '
            : 'Failed to send email: ') + JSON.stringify(error)
        );
      });
  }

  callPhone() {
    window.location.href = 'tel:+36201234567';
  }

  scrollToForm() {
    const offset = 100; // Adjust if you have a sticky header

    const top =
      this.contactForm.nativeElement.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
}
