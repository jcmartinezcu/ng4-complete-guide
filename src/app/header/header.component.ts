import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reduce';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dataStoreService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>){}

    ngOnInit(){
       this.userSub = this.store.select('auth').pipe(map(authState =>{
           return authState.user;
       })).subscribe(user=>{
           this.isAuthenticated = !!user;
           console.log(!user);
           console.log(!!user);
       });
    }

    onSaveData(){
        this.dataStoreService.storeRecipe();
    }

    onFetchData(){
        this.dataStoreService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}