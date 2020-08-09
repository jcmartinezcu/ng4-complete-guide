import { Component, OnInit } from '@angular/core';
import { LogginService } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reduce';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, private logginService: LogginService){}

  ngOnInit(){
    this.store.dispatch( new AuthActions.AutoLogin());
    this.logginService.printLog('Hello from appComponent ngOnIni!');
  }

}
