import { Component, OnInit } from "@angular/core";
import { HttpService } from 'src/app/services';
import { Task } from 'src/app/models';

@Component({
    selector: 'aw-tasks-view',
    templateUrl: './tasks-view.component.html',
    styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {
    testTasks = [
        {
            title: 'Stolpskott nr 1',
            description: 'Klättra på en tamp och tappa mobilen',
            points: 20,
            moreThanOne: true,
            completors: [
                'Kupp Mupp',
                'Mugg Mupp'
            ]
        }
    ]

    tasks: Task[];

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.httpService.getTasks()
            .subscribe(tasks => {
                console.log(tasks.length);
                this.tasks = tasks;
            });
    }
}