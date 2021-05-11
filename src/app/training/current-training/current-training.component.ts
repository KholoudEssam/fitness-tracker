import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: any;
  sub: Subscription;
  chosenExercise: Exercise;
  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.sub = this.exerciseService.currentExercise.subscribe((ex) => {
      if (!ex) return;
      this.chosenExercise = ex;
      this.startOrResumeCounting();
    });
  }

  startOrResumeCounting() {
    const step = (this.chosenExercise.duration / 100) * 1000;
    this.timer = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(this.timer);
        return this.exerciseService.completeExercise();
      }
      this.progress += 1;
    }, step);
  }

  stopExrecise() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.progress,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.exerciseService.cancleExercise(this.progress);
      } else {
        this.startOrResumeCounting();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearInterval(this.timer);
    console.log('current training destroyed');
  }
}
