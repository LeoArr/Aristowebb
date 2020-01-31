import { Component } from "@angular/core";

@Component({
    selector: 'aw-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    
    private login(event: Event) {
        console.log("hej")
        event.preventDefault();
    }
}