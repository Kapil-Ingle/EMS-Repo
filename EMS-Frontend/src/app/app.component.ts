import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderService } from './shared/services/common/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EMS-Frontend';

  constructor(public loaderService: LoaderService){}
}
