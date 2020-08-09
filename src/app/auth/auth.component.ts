import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reduce';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    private storeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

    ngOnInit(){
       this.storeSub = this.store.select('auth').subscribe(authState =>{
            this.isLoading = authState.loading;
            this.error = authState.authError;   
                    
        });
    }
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){

        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;


        if(this.isLoginMode){
        //    authObs = this.authService.login(email,password);
        this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
        }else{
          this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
        } 

        form.reset();
    }

    onHandlerError(){
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy(){
        if(this.storeSub){
            this.storeSub.unsubscribe();
        }
    }

}