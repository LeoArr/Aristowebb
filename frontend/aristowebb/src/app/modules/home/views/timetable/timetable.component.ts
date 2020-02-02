import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { HttpService } from 'src/app/services';
import { Score } from 'src/app/models';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'aw-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.scss']
})
export class TimeTableComponent implements OnInit {

    @Input() isAdmin: boolean;

    timetable: string;

    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.getTimetable();
    }

    updateTimetable() {
        this.httpService.updateTimetable(this.timetable)
            .subscribe(res => {
                if (res)
                    this.getTimetable();
            });
    }

    getTimetable() {
        this.httpService.getTimetable()
            .subscribe(res => {
                this.timetable = res
            });
    }

}