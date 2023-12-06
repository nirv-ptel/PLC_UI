import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainServiceService } from './service/main-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  viewProviders: [MainServiceService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PLC_UI';
  myForm: FormGroup;
  errors: boolean = false;
  datas: any;
  data: any;
  constructor(
      private fb: FormBuilder,
      private _service: MainServiceService) {

    this.myForm = this.fb.group({
      input1: ['', Validators.required],
      input2: ['', Validators.required],
      input3: ['', Validators.required],
      input4: ['', Validators.required]
    });

  }

  
  ngOnInit() {
    this.getAPI();
  }

  getAPI () {
 this._service.getData().subscribe((data) => {
  console.warn(data);
  this.data = data.data;
  this.datas = data.data.inputs0;
  this.myForm.get('input1')?.setValue(data.data.inputs1);
  this.myForm.get('input2')?.setValue(data.data.inputs2);
  this.myForm.get('input3')?.setValue(data.data.inputs3);
  this.myForm.get('input4')?.setValue(data.data.inputs4);

})
  }

  onSubmit() {
    console.log(this.myForm.value);
    if(this.myForm.valid) {
      this._service.setData(this.myForm.value).subscribe((data) => {
        this.getAPI();
      }, (error: Error) => {
        this.errors = true;

      })
    }
  }
}
