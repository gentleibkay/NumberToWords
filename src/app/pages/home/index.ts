import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'numWords';

  units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

  myNumber = "";
  myResult = "";

  constructor() { }

  ngOnInit(): void {
  }

  convertToWords (){
    let myResult = "";

    
    this.myNumber = Math.floor(Number(String(this.myNumber).replace(/[^0-9\.]+/g, ''))).toString();
    const numberLength = this.myNumber.length;
    let processSet = 0;

    if(this.myNumber) {
      let myNumber = this.myNumber;

      for (let index = 0; index < numberLength; index+=3) {
        let theBackThree = myNumber.substr(-3);
        myNumber = myNumber.substring(0, myNumber.length -3);
        let processValue = this.startProcess(theBackThree, processSet);
        myResult = (myResult)? `${processValue}, ${myResult}` : processValue;
        processSet++;
      }

      return myResult;

    }

    return "Zero";
  }

  startProcess (value: string, processSet: number): string
  {
    value = ("000" + Number(value)).slice(-3);
    const unit = Number(value.substr(-1));
    const tens = Number(value.substr(-2,1));
    const hundreds = Number(value.substr(-3,1));



    let words = "";

    if(hundreds) words = this.units[hundreds] + " hundred";

    if(hundreds && (tens || unit)) {
      words += " and ";
    }

    if(tens < 2) {
      words += this.units[Number(`${tens}${unit}`)];
    } else {
      words += this.tens[tens] + ' ';
      words += this.units[unit];
    }

    if(processSet && (hundreds || tens || unit)) {
      words += ' ' + this.scales[processSet];
    }

    return String(words).trim();
  }
}
