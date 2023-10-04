import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/general';
import { Timesheet } from '../interfaces/timesheet';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public user!: User;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public getTimesheets(
    id: string,
    params?: HttpParams
  ): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>('../data/timesheet.json');
  }

  public postTimesheet(id: string, payload?: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>('../data/timesheet.json', payload);
  }

  public putTimesheet(id: string, payload: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>('../data/timesheet.json', payload);
  }

  public deleteTimesheet(id: string) {
    return this.http.delete('../data/timesheet.json');
  }

  public getAIInsight(query: string): Observable<any> {
    return this.http.get<any>('../data/timesheet.json');
  }
}
