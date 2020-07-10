import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  skill: string;
  rate: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.localData = {...data};
    this.action = this.localData.action;
  }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancelar'});
  }

}
