import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reduce';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolveService implements Resolve<Recipe[]>{

    constructor(private store: Store<fromApp.AppState>,
        private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES),
        take(1)
        );
        // const recipes = this.recipeService.getRecipes();

        // if(recipes.length === 0){
        //     return this.dataStorageService.fetchRecipes();
        // }else{
        //     return recipes;
        // }
    }
}