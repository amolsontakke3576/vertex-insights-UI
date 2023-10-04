import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/interfaces/general';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private router: Router = inject(Router);
  public authService: SocialAuthService = inject(SocialAuthService);
  public messageService: MessageService = inject(MessageService);
  public EMAIL_DOMAIN: string = 'proximabiz.com';
  public socialUser!: User;

  ngOnInit(): void {
    this.authService.authState.subscribe((user: User) => {
      if (user) {
        if (user.email.indexOf(this.EMAIL_DOMAIN) >= 0) {
          this.socialUser = user;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Please login with your email address xxx@${this.EMAIL_DOMAIN} `,
          });
          this.router.navigate(['login']);
        }
      }
    });
  }

  public get hasMagicToolPermission(): boolean {
    return true;
  }

  public get hasManageTimesheetPermission(): boolean {
    return true;
  }
}
