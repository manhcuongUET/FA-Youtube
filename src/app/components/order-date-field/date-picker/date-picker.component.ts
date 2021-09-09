import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit{
  form: FormGroup;
  constructor(private youtubeService: YoutubeService, private readonly fb: FormBuilder) { 
    this.form = this.fb.group({
      from: this.fb.control('', Validators.required),
      to: this.fb.control('', Validators.required)
    });

  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(res => {
      
      if(this.form.valid)
        this.youtubeService.dataFrom.next({
          publishedAfter: (new Date(this.form.value.from)).toISOString(),
          publishedBefore: (new Date(this.form.value.to)).toISOString(),
        });
    });
  }
  setValueDate(){
   
  }

}
