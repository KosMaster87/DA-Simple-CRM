import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialSharedModule } from './shared/material-module/material-shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MaterialSharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'simple-crm';
}
