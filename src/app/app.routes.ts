import { Routes, CanActivateFn } from "@angular/router";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

function setLangGuard(lang: "hu" | "en"): CanActivateFn {
  return () => {
    const t = inject(TranslateService);
    const doc = inject(DOCUMENT);
    const pid = inject(PLATFORM_ID);
    doc.documentElement.lang = lang;
    t.setDefaultLang(lang);
    t.use(lang);
    if (isPlatformBrowser(pid)) localStorage.setItem("language", lang);
    return true;
  };
}

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "hu" },

  {
    path: "hu",
    canActivate: [setLangGuard("hu")],
    children: [
      { path: "", component: HomeComponent },
      { path: "notfound", component: NotFoundComponent },
      { path: "**", redirectTo: "notfound" },
    ],
  },

  {
    path: "en",
    canActivate: [setLangGuard("en")],
    children: [
      { path: "", component: HomeComponent },
      { path: "notfound", component: NotFoundComponent },
      { path: "**", redirectTo: "notfound" },
    ],
  },

  { path: "**", component: NotFoundComponent },
];
