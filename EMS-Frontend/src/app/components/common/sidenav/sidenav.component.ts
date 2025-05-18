import { Component, EventEmitter, Output, signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterOutlet } from '@angular/router';
import { Sidenav } from '../../../shared/interfaces/sidenav';
import { CommonService } from '../../../shared/services/common/common.service';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../shared/services/api/auth.service';
import { API_ENDPOINTS } from '../../../shared/constant';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SharedModule, RouterOutlet, NgClass,],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  @Output() navigateEvent = new EventEmitter<string>();
  menuItems = signal<Sidenav[] | undefined> (undefined);
  // Dummy Data
  // [
  //   {
  //     title: "Dashboard",
  //     icon: "dashboard",
  //     route: "/dashboard",
  //     sequence: 1,
  //     role: "admin"
  //   },
  //   {
  //     title: "Employee Management",
  //     icon: "group_add",
  //     route: "/employee-management",
  //     sequence: 2,
  //     role: "admin"
  //   },
  //   {
  //     title: "Leave Management",
  //     icon: "beach_access",
  //     route: "/leave-management",
  //     sequence: 3,
  //     role: "admin"
  //   },
  //   {
  //     title: "Sales",
  //     icon: "currency_exchange",
  //     route: "/sales",
  //     sequence: 4,
  //     role: "admin"
  //   },
  //   {
  //     title: "Payroll",
  //     icon: "payments",
  //     route: "/payroll",
  //     sequence: 5,
  //     role: "admin"
  //   },
  //   {
  //     title: "Reports",
  //     icon: "description",
  //     route: "/reports",
  //     sequence: 6,
  //     role: "admin"
  //   },

  // ]
  userData: any;

  constructor(
    public commonService: CommonService,
    public router: Router,
    private AuthService: AuthService,
  ){}



  ngOnInit(){
    this.getSideMenus();
  }

  getSideMenus(){
    const data: any = sessionStorage.getItem('userData');
    this.userData = JSON.parse(data);
    console.log("userData", this.userData);

    this.AuthService.authApiCall(API_ENDPOINTS.serviceName_sidemenu, {
      role: this.userData.role
    }).subscribe((resp: any) => {
      console.log(`${API_ENDPOINTS.serviceName_sidemenu} Response : `, resp);
      this.menuItems.set(resp.data.menus);
    })
    
  }

  navigateTo(url: string){
    this.navigateEvent.emit(url);
    console.log('navigate to:', url);
    
  }

}
