import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'aw-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
    isAdmin = false;

    ngOnInit() {
        let token = localStorage.getItem(environment.localStorageKey);
        if (token == environment.adminToken)
            this.isAdmin = true;
    }
}