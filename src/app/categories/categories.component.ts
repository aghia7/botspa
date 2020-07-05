import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Category } from '../_models/category';
import { Observable } from 'rxjs';
import { CategoryService } from '../_services/category.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { ok } from 'assert';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Observable<Category[]>;

  constructor(private categoryService: CategoryService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categories = this.categoryService.getCategories();
  }

  deleteCategory(id: number) {
    this.alertify.confirm(
      'Are you sure to delete this category?', () => {
        this.categoryService.deleteCategory(id)
      .subscribe(
        data => {
          this.alertify.success(data.message);
          this.reloadData();
        },
        error => this.alertify.error(error) );
      }
      );
  }

  categoryDetails(id: number){
    this.router.navigate(['category/details', id]);
  }

  updateCategory(id: number){
    this.router.navigate(['category/upsert', id]);
  }

  createCategory(){
    this.router.navigate(['category/upsert']);
  }

}
