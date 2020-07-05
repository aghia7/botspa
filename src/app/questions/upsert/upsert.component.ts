import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/_models/question';
import { Category } from 'src/app/_models/category';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-question-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class UpsertQuestionComponent implements OnInit {
  question: Question;
  categories: Observable<Category[]>;
  action: string;
  ready: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.ready = false;
    this.question = new Question();

    this.question.id = this.route.snapshot.params.id;
    this.action = 'Create';
    if (this.question.id) {
      this.load();
    }
    this.categories = this.categoryService.getCategories();
    this.ready = true;
  }

  load() {
    this.action = 'Update';
    this.questionService.getQuestion(this.question.id).subscribe(
      (question: Question) => {
        this.question = question;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  updateQuestion() {
    this.questionService.updateQuestion(this.question).subscribe(
      (data) => {
        console.log(data);
        this.alertify.success(data.message);
      },
      (error) => {
        console.log(error);
        this.alertify.error(error.error);
      }
    );
  }

  save() {
    this.questionService.createQuestion(this.question).subscribe(
      (data) => {
        this.alertify.success(data.message);
        this.question = new Question();
        this.gotoList();
      },
      (error) => this.alertify.error(error.error)
    );
  }

  onSubmit() {
    if (this.question.id) {
      this.updateQuestion();
    } else {
      this.save();
    }
  }

  gotoList() {
    this.question = new Question();
    this.router.navigate(['/questions']);
  }

}
