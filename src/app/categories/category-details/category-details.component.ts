import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  id: number;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.category = new Category();

    this.id = this.route.snapshot.params.id;

    this.categoryService.getCategory(this.id).subscribe(
      (data) => {
        this.category = data;
      },
      (error) => this.alertify.error(error)
    );
  }

  list() {
    this.router.navigate(['categories']);
  }
}
