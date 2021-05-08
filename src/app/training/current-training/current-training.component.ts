import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() stopTraining = new EventEmitter<void>();

  progress: number = 0;
  timer: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startOrResumeCounting();
  }

  startOrResumeCounting() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress === 100) clearInterval(this.timer);
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
