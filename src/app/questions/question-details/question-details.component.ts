import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/_models/question';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  id: number;
  question: Question;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.question = new Question();

    this.id = this.route.snapshot.params.id;

    this.questionService.getQuestion(this.id).subscribe(
      (data) => {
        this.question = data;
      },
      (error) => this.alertify.error(error)
    );
  }

  list() {
    this.router.navigate(['questions']);
  }

}
