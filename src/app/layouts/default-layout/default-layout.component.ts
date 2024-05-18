import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { environment } from '../../../environments/environment';

type NavItem = {
  label: string;
  path: string;
};

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
  private router = inject(Router);

  title = environment.APP_NAME;
  isOpenMenu = false;
  navItems: NavItem[] = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'About',
      path: '/about',
    },
  ];

  toggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  handleSearchFormSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const query = formData.get('query')!;

    this.router.navigate(['/search'], { queryParams: { query } });
  }
}
