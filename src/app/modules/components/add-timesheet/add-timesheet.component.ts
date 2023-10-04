import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

import {
  PROJECTS_OPTIONS,
  TASK_TYPE_OPTIONS,
} from 'src/app/shared/constants/general';
import { Timesheet } from 'src/app/shared/interfaces/timesheet';
import { AppService } from 'src/app/shared/services/app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-timesheet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    DividerModule,
    CheckboxModule,
  ],
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.scss'],
})
export class AddTimesheetComponent {
  public form: FormGroup;
  public projectOptions = PROJECTS_OPTIONS;
  public taskTypeOptions = TASK_TYPE_OPTIONS;
  public onLeave: boolean = false;
  public dialogConfig: DynamicDialogConfig<{
    timesheet: Timesheet;
  }> = inject(DynamicDialogConfig);
  public defaultDate: Date = new Date();
  public loading: boolean = false;

  private fb: FormBuilder = inject(FormBuilder);
  private appService: AppService = inject(AppService);
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private messageService: MessageService = inject(MessageService);

  public constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      project: ['', [Validators.required]],
      date: [this.defaultDate, [Validators.required]],
      taskType: ['', [Validators.required]],
      taskId: [''],
      effort: ['', Validators.required],
      description: [''],
    });

    if (this.dialogConfig.data?.timesheet) {
      this.form.patchValue({
        title: this.dialogConfig.data?.timesheet.title,
        project: this.projectOptions.find(
          (project) =>
            project.value === this.dialogConfig.data?.timesheet.project
        ),
        date: new Date(this.dialogConfig.data?.timesheet.date),
        taskType: this.taskTypeOptions.find(
          (task) => task.value === this.dialogConfig.data?.timesheet.taskType
        ),
        taskId: this.dialogConfig.data?.timesheet.taskId,
        effort: this.dialogConfig.data?.timesheet.effort,
        description: this.dialogConfig.data?.timesheet.description,
      });

      if (this.dialogConfig.data?.timesheet.taskType === 'Leave') {
        this.form.reset();
        this.form.disable();
        this.form.controls['date'].enable();
        this.form.controls['date'].setValue(
          new Date(this.dialogConfig.data?.timesheet.date)
        );
        this.onLeave = true;
      }
    }
  }

  public get hasDisabled(): boolean {
    return !(this.form.valid || this.onLeave);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    this.loading = true;
    let data = this.form.value;
    if (this.onLeave) {
      data.title = '';
      data.taskType = 'Leave';
      data.project = 'Other';
      data.effort = 8;
      data.description = '';
    }
    if (this.dialogConfig.data?.timesheet) {
      this.addTimesheet(data);
    } else {
      this.editTimesheet(data);
    }
  }

  public onChangeLeave(event: CheckboxChangeEvent): void {
    this.onLeave = event.checked;
    if (event.checked) {
      this.form.disable();
      this.form.controls['date'].enable();
    } else {
      this.form.enable();
    }
  }

  private addTimesheet(payload: Timesheet): void {
    this.appService.postTimesheet('', payload).subscribe({
      next: (v) => {
        this.loading = false;
        this.dialogRef.close();
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: `Error ${error?.status || ''}`,
          detail: error?.message,
        });
      },
      complete: () => console.info('complete'),
    });
  }

  private editTimesheet(payload: Timesheet): void {
    this.appService.putTimesheet('', payload).subscribe({
      next: (v) => {
        this.loading = false;
        this.dialogRef.close();
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: `Error ${error?.status || ''}`,
          detail: error?.message,
        });
      },
      complete: () => console.info('complete'),
    });
  }
}
