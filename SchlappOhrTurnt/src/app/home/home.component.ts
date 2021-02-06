import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  


  route() {
    this.router.navigate(['/training'], {queryParams: {myName: this.normalizedString}});
  }

  normalizedString = '';

  onKey(value: string) {
    let tmpString = '';
    let charArray = Array.from(value);
    charArray.forEach((char) => {
      //TODO: set char check here
      if(char != 'a')
      {
        tmpString += char.toLocaleUpperCase();
    }
    });
    this.normalizedString = tmpString;    
    
  }

}
