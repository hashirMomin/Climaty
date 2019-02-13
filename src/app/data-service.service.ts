import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  url = 'https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/';
  constructor(private http: HttpClient ) {  }

  getWheather(metric: any, loc: any): Observable<IClimaty[]> {

    return this.http.get<IClimaty[]>(this.url + metric + '-' + loc + '.json');
  }

}

export interface IClimaty {
  value: number;
  year: number;
  month: string;
}

