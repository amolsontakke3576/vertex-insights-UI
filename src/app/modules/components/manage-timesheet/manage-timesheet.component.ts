import { Component, OnInit, inject } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddTimesheetComponent } from '../add-timesheet/add-timesheet.component';
import { AppService } from 'src/app/shared/services/app.service';
import { Timesheet } from 'src/app/shared/interfaces/timesheet';
import { Observable } from 'rxjs';
import data from '../../../shared/data/timesheet.json';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-manage-timesheet',
  templateUrl: './manage-timesheet.component.html',
  styleUrls: ['./manage-timesheet.component.scss'],
})
export class ManageTimesheetComponent implements OnInit {
  public timesheets$!: Observable<Timesheet[]>;
  public timesheets: Timesheet[] = data;
  public loading: boolean = false;

  private appService: AppService = inject(AppService);
  private dialogService: DialogService = inject(DialogService);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);

  constructor() {}

  ngOnInit(): void {
    this.timesheets$ = this.appService.getTimesheets('');
  }

  public onAddTimesheet(): void {
    this.dialogService.open(AddTimesheetComponent, {
      header: 'Add Timesheet',
      resizable: true,
      dismissableMask: true,
      styleClass: 'timesheet-dialog',
    });
  }

  public onEdit(record: Timesheet): void {
    this.dialogService.open(AddTimesheetComponent, {
      header: 'Edit Timesheet',
      resizable: true,
      data: {
        timesheet: record,
      },
      dismissableMask: true,
      styleClass: 'timesheet-dialog',
    });
  }

  public onDelete(record: Timesheet): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this timesheet record?',
      header: 'Delete Confirmation',
      accept: () => {
        this.appService.deleteTimesheet('').subscribe({
          next: (v) => {
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Timesheet record deleted successfully',
            });
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
      },
    });
  }
}
