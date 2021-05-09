import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit {
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    console.log(this.exerciseService.getPrevExercises());
  }
}
