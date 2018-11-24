import { TasksService } from './tasks.service'
import { Task } from './task'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    providers: [TasksService]
})

export class TasksComponent implements OnInit {
    tasks: Task[]
    editTask: Task

    constructor(private taskService: TasksService, private http: HttpClient) { }

    ngOnInit () {
        this.getTasks()
    }

    getTasks (): void {
        this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
    }

    add (title: string): void {
        this.editTask = undefined
        title = title.trim()
        if (!title) {
            return
        }

        const newTask: Task = { title } as Task
        this.taskService.addTask(newTask).subscribe(() => this.getTasks())
    }

    delete (task: Task): void {
        this.tasks = this.tasks.filter(h => h !== task)
        this.taskService
            .deleteTask(task.id)
            .subscribe(() => console.log('Task Deleted'))
    }

    edit (task) {
        this.editTask = task
    }

    update () {
        if (this.editTask) {
            this.taskService.updateTask(this.editTask).subscribe(() => {
                this.getTasks()
            })
            this.editTask = undefined
        }
    }
}