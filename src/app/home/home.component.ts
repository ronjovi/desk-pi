import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface ClockDate {
  hours: number;
  minutes: number;
  seconds: number;
}

export enum KEY_CODE {
  Q = 91,
  ESC = 27
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public newdate;
  public date;

  constructor(private router: Router) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.Q) {
      this.close();
    }

    if (event.keyCode === KEY_CODE.ESC) {
      this.close();
    }
  }

  ngOnInit(): void {
    this.getDate();

    setInterval( ()=> {
      this.updateDate();
    }, 1000);
  }

  updateDate(){
    this.date = this.getDate();
  }

  getDate(){
    let newdate = new Date();
    let hours = newdate.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    let date = {
      hours: hours,
      minutes:  newdate.getMinutes(),
      seconds:  newdate.getSeconds(),
      secondOffset: newdate.getSeconds() / 60 * 100 + "%",
      minuteOffset: newdate.getMinutes() / 60 * 100 + "%",
      hourOffset: hours / 12 * 100 + "%",
      secondopacity: newdate.getSeconds() / 60 * 100 / 100,
      minuteopacity: newdate.getMinutes() / 60 * 100 / 100,
      houropacity: hours / 12 * 100 / 100,
    };

    return date;
  }

  close(){
    const remote = require('electron').remote
let w = remote.getCurrentWindow()
w.close()
  }

}
