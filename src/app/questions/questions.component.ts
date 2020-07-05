import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../_models/question';
import { Observable } from 'rxjs';
import { QuestionService } from '../_services/question.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Observable<Question[]>;

  constructor(private questionService: QuestionService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.questions = this.questionService.getQuestions();
  }

  deleteQuestion(id: number) {
    this.alertify.confirm(
      'Are you sure to delete this question?', () => {
        this.questionService.deleteQuestion(id)
      .subscribe(
        data => {
          console.log(data);
          this.alertify.success(data.message);
          this.reloadData();
        },
        error => this.alertify.error(error) );
      }
      );
  }

  questionDetails(id: number){
    this.router.navigate(['question/details', id]);
  }

  updateQuestion(id: number){
    this.router.navigate(['question/upsert', id]);
  }

  createQuestion(){
    this.router.navigate(['question/upsert']);
  }

}
