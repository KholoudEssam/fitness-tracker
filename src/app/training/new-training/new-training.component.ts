import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() startTrainingVal = new EventEmitter<Exercise>();
  exercises: Exercise[] = [];
  exercise: Exercise;
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exercises = this.exerciseService.getExercises();
  }

  startTraining() {
    this.startTrainingVal.emit(this.exercise);
  }

  getSelectedExercise(data: MatSelectChange) {
    this.exercise = this.exercises.find((ex) => ex.id === data.value);
  }
}
