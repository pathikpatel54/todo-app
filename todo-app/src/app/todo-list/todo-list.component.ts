import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  _id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  displayedColumns: string[] = ['title', 'description', 'actions'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.http.get<Todo[]>('http://localhost:3000/api/tasks').subscribe(
      (data) => {
        this.todos = data;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  deleteTodo(id: string) {
    this.http.delete(`http://localhost:3000/api/tasks/${id}`).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo._id !== id);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }
}