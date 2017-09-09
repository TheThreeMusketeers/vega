import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    data = {
        labels:['BMW','Audi','Mazda'],
        datasets:[
            {
                data:[5,6,10],
                backgroundColor:[
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56"
                ]
            }
        ]
    };
}
