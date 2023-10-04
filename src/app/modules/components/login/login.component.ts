import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private router: Router = inject(Router);
  public authService: SocialAuthService = inject(SocialAuthService);
  public appService: AppService = inject(AppService);
  public messageService: MessageService = inject(MessageService);
  public EMAIL_DOMAIN: string = 'proximabiz.com';

  public constructor() {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      if (user) {
        if (user.email.indexOf(this.EMAIL_DOMAIN) >= 0) {
          this.appService.user = user;
          this.router.navigate(['dashboard']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Please login with your email address xxx@${this.EMAIL_DOMAIN} `,
          });
        }
      }
    });
  }

  public onLogin(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data);
    });
  }
}
