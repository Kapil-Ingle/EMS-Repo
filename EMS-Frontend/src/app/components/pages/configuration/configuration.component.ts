import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { AddConfigurationComponent } from '../add-configuration/add-configuration.component';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { API_ENDPOINTS } from '../../../shared/constant';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  constructor(
    private dialog: MatDialog,
    private AuthService: AuthService,
    private commonService: CommonService,
  ){}

  ngOnInit(){
    this.getAllDropdown();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddConfigurationComponent, {width: '600', disableClose: true, data: {}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllDropdown(){
    this.AuthService.getData(API_ENDPOINTS.serviceName_get_all_dropdowns).subscribe((resp: any) => {
      console.log(`${API_ENDPOINTS.serviceName_get_all_dropdowns} Response : `, resp);
    })
  }

}
