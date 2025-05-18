import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { SidenavComponent } from '../common/sidenav/sidenav.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SharedModule, RouterOutlet, HeaderComponent, SidenavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(
    private router: Router
  ){}

  navigateToUrl(event: any){
    console.log(event);
    this.router.navigateByUrl(event);
  }

}
