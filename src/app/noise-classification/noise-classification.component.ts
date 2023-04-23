import { Component, OnInit } from '@angular/core';
import { AppState, selectClassificationValue } from '../store/app.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-noise-classification',
  templateUrl: './noise-classification.component.html',
  styleUrls: ['./noise-classification.component.scss']
})
export class NoiseClassificationComponent implements OnInit {
  public classificationValue: string = "N/A";

  constructor(private store: Store<AppState>){

  }

  ngOnInit(){
    this.store.pipe(select(selectClassificationValue)).subscribe((value) => {
      this.classificationValue = value;
    });

  }
}
