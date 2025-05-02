import {
  Component,
  ElementRef,
  HostListener,
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
import { MessageService, TreeNode } from 'primeng/api';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import emailjs from '@emailjs/browser';
import { Toast } from 'primeng/toast';

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
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);

  @ViewChild('contactFormRef') contactForm!: ElementRef;

  isDark = signal(false);
  scrollOpacity = 1;
  isVisible = true;

  name = '';
  message = '';
  email = '';
  phone = '';
  languages = [
    { name: 'English', code: 'en' },
    { name: 'Magyar', code: 'hu' },
  ];

  selectedLanguage: any;
  data: TreeNode[] = [];

  ngOnInit(): void {
    this.initLanguage();

    const container = document.querySelector('.scrollable');
    if (container) {
      container.scrollTop = 0;
    }

    if (typeof window !== 'undefined') {
      const darkMode = localStorage.getItem('isDarkMode');
      if (darkMode === 'true') {
        this.isDark.set(true);
        document.querySelector('html')?.classList.add('my-app-dark');
      }
    }

    this.updateOrganizationChart();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY < 50) {
      this.scrollOpacity = 1;
    } else if (scrollY >= 50 && scrollY < 150) {
      this.scrollOpacity = 1 - (scrollY - 50) / 100;
    } else {
      this.scrollOpacity = 0;
    }

    this.isVisible = this.scrollOpacity > 0;
  }

  private initLanguage(): void {
    const savedLang = localStorage.getItem('language') || 'hu';
    this.selectedLanguage = this.languages.find(
      (lang) => lang.code === savedLang
    );
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
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

  onLanguageChange(event: any, selectRef: any) {
    const langCode = event.value.code;
    this.translate.use(langCode);
    localStorage.setItem('language', langCode);

    if (selectRef?.el?.nativeElement) {
      selectRef.el.nativeElement.blur();

      selectRef.el.nativeElement.classList.remove('p-focus');
    }
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

    const lang = this.selectedLanguage.code as 'hu' | 'en';

    const templateParams = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message,
      title: localizedTitles[lang],
      auto_reply_message: localizedReplies[lang],
    };

    // 1. Send to admin
    emailjs
      .send(
        'service_iv5svdv',
        'template_lgz5yv7',
        templateParams,
        'UiZnfR01s1uECBEHS'
      )
      .then(() => {
        // 2. Auto-reply to user
        emailjs
          .send(
            'service_iv5svdv',
            'template_msr2hhd',
            templateParams,
            'UiZnfR01s1uECBEHS'
          )
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: lang === 'hu' ? 'Sikeres küldés' : 'Message Sent',
              detail:
                lang === 'hu'
                  ? 'Üzenet elküldve!'
                  : 'Message sent!.',
              life: 4000,
            });
          })
          .catch((err) => {
            console.warn('Auto-reply failed:', err);
          });
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: lang === 'hu' ? 'Hiba' : 'Error',
          detail:
            (lang === 'hu'
              ? 'Hiba történt az üzenet küldésekor: '
              : 'Failed to send email: ') + JSON.stringify(error),
          life: 5000,
        });
      });
  }

  callPhone() {
    window.location.href = 'tel:+36201234567';
  }

  getFlagUrl(code: string): string {
    if (code === 'en') return 'https://flagcdn.com/gb.svg'; // UK flag for English
    if (code === 'hu') return 'https://flagcdn.com/hu.svg'; // Hungary
    if (code === 'de') return 'https://flagcdn.com/de.svg'; // Germany
    return 'https://flagcdn.com/unknown.svg'; // fallback
  }

  scrollToForm() {
    const offset = 100;

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
