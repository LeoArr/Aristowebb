import { Component, OnInit } from "@angular/core";
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
    selector: 'aw-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    
    password = "";

    incorrect = false;

    constructor(private httpService: HttpService,
                private router: Router) {}

    ngOnInit() {
        this.httpService.isAuthenticated()
            .subscribe(res => {
                res ? this.router.navigate(['home']) : this.router.navigate(['']);
            })
    }

    login(event: Event) {
        event.preventDefault();
        if (!this.password) return;
        this.httpService
            .authenticate(this.password)
            .subscribe(res => {
                this.storeToken(res)
                if (res.length > 0)
                    this.router.navigate(['home'])
                else
                    this.incorrect = true;
            });
        this.password = "";
    }

    storeToken(token: string) {
        localStorage.setItem(environment.localStorageKey, token);
    }
}