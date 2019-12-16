import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

/**
* PagesComponent bootstraps the pages in the application.
* The session check is done at this level.
*/
@Component({
    selector: 'octopus-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

}