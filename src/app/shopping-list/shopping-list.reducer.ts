import { Ingredient } from '../shared/ingredient.model';

const initiaState = {
    Ingredient: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
  ]
}


export function ShoppingListReducer(state= initiaState, action){

}