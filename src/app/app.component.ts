import { Component } from '@angular/core';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diplom-nastya-gutorova';

  constructor(
    private localeService: BsLocaleService
  ) {
    this.localeService.use('ru');
  }

}
