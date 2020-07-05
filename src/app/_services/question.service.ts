import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../_models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = environment.apiUrl +  'questions';
  constructor(private http: HttpClient) { }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/full/${id}`);
  }

  createQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/add`, question);
  }

  updateQuestion(question: Question): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/update/`, question);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/delete/${id}`);
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/`);
  }
}
