import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  currentExercise = new BehaviorSubject<Exercise>(null);
  private exercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  private prevExercises: Exercise[] = [];
  constructor() {}

  getExercises() {
    return [...this.exercises];
  }
  getPrevExercises() {
    return [...this.prevExercises];
  }
  setExercise(exerxiseId: string) {
    const exercise = this.exercises.find((ex) => ex.id === exerxiseId);
    this.currentExercise.next(exercise);
  }
  completeExercise() {
    this.prevExercises.push({
      ...this.currentExercise.value,
      state: 'completed',
      date: new Date(),
    });

    this.currentExercise.next(null);
  }
  cancleExercise(progress: number) {
    const { duration, calories } = this.currentExercise.value;
    this.prevExercises.push({
      ...this.currentExercise.value,
      state: 'cancelled',
      date: new Date(),
      duration: duration * (progress / 100),
      calories: calories * (progress / 100),
    });

    this.currentExercise.next(null);
  }
}
