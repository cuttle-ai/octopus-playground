import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbCheckboxModule,
    NbButtonModule,
} from '@nebular/theme';

import { InterpreterComponent } from './interpreter/interpreter.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
/**
 * PAGES has the list of pages in the application
 */
const PAGES = [
    PagesComponent,
    InterpreterComponent,
]

/**
 * Pages are coporated through this module. It does lazy loading of the different pages.
 * made accessible through the app module
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NbLayoutModule,
        NbCardModule,
        NbInputModule,
        NbListModule,
        NbCheckboxModule,
        NbButtonModule,

        PagesRoutingModule,
    ],
    declarations: [
        ...PAGES,
    ]
})
export class PagesModule { }
