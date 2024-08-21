import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Todo {
  _id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  newTodoTitle = '';
  newTodoDescription = '';

  constructor(private http: HttpClient, private router: Router) {}

  addTodo() {
    if (this.newTodoTitle && this.newTodoDescription) {
      this.http.post<Todo>('http://localhost:3000/api/tasks', {
        title: this.newTodoTitle,
        description: this.newTodoDescription
      }).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding todo:', error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
