import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InterpreterComponent } from './interpreter/interpreter.component';

/**
 * Routes has all the routes to the pages component.
 */
const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'interpter', component: InterpreterComponent },
            { path: '', redirectTo: 'interpter', pathMatch: 'full' },
        ]
    }
];

/**
 * This module implements the routing of the pages module.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
