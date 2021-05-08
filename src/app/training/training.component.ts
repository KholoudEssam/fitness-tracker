import { Component, OnInit } from '@angular/core';
import { Exercise } from '../shared/models/exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  isGoingTraining = false;
  selectedEx: Exercise;
  constructor() {}

  ngOnInit(): void {}

  getSelectedExe(ex: Exercise) {
    this.selectedEx = ex;
    this.isGoingTraining = true;
  }
}
