import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesAction from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    urlFireBase =
    'https://ng-course-recipe-book-8a357.firebaseio.com/recipes.json';
  @Effect()
  fetchRecipes = this.actions$.pipe(
      ofType(RecipesAction.FETCH_RECIPES),
      switchMap(() =>{
        return this.http
        .get<Recipe[]>(this.urlFireBase)
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map(recipes =>{
          return new RecipesAction.SetRecipes(recipes);
      })
      );

  constructor(private actions$: Actions, private  http: HttpClient) {}
}
