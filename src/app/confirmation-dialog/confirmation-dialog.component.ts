import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  get title(): string {
    return this.data.title || 'Confirmação';
  }

  get message(): string {
    return this.data.message || 'Tem certeza de que deseja prosseguir?';
  }

  closeDialog(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}

interface ConfirmationDialogData {
  title?: string;
  message?: string;
}
