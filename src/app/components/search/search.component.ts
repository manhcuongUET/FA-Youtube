import { Component, EventEmitter, Input, OnInit, ViewChild, ElementRef, Output, AfterViewInit, Inject } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { pluck, distinctUntilChanged, filter, map, debounce } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {
  // @Input() valueSearch: string = '';
  @Output() valueSearch = new EventEmitter<any>();

  @ViewChild('input') inputElement: ElementRef;

  timeToSearch: number = 600;
  apiKey: string = 'AIzaSyB-rZglyIQS5xbsIVMP0QLbckpyl8uFqVo';
  pageSize: number | undefined;
  constructor(public dialog: MatDialog,
    private youtubeService: YoutubeService) { }

  ngOnInit(): void {
    this.youtubeService.dataSource.subscribe(res => this.pageSize = res)
  }
  ngAfterViewInit(): void {
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        pluck('target', 'value'),
        debounce(() => timer(this.timeToSearch)),
        distinctUntilChanged(),
        filter((value: string) => value.length > 3),
        map((value) => value)
      )
      .subscribe(value => {
        this.valueSearch.emit({
          valInput: value,
        });
      });

  }
  getDataField(value: string) {
    this.valueSearch.emit({
      order: value,
      valInput: this.inputElement.nativeElement.value
    })
    // console.log(value)
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: {
        timeToSearch: this.timeToSearch,
        apiKey: this.apiKey,
        pageSize: this.pageSize
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!!res) {
        this.timeToSearch = res.timeToSearch;
        this.youtubeService.apiKey.next(res.apiKey);
        this.youtubeService.dataSource.next(res.pageSize);
      }
    })

  }

}

//Dialog

@Component({
  selector: 'app-setting-data-dialog',
  templateUrl: 'setting-data-dialog.html',
  styleUrls: ['./search.component.css']
})
export class DialogDataExampleDialog {
  valuePage: number;
  apiKey: string = '';
  timeToSearch: number | undefined;
  constructor(private dialogRef: MatDialogRef<SearchComponent>, @Inject(MAT_DIALOG_DATA) public data,
    private youtubeService: YoutubeService) {

    this.valuePage = data.pageSize;
    this.apiKey = data.apiKey;
    this.timeToSearch = data.timeToSearch;
  }
  close() {
    this.dialogRef.close();
  }
  ok() {
    this.dialogRef.close({
      timeToSearch: this.timeToSearch,
      apiKey: this.apiKey,
      pageSize: this.valuePage
    });
  }


}