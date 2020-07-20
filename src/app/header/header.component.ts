import { Component, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    @Output() featuresSelected = new EventEmitter<string>();
    onSelect(features: string){
        this.featuresSelected.emit(features);
    }
}