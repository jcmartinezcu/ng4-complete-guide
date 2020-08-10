import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LogginService } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reduce';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private logginService: LogginService,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    this.logginService.printLog('Hello from appComponent ngOnIni!');
  }
}
