import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reduce';
import * as RecipesActions from '../recipes/store/recipe.actions';


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  urlFireBase =
    'https://ng-course-recipe-book-8a357.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.urlFireBase, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.urlFireBase)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes) )
        })  
      );
  }
}
