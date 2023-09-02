import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from 'src/app/shared/interfaces/todo.interface';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient, private todoService: TodoService) {}

  getTodos(): Observable<Todo[]>{
    const headers = {
      'Authorization': 'bearer test',
      'TestowyNaglowek': 'test'
    }

    // const params = new HttpParams().set('_limit', 1);

    return this.http.get<Todo[]>('http://localhost:3000/todo', {
      headers,
      // responseType:
      // params
    }).pipe(
      tap((todos) => this.todoService.todos = todos)
    );
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`http://localhost:3000/todo/${id}`);
  }

  postTodos(todo: Omit<Todo, "id">): Observable<Todo>{
    return this.http.post<Todo>('http://localhost:3000/todo', todo).pipe(
      tap((todo) => this.todoService.addTodo(todo))
    );
  }

  deleteTodo(id: number): Observable<{}>{
    return this.http.delete<{}>(`http://localhost:3000/todo/${id}`).pipe(
      tap(() => this.todoService.deleteTodo(id))
    )
  }

  patchTodo(id: number, todo: Omit<Todo, "id" | "name">): Observable<Todo> {
    return this.http.patch<Todo>(`http://localhost:3000/todo/${id}`, todo).pipe(
      tap((todo) => this.todoService.changeTodoStatus(todo.id, todo.isComplete))
    )
  }
}
