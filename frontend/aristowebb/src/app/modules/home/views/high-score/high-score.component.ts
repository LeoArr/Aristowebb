import { Component, OnInit } from "@angular/core";
import { HttpService } from 'src/app/services';
import { Score } from 'src/app/models';

@Component({
    selector: 'aw-high-score',
    templateUrl: './high-score.component.html',
    styleUrls: ['./high-score.component.scss']
})
export class HighScoreComponent implements OnInit {
    scores: Score[];
    
    constructor(private httpService: HttpService) { }
    
    ngOnInit() {
        this.getScores();
    }

    getScores() {
        this.httpService.getScores()
            .subscribe(res => {
                this.scores = res
            });
    }

}