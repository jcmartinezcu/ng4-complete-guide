import { Recipe } from './recipe.model';

export class RecipeService{
  private recipes: Recipe[] = [
        new Recipe('A test Recipe', 'This is a Simple Test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'),
        new Recipe('A test Recipe2', 'This is a Simple Test2', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg')
      ];

      getRecipes(){
          return this.recipes.slice();
      }
}