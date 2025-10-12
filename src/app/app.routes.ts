import { Routes, CanActivateFn, Router } from "@angular/router";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const SUPPORTED = ["hu", "en"] as const;

export const langGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const t = inject(TranslateService);
  const doc = inject(DOCUMENT);
  const platformId = inject(PLATFORM_ID);

  const lang = (route.paramMap.get("lang") || "hu") as "hu" | "en";
  if (!SUPPORTED.includes(lang)) return router.createUrlTree(["/hu"]);

  doc.documentElement.lang = lang;
  t.use(lang);
  if (isPlatformBrowser(platformId)) localStorage.setItem("language", lang);
  return true;
};

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "hu" },

  { path: "hu", children: [{ path: "", component: HomeComponent }] },
  { path: "en", children: [{ path: "", component: HomeComponent }] },

  { path: "**", redirectTo: "hu" },
];
