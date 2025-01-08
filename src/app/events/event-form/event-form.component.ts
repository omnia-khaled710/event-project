import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {

  eventForm!:FormGroup
  isEdit!: boolean;

 constructor(private fb: FormBuilder,
  public dialogRef: MatDialogRef<EventFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {event:Event,isEdit:boolean})
{
  this.eventForm=this.fb.group({
      title: [this.data?.event?.title||'', [Validators.required, Validators.maxLength(50)]],
      description: [this.data?.event?.description ||'', [Validators.required, Validators.maxLength(200)]],
      price: [ this.data?.event?.price||null, [Validators.required, Validators.min(1)]], 
    });
    this.isEdit = data.isEdit;
}
onSubmit() {
  if (this.eventForm.valid) {
    const event = this.eventForm.value;
    this.dialogRef.close(event);

  }
}
onCancel() {
  this.dialogRef.close(); 
}

}
