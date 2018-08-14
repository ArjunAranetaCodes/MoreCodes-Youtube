import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Task } from "./task";
import { HttpErrorHandler, HandleError } from "../http-error-handler.service";

@Injectable()
export class TasksService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("TasksService");
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>("api/tasks")
      .pipe(catchError(this.handleError("getTasks", [])));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>("api/task", task)
      .pipe(catchError(this.handleError("addTask", task)));
  }

  deleteTask(id: number): Observable<{}> {
    const url = `api/task/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError("deleteTask")));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(`api/task/${task._id}`, task)
      .pipe(catchError(this.handleError("updateTask", task)));
  }
}
