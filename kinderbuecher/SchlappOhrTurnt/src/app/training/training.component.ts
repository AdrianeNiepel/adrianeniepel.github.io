import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.sass']
})
export class TrainingComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) 
  {}

  @Input()
  baseText: string ='';

  trainingOnGoing: boolean = true;
  interval: any;
  excersiceLength: number = 3;
  timeLeft: number = this.excersiceLength;
  isPaused: boolean = false;
  currentLetter:string | undefined;
  currentIndex:number = 0;
  instrunctionText: string = '';

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.baseText = params["myName"]
      console.log(params); // popular
    }
  );
  this.trainingOnGoing = true;
  this.nextLetter();
  this.startTimer();
  }

  nextLetter(): boolean
  {
    if(this.baseText.length > this.currentIndex)
    {      
      //next letter
      this.currentLetter = this.baseText[this.currentIndex];
      this.http.get('assets/letters/'+this.currentLetter+'.txt', {responseType: 'text'})
        .subscribe(data => this.instrunctionText = data);
      this.currentIndex++;
      return true;      
    }
    else{
      //we are done
      this.trainingOnGoing = false;
      return false;
    }
  }

  pause(): void{
    this.isPaused = !this.isPaused;
  }

  

  startTimer() {
    this.interval = setInterval(() => {
      if (!this.isPaused)
      {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if(!this.nextLetter())
        {
          this.interval = null;
        }
        else 
        {
          //next letter;
          this.timeLeft = this.excersiceLength;
        }
        
      }
    }
  },1000)
  
  }


}
