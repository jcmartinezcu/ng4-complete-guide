import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropDownDirective } from './dropdown.diretive';
import { CommonModule } from '@angular/common';
import { LogginService } from '../logging.service';

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropDownDirective
    ],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropDownDirective,
        CommonModule
    ],
    providers: [LogginService]
})
export class SharedModule{

}