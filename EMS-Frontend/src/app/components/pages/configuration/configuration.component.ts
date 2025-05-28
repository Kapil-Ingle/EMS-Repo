import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { AddConfigurationComponent } from '../add-configuration/add-configuration.component';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { API_ENDPOINTS } from '../../../shared/constant';
import { MatTableDataSource } from '@angular/material/table';
import { Dropdown } from '../../../shared/interfaces/dropdown';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
  
  displayedColumns: string[] = ['id', 'dropdownName', 'dropdownValues', 'description', 'createdAt'];
  // dataSource!: MatTableDataSource<Dropdown[]>;
  dataSource = new MatTableDataSource<Dropdown>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private AuthService: AuthService,
    private commonService: CommonService,
  ){
    
  }

  ngOnInit(){
    this.getAllDropdown();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddConfigurationComponent, {width: '600', disableClose: true, data: {}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllDropdown();
    });
  }

  getAllDropdown(){
    this.AuthService.getData(API_ENDPOINTS.serviceName_get_all_dropdowns).subscribe((resp: any) => {
      console.log(`${API_ENDPOINTS.serviceName_get_all_dropdowns} Response : `, resp);
      // this.dataSource = new MatTableDataSource(processedData);
       this.dataSource.data = resp?.data?.dropdowns || [];
       this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
