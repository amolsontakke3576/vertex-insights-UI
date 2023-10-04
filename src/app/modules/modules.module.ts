import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { TabViewModule } from 'primeng/tabview';
import { ManageTimesheetComponent } from './components/manage-timesheet/manage-timesheet.component';
import { ManageAiComponent } from './components/manage-ai/manage-ai.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { AddTimesheetComponent } from './components/add-timesheet/add-timesheet.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AiResponseParserComponent } from './components/ai-response-parser/ai-response-parser.component';
import {  HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageTimesheetComponent,
    ManageAiComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    CardModule,
    TableModule,
    HeaderComponent,
    SidebarComponent,
    ButtonModule,
    AddTimesheetComponent,
    ButtonModule,
    SkeletonModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    AiResponseParserComponent,
    ConfirmDialogModule,
    DatePipe
  ],
  providers: [DialogService, MessageService,ConfirmationService],
})
export class ModulesModule {}
