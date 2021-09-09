import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Output() dataOrder = new EventEmitter<string>();

  selected = ['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount']
  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
  }

  getDataOrder(item: any){
    this.dataOrder.emit(item)
  }
}
