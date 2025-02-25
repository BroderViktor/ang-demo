import { Routes } from '@angular/router';
import { routePaths } from './appRouteTypes';
import { ChatWindow } from './components/chat/chat-window.component';
import { AddEmployeeComponent } from './components/employee/components/add-employee.component';
import { EditEmployeeComponent } from './components/employee/components/edit-employee.component';
import { EmployeesListComponent } from './components/employee/components/employees-list.component';
import { AcademyComponent } from './pages/academy/academy.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { OwnersComponent } from './pages/owners/owners.component';
import { TodosComponent } from './pages/todo/todo.component';

export const routes: Routes = [
  {
    path: routePaths.employeesList,
    pathMatch: 'full',
    component: EmployeesListComponent,
    title: 'Employees List',
  },
  {
    path: routePaths.addEmployee,
    component: AddEmployeeComponent,
    title: 'Add Employee',
  },
  {
    path: routePaths.editEmployee,
    component: EditEmployeeComponent,
    title: 'Edit Employee',
  },
  {
    path: routePaths.chat,
    component: ChatWindow,
    title: 'Chat',
  },
  {
    path: routePaths.academy,
    component: AcademyComponent,
    title: 'Academy',
  },
  {
    path: routePaths.meetings,
    component: MeetingsComponent,
    title: 'Meetings',
  },
  {
    path: routePaths.messages,
    component: MessagesComponent,
    title: 'Messages',
  },
  {
    path: routePaths.owners,
    component: OwnersComponent,
    title: 'Owners',
  },
  {
    path: routePaths.todo,
    component: TodosComponent,
  },
] as const;
