import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];
  dataSource: MatTableDataSource<Exercise>;

  isData: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private exerciseService: ExerciseService) {
    this.dataSource = new MatTableDataSource(
      this.exerciseService.getPrevExercises()
    );
  }

  ngOnInit(): void {
    this.exerciseService.getPrevExercises().length
      ? (this.isData = true)
      : (this.isData = false);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
