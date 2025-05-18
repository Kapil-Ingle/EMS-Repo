import { Inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  pendingRequestsCount = 0;

  constructor(private spinnerService: NgxSpinnerService){}

  showLoader(){
    this.pendingRequestsCount++;
    this.spinnerService.show(undefined, {
      type: "ball-scale-ripple-multiple",
      bdColor: "rgba(0, 0, 0, 0.8)",
      size: "medium",
      color: "#fff"
    })
  }

  hideLoader(){
    this.pendingRequestsCount--;
    if(this.pendingRequestsCount <= 0){
      this.pendingRequestsCount = 0;
      this.spinnerService.hide();
    }
  }

}
