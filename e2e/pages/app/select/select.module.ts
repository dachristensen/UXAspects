import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SelectModule, NumberPickerModule, CheckboxModule, RadioButtonModule } from '../../../../dist';
import { SelectTestPageComponent } from './standard/select.testpage.component';
import { SelectFormsTestPageComponent } from './forms/select-forms.testpage.component';

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CheckboxModule,
        CommonModule,
        RadioButtonModule,
        SelectModule,
        NumberPickerModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: SelectTestPageComponent
            },
            {
                path: 'forms',
                component: SelectFormsTestPageComponent
            }
        ])
    ],
    declarations: [
        SelectTestPageComponent, 
        SelectFormsTestPageComponent
    ]
})
export class SelectTestPageModule { }
