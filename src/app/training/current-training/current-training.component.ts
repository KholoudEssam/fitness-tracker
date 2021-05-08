import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() stopTraining = new EventEmitter<void>();
  @Input() chosenExercise: Exercise;
  progress: number = 0;
  timer: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startOrResumeCounting();
  }

  startOrResumeCounting() {
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress === this.chosenExercise.duration)
        clearInterval(this.timer);
    }, 1000);
  }

  stopExrecise() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.progress,
    });

    dialogRef.afterClosed().subscribe((res) => {
      !res ? this.startOrResumeCounting() : this.stopTraining.emit();
    });
  }
}
