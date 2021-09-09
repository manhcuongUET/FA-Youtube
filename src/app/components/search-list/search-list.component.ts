import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { filter } from 'rxjs/operators';
import { DataYoutube } from 'src/app/shared/models/dataYT';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  valueData: DataYoutube[] = [];
  pagination = false;
  apiKey: string | undefined;
  page_size: number;
  page_number: number;
  value: any;

  constructor(private searchService: YoutubeService) { }

  ngOnInit(): void {
    this.searchService.currentData.subscribe(data => {
      this.page_size = data
    });
    this.searchService.apiKey.subscribe(res => this.apiKey = res);
    this.dataForm();
  }

  dataForm() {
    this.searchService.dataFrom.pipe(filter(res => !!res)).subscribe(res => {
      this.searchService.getSortField(this.value?.order, this.value?.valInput, res).subscribe((items: any) => {

        this.valueData = items.map(item => {
          return {
            title: item.snippet.title,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
          };
        });
        this.pagination = true;
      });
    })
  }

  getData(value: any) {
    this.value = value;
    if (!!value?.valInput) {
      this.searchService.getApiSearch(value?.valInput, this.apiKey).subscribe((items: any) => {

        this.valueData = items.map(item => {
          return {
            title: item.snippet.title,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
          };
        });
        this.pagination = true;
      });
    }

    if (!!value?.order) {

      this.searchService.getSortField(value?.order, value?.valInput).subscribe(
        (items: any) => {
          this.valueData = items.map(item => {
            return {
              title: item.snippet.title,
              publishedAt: new Date(item.snippet.publishedAt),
              thumbnail: item.snippet.thumbnails.high.url,
              videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
            };
          });
          this.pagination = true;
        }
      );
    }

  }
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1
  }
}
