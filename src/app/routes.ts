import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInAuthGuard } from './_guards/logged-in-auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsComponent } from './questions/questions.component';
import { UpsertComponent } from './categories/upsert/upsert.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { UpsertQuestionComponent } from './questions/upsert/upsert.component';
import { QuestionDetailsComponent } from './questions/question-details/question-details.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'category/upsert', component: UpsertComponent },
      { path: 'category/upsert/:id', component: UpsertComponent },
      { path: 'category/details/:id', component: CategoryDetailsComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'question/upsert', component: UpsertQuestionComponent },
      { path: 'question/upsert/:id', component: UpsertQuestionComponent },
      { path: 'question/details/:id', component: QuestionDetailsComponent },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
