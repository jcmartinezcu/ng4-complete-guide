import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';


const initiaState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
  ]
}


export function ShoppingListReducer(state= initiaState, action: ShoppingListActions.AddIngredient){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        default:
            return state;
    }
}