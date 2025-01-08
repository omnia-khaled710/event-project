import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

userForm!:FormGroup;
constructor(private fb:FormBuilder,private router:Router){
this.userForm=this.fb.group({
  email:['',[Validators.email,Validators.required]],
  password:['',[Validators.minLength(8),Validators.required]],
   phone:['',[Validators.minLength(11),Validators.required]]
})
}

submit() {
 const user= this.userForm.value
this.router.navigate(['/home']);

}

}
