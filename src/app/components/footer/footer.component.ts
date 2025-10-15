import { Component } from "@angular/core";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-footer",
  imports: [CardModule, ButtonModule, TranslateModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
