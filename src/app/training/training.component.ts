import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../shared/services/exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  sub: Subscription;
  isGoingTraining = false;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.sub = this.exerciseService.currentExercise.subscribe((ex) => {
      if (ex) this.isGoingTraining = true;
      else this.isGoingTraining = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
