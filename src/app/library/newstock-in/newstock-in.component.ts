import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newstock-in',
  templateUrl: './newstock-in.component.html',
  styleUrls: ['./newstock-in.component.scss']
})
export class NewstockInComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

}
