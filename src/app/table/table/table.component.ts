import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface UsersData {
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

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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

  addRowData(rowObj){
    this.dataSource.push({
      skill: rowObj.skill,
      rate: rowObj.rate
    });
    this.table.renderRows();
  }

  updateRowData(rowObj){
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.skill === rowObj.skill){
        value.rate = rowObj.rate;
      }
      return true;
    });
  }

  deleteRowData(rowObj){
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.skill !== rowObj.skill;
    });
  }
}
