import {NgModule} from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

const Ng2ChartsComponents = [
    NgChartsModule,
];

@NgModule({
    imports: [
        Ng2ChartsComponents
    ],
    exports: [
        Ng2ChartsComponents
    ]
})
export class Ng2ChartsModule { }
