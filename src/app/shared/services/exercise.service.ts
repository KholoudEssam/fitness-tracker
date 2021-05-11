import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  currentExercise = new BehaviorSubject<Exercise>(null);
  // private exercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  // ];
  // private prevExercises: Exercise[] = [];
  constructor(private store: AngularFirestore) {}

  getExercises() {
    return this.store
      .collection<Exercise>('Exercises')
      .valueChanges({ idField: 'id' });
  }
  getPrevExercises() {
    return this.store
      .collection<Exercise>('prevExercises')
      .valueChanges({ idField: 'id' });
  }

  setExercise(exerxiseId: string) {
    this.store
      .collection('Exercises')
      .doc<Exercise>(exerxiseId)
      .valueChanges({ idField: 'id' })
      .subscribe((ex) => {
        this.currentExercise.next(ex);
      });
  }

  completeExercise() {
    if (this.currentExercise.value != null) {
      this.store.collection('prevExercises').add({
        name: this.currentExercise.value.name,
        duration: this.currentExercise.value.duration,
        calories: this.currentExercise.value.calories,
        state: 'completed',
        date: new Date(),
      });

      this.currentExercise.next(null);
    }
  }

  cancleExercise(progress: number) {
    if (this.currentExercise.value != null) {
      const { duration, calories } = this.currentExercise.value;
      let newDoc = this.store.collection<Exercise>('prevExercises');

      newDoc.add({
        name: this.currentExercise.value.name,
        state: 'cancelled',
        date: new Date(),
        duration: duration * (progress / 100),
        calories: calories * (progress / 100),
      });

      this.currentExercise.next(null);
    }
  }
}
