import { Component } from '@angular/core';

@Component({
    selector: 'page-home',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class HomeComponent {

    title = 'numWords';

    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    scales = ['', 'thousand', 'million', 'billion', 'trillion'];

    myNumber = "";


    constructor() {
    }

    convertToWords() {

        let myResult = "";

        this.myNumber = String(this.myNumber).replace(/[^0-9\.]+/g, '');

        this.myNumber = Math.floor(Number(this.myNumber)).toString();

        const numberLength = this.myNumber.length;

        if(numberLength > 9) {
            return "Value overflow!";
        }

        let scale = 0;

        if (Number(this.myNumber)) {
            let myNumber = this.myNumber;

            let lastThreeDigits = myNumber.substr(-3);
            myNumber = myNumber.substring(0, myNumber.length - 3);


            while (lastThreeDigits) {

                let processValue = this.startProcess(lastThreeDigits, scale);
                myResult = (myResult) ? `${processValue}, ${myResult}` : processValue;


                lastThreeDigits = myNumber.substr(-3);
                myNumber = myNumber.substring(0, myNumber.length - 3);
                scale++;
            }


            return myResult;

        }


        return "Zero";
    }

    startProcess(value: string, scale: number): string {
        value = ("000" + Number(value)).slice(-3);
        const unit = Number(value.substr(-1));
        const tens = Number(value.substr(-2, 1));
        const hundreds = Number(value.substr(-3, 1));

        let words = "";

        if (hundreds) words = this.units[hundreds] + " hundred";

        if (hundreds && (tens || unit)) {
            words += " and ";
        }

        if (tens < 2) {
            words += this.units[Number(`${tens}${unit}`)];
        } else {
            words += this.tens[tens] + ' ';
            words += this.units[unit];
        }

        if (scale && (hundreds || tens || unit)) {
            words += ' ' + this.scales[scale];
        }

        return String(words).trim();
    }
}
