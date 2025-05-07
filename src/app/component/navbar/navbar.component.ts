import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
interface menu{
  path: string;
  label: string;
  icon: string
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menus: menu[] = [
    {
      path: '',
      label: 'หน้าแรก',
      icon: 'home'
    },
    {
      path: 'view',
      label: 'รายชื่อนักศึกษา',
      icon: 'list'
    },
    {
      path: 'create',
      label: 'เพิ่มข้อมูลนักศึกษา',
      icon: 'add'
    }
  ]

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
