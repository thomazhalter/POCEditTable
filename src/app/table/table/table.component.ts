import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface UsersData {
  id: number;
  skill: string;
  rate: number;
}

const ELEMENT_DATA: UsersData[] = [];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['skill', 'rate', 'action'];
  dataSource = ELEMENT_DATA;

  starCount: string;
  rating: string;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {
    this.load();
  }

  ngOnInit(): void {
    this.starCount = '5';
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar'){
        this.addRowData(result.data);
      } else if (result.event === 'Atualizar'){
        this.updateRowData(result.data);
      } else if (result.event === 'Excluir'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj) {
    const id = new Date();

    this.dataSource.push({
      id: id.getTime(),
      skill: rowObj.skill,
      rate: rowObj.rate
    });
    this.table.renderRows();

    this.saveLocalStorage(this.dataSource);
  }

  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      console.log(value);
      if (value.id === rowObj.id){
        value.skill = rowObj.skill;
        value.rate = rowObj.rate;
      }
      return true;
    });

    console.log('datasource', this.dataSource);

    this.saveLocalStorage(this.dataSource);
  }

  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowObj.id;
    });

    this.saveLocalStorage(this.dataSource);
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }

  load() {
    const data = localStorage.getItem('skills');
    if (data) {
      this.dataSource = JSON.parse(data);
    } else {
      this.dataSource = [];
    }
  }

  saveLocalStorage(dataSource) {
    const data = JSON.stringify(dataSource);
    localStorage.setItem('skills', data);
  }
}
