import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { User } from '../../interfaces/general';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public user!: User;
}
