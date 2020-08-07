import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState{
    shoppingList: State;
}

const initiaState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}


export function ShoppingListReducer(state: State= initiaState, action: ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updateIngredients = [...state.ingredients];
            updateIngredients[action.payload.index] = updateIngredient;
            return{
                ...state,
                ingredients: updateIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex)=>{
                    return igIndex !== action.payload;
                })
            };
        default:
            return state;
    }
}