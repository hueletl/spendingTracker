import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { onSnapshot, doc, where, query, collection, orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-summary-spending',
  templateUrl: './summary-spending.component.html',
  styleUrls: ['./summary-spending.component.scss']
})
export class SummarySpendingComponent implements OnInit {
  public grandTotal: number;
  public choosenYear: number;
  public yearsList:number[];
  public options;
  public barColors: string[];

  public monthLabels: string[];
  public monthDatasetLabel = 'Monthly';
  public monthDatasets: any = [{data: [], label: this.monthDatasetLabel}];

  public usersLabels: string[];
  public usersDatasetLabel = 'User';
  public usersDatasets: any = [{data: [], label: this.usersDatasetLabel}];

  public categoryLabels: string[];
  public categoryDatasetLabel = 'Category';
  public categoryDatasets: any = [{data: [], label: this.categoryDatasetLabel}];

  public userDatasets: any= [[]];

  constructor(private readonly firestore: Firestore, private router: Router ) {
    this.grandTotal = 0;
    this.choosenYear = new Date().getFullYear();
    this.yearsList = this.arrayFromRange(1970, this.choosenYear);
    this.options = {
      plugins: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
              font: {
                size: 16,
                weight: 'bold',
                color: '#666'
              },
                
            },
            
        }
      }
    };
    this.barColors = [
      'rgba(255, 0, 0, 0.2)', //red
      'rgba(0, 255, 0, 0.2)', //gree
      'rgba(0, 0, 255, 0.2)', //blue

      'rgba(255, 255, 0, 0.2)', //yellow
      'rgba(255, 0, 255, 0.2)', //pink
      'rgba(0, 255, 255, 0.2)', //light blue
      
      'rgba(255, 127, 0, 0.2)', //orange
      'rgba(127, 255, 0, 0.2)', //light green
      'rgba(0, 127, 255, 0.2)', //sky blue

      'rgba(255, 0, 127, 0.2)', //blue
      'rgba(0, 255, 127, 0.2)', //green
      'rgba(127, 0, 255, 0.2)', //purple
    ],

    this.monthLabels = [];
    this.usersLabels = [];
    this.categoryLabels = [];
  }

  ngOnInit(): void {
    this.setLabels(this.monthDatasetLabel);
    this.setLabels(this.usersDatasetLabel);
    this.setLabels(this.categoryDatasetLabel);

    this.setMonthsAmount();
  }
  
  public arrayFromRange(start: number, end: number, direction: String = 'ascending'){
    let arr:number[] = [];

    while(start <= end){
      if(direction == 'descending'){
        arr = [...arr, start];
      }else{
        arr = [start, ...arr];
      }
      
      start += 1;
    }
    return arr;
  }

  setLabels(datasetLabel: String){
    switch (datasetLabel) {
      case 'Monthly':
        this.monthLabels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        break;
      case 'User':
        onSnapshot(doc(this.firestore, 'dropdownLists/user'), doc=>{
          let data = doc.data() as {names:string[]};
          this.usersLabels = data.names.sort();
          this.userDatasets = new Array(this.usersLabels.length);
          this.setUsersAmount(this.usersLabels);
          this.setUserAmount(this.usersLabels); 
        })
        break;
      case 'Category':
        onSnapshot(doc(this.firestore, 'dropdownLists/category'), doc=>{
          let data = doc.data() as {names:string[]};
          this.categoryLabels = data.names.sort();
          this.setCategoryAmount(this.categoryLabels);
        })
        break;
      default:
        break;
    }
  }

  setMonthsAmount(){
    this.grandTotal = 0;
    let monthlyAmounts: number[] = new Array(12);
    for(let i = 0; i < 12; i++){
      let month: number = 0;

      const q = query(
        collection(this.firestore, 'transactions'), 
        where('date_paid', '>=', new Date(this.choosenYear, i,1)), 
        where('date_paid', '<', new Date(this.choosenYear, i+1,1))
      );

      onSnapshot(q, docs=>{
        docs.forEach(doc=>{
          let data = doc.data() as {amount:number}
          month = +month + +data.amount;
          
        })
        monthlyAmounts[i] = month;
        this.monthDatasets = [{data:monthlyAmounts, label: this.monthDatasetLabel, backgroundColor: this.barColors}];
        this.grandTotal = +this.grandTotal + +month;
        month = 0;
      });
    }
  }

  setUsersAmount(userNames: string[]){
    let size = userNames.length;
    let amounts: number[] = new Array(size);
    let begYear = new Date(this.choosenYear, 0, 1);
    let begNextYear = new Date(this.choosenYear + 1, 0, 1);

    for(let i = 0; i < size; i++){
      let amount:number = 0;
      let name = userNames[i];
      
      let q = query(
        collection(this.firestore, 'transactions'), 
        where('payee', '==', name),
        where('date_paid', '>=', begYear),
        where('date_paid', '<', begNextYear),
      )

      onSnapshot(q, (docs:any) => {
        docs.forEach((doc:any) => {
          let data = doc.data() as {amount:number}
          amount = +amount + +data.amount;
        })
        amounts[i] = amount;
        this.usersDatasets = [{data:amounts, label: this.usersDatasetLabel, backgroundColor: this.barColors}]
      });

    }
  }

  setCategoryAmount(categories: string[]){
    let size = categories.length;
    let amounts: number[] = new Array(size);
    let begYear = new Date(this.choosenYear, 0, 1);
    let begNextYear = new Date(this.choosenYear + 1, 0, 1);

    for(let i = 0; i < size; i++){
      let amount:number = 0;
      let name = categories[i];
      
      let q = query(
        collection(this.firestore, 'transactions'), 
        where('category', '==', name),
        where('date_paid', '>=', begYear),
        where('date_paid', '<', begNextYear),
      )
    

      onSnapshot(q, (docs:any) => {
        docs.forEach((doc:any) => {
          let data = doc.data() as {amount:number}
          amount = +amount + +(data.amount == undefined)? 0: data.amount;
        })
        amounts[i] = amount;
        this.categoryDatasets = [{data:amounts, label: this.categoryDatasetLabel, backgroundColor: this.barColors}]
      });

    }
    
  }
  setUserAmount(users: string[]){
    let sizeUsers = users.length;
    let sizeCats = this.categoryLabels.length;
    let begYear = new Date(this.choosenYear, 0, 1);
    let begNextYear = new Date(this.choosenYear + 1, 0, 1);

    for(let i = 0; i < sizeUsers; i++){
      let amounts: number[] = new Array(sizeCats).fill(0);
      let name = users[i];
      let grandTotal = 0;
      for( let j = 0; j < sizeCats; j++){
        let category = this.categoryLabels[j];
        let amount = 0;
        let q = query(
          collection(this.firestore, 'transactions'),
          where('payee', '==', name),
          where('category', '==', category),
          where('date_paid', '>=', begYear),
          where('date_paid', '<', begNextYear),
        );

        onSnapshot(q, (docs:any) => {
          docs.forEach( (doc: any) => {
            let data = doc.data() as {amount:number};
            amount = +amount + +(data.amount == undefined)? 0: data.amount;
          })
          amounts[j] = amount;
          grandTotal = +grandTotal + +amount;
          this.userDatasets[i] = [{data:amounts, label: `${name}: $${grandTotal}`, backgroundColor: this.barColors}];
        })
      }
      
      
      

      
    }
  }

  updateData(){
    this.setMonthsAmount();
    this.setUsersAmount(this.usersLabels);
    this.setCategoryAmount(this.categoryLabels);
    this.setUserAmount(this.usersLabels);
  }

}
