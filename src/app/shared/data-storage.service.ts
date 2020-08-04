import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  urlFireBase = 'https://ng-course-recipe-book-8a357.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(this.urlFireBase + 'recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
