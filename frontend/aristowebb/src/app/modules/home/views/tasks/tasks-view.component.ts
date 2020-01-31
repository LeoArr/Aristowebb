import { Component } from "@angular/core";

@Component({
    selector: 'aw-tasks-view',
    templateUrl: './tasks-view.component.html',
    styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent {
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
        },
        {
            title: 'Lokal talang',
            description: 'Sov inte på hotellet en natt',
            points: 10,
            moreThanOne: false,
            completors: [
                'MM',
            ]
        }
    ]
}