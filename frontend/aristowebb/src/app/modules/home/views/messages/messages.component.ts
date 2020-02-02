import { Component, Input, OnInit } from "@angular/core";
import { HttpService } from 'src/app/services';
import { Message } from 'src/app/models/Message';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'aw-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    @Input() isAdmin: boolean;

    messages: Message[];

    apiUrl = environment.apiUrl;

    adding = false;

    messageText: string;

    fileName: string;

    imgURL: string | ArrayBuffer;
    file: Blob;

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.getMessages();
    }

    getMessages() {
        this.httpService.getMessages()
            .subscribe(res => {
                this.messages = res
            });
    }

    addMessage() {
        this.adding = !this.adding;
        this.messageText = "";
        this.fileName = "";
        this.imgURL = "";
    }

    newMessage() {
        if (this.imgURL) {
            this.httpService.uploadImage(this.file)
                .subscribe(res => {
                    if (res) {
                        this.httpService.newMessage({
                            author: localStorage.getItem(environment.localStorageCatKey),
                            image: res,
                            message: this.messageText
                        }).subscribe(res => {
                            this.getMessages();
                            this.messageText = "";
                            this.fileName = "";
                            this.imgURL = "";
                            this.adding = false;
                        });
                    }
                });
        } else {
            this.httpService.newMessage({
                author: localStorage.getItem(environment.localStorageCatKey),
                message: this.messageText
            }).subscribe(res => {
                this.getMessages();
                this.messageText = "";
                this.fileName = "";
                this.imgURL = "";
                this.adding = false;
            });
        }
        
    }

    delete(id: number) {
        this.httpService.deleteMessage(id)
            .subscribe(res => this.getMessages());
    }

    onFileInput(event) {
        if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0]
            if (this.file.type.match(/image\/*/) == null) {
                this.fileName = "Bara bilder, tack."
                return;
            }
            if (this.file.size / 1000000000 > 1) {
                this.fileName = "Bilden är för stor. (<1GB)"
            }
            this.fileName = "";
            var reader = new FileReader();
            reader.readAsDataURL(this.file); 
            reader.onload = (_event) => { 
                this.imgURL = reader.result; 
            }
        }
    }
}