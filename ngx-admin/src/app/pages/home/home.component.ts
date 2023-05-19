import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy, OnInit {

  private alive = true;


  constructor(
    private themeService: NbThemeService,
    private router: Router
    ) { }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    this.router.navigate([''])
    console.log(this.router)
  }
}
