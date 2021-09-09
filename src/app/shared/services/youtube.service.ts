import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  //number per page
  dataSource = new BehaviorSubject<number>(5);
  currentData = this.dataSource.asObservable();
  changeData(value: number) {
    this.dataSource.next(value)
  }

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  public API_TOKEN: string = 'AIzaSyAdTHKd53hQolvwFSHCKCqOxnONmLQub6w';
  // AIzaSyB-rZglyIQS5xbsIVMP0QLbckpyl8uFqVo
  //AIzaSyAdTHKd53hQolvwFSHCKCqOxnONmLQub6w
  // 'AIzaSyBJDCWEPzjR8VL-BlJW4q8HsOv9cct37Pw'

  apiKey = new BehaviorSubject<string>(this.API_TOKEN);
  dataFrom = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }


  getApiSearch(value: string, apiKey: string) {
    const urlSearch = `${this.API_URL}?q=${value}&key=${apiKey}&part=snippet&type=video&maxResults=50`
    return this.http.get(urlSearch).pipe(map((data: any) => {
      console.log('API: ', this.API_TOKEN)
      return data.items
    }
      // console.log(data.items)
    ))
  }

  getSortField(order: string, inputSearch: string, options?: any) {
    // const urlSort = `${this.API_URL}?q=${inputSearch}&order=${order}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=50`;
    let urlSort = options ? `${this.API_URL}?q=${inputSearch}&order=${order}&publishedAfter=${options?.publishedAfter}&publishedBefore=${options?.publishedBefore}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=50`
      : `${this.API_URL}?q=${inputSearch}&order=${order}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=50`;
      
    // console.log(urlSort)
    return this.http.get(urlSort).pipe(map((data: any) => {
      return data.items
    }));
  }

}
