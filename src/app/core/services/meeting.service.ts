import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private signatureEndpoint = environment.signatureEndpoint;
  private envDetails = {
                          apiKey: environment.apiKey,
                          leaveUrl: environment.leaveUrl
                        };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error Occured: ', error.error);
    } else {
      console.log(`Backend returned: `, error);
    }
    return throwError ('Something Bad Just happened right now');
  }

  getSignature(payload: {meetingNumber: number, role: number}): Observable<any> {
    const url = `${this.signatureEndpoint}`;
    return this.http.post<any>(url, payload).pipe(
      map(response => {
        return {...response, ...this.envDetails};
      }),
      catchError(this.handleError)
    );
  }

}
