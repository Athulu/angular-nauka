import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoApiService } from '../core/services/todo-api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})


export class TodoListComponent implements OnInit, OnDestroy{
  todos: Todo[] = this.todoService.todos;
  errorMessage = '';
  sub!: Subscription;

  constructor(private todoService: TodoService, private todoApiServise: TodoApiService) {}
  
  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: arrTodos => this.todos = arrTodos
    });


    if (this.todos.length === 0){
      this.todoApiServise.getTodos().subscribe({
        error: err => {
          this.errorMessage = 'Wystąpił błąd spróbuj ponownie!';
        }
      })
    }
  }
  
  addTodo(todo: string): void {
    this.todoApiServise.postTodos({name: todo, isComplete: false}).subscribe({
      error: err => {
        this.errorMessage = 'Wystąpił błąd spróbuj ponownie!';
      }
    })
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  deleteTodo(id: number){
    // this.todoService.deleteTodo(i);
    this.todoApiServise.deleteTodo(id).subscribe({
      error: err => {
        this.errorMessage = "Wystąpił błąd. Spróbuj ponownie."
      }
    })
  }

  changeTodoStatus(id: number, todo: Todo){
    this.todoApiServise.patchTodo(id, {isComplete: !todo.isComplete}).subscribe(
      {
        error: err => {
          this.errorMessage = "Wystąpił błąd. Spróbuj ponownie."
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
