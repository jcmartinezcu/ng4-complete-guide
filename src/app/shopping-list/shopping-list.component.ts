import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { LogginService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromSopiingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:  Observable<{ingredients: Ingredient[]}>;
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService, 
              private logginService: LogginService, 
              private store: Store<fromSopiingList.AppState>
              ) {}

  ngOnInit(): void {
   this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();
    // this.igChangeSub = this.slService.ingredientsChanged
    // .subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.logginService.printLog('Hello fron shoppingListComponent ngOnInit');
  }

  onEditItem(index:  number){
    this.slService.startedEdit.next(index);
  }

  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
    
  }

}
