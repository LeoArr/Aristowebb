import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from 'src/app/services';
import { Task, Cat } from 'src/app/models';

@Component({
    selector: 'aw-tasks-view',
    templateUrl: './tasks-view.component.html',
    styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {

    @Input()
    isAdmin: boolean;

    tasks: Task[];
    cats: Cat[];
    completor: string;

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.getTasks();
        this.httpService.getCats()
            .subscribe(cats => {
                this.cats = cats
            });
    }
    sendCompletor(taskId) {
        if (!this.completor || !taskId) return;
        this.httpService.addCompletion(taskId, +this.completor)
            .subscribe(result => {
                this.completor = "None"
                if (result)
                    this.getTasks()
            });
    }

    getTasks() {
        this.httpService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }
}