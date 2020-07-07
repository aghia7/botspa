import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Category } from 'src/app/_models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css']
})
export class UpsertComponent implements OnInit {
  category: Category;
  categories: Observable<Category[]>;
  action: string;
  ready: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.ready = false;
    this.category = new Category();
    this.category.parentId = null;
    this.category.id = this.route.snapshot.params.id;
    this.action = 'Create';
    if (this.category.id) {
      this.load();
    }
    this.categories = this.categoryService.getCategories();
    this.ready = true;
  }

  load() {
    this.action = 'Update';
    this.categoryService.getCategory(this.category.id).subscribe(
      (category: Category) => {
        this.category = category;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category).subscribe(
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
    this.categoryService.createCategory(this.category).subscribe(
      (data) => {
        this.alertify.success(data.message);
        this.category = new Category();
        this.gotoList();
      },
      (error) => this.alertify.error(error.error)
    );
  }

  onSubmit() {
    if (this.category.id) {
      this.updateCategory();
    } else {
      this.save();
    }
  }

  gotoList() {
    this.category = new Category();
    this.router.navigate(['/categories']);
  }
}
