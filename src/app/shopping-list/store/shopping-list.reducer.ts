import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import { ADD_INGREDIENT } from './shopping-list.actions';


const initiaState = {
    ingredient: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
  ]
}


export function ShoppingListReducer(state= initiaState, action: Action){
    switch(action.type){
        case ADD_INGREDIENT :
            return {
                ...state,
                ingredient: [...state.ingredient, action]
            }
    }
}