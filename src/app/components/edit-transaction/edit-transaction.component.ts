import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  public categories: String[];
  public peopleNames: String[];
  public paymentTypes: String[];
  public companyNames: String[];

  constructor(private readonly firestore: FirestoreService, @Inject(MAT_DIALOG_DATA) public transaction: any) {
    this.categories = [];
    this.peopleNames = [];
    this.paymentTypes = [];
    this.companyNames = [];
  }

  ngOnInit(): void {
    this.firestore.getCategories().subscribe( (categories) =>{
      this.categories = categories;
    })
    this.firestore.getPeopleNames().subscribe( (peopleNames) =>{
      this.peopleNames = peopleNames;
    });
    this.firestore.getPaymentType().subscribe( (paymentTypes)=>{
      this.paymentTypes = paymentTypes;
    })
    this.firestore.getCompanyNames().subscribe( (companyNames)=>{
      this.companyNames = companyNames;
    })
  }

  editTransaction(){
    this.firestore.updateTransaction(this.transaction);
  }
  deleteTransaction(){
    this.firestore.deleteTransaction(this.transaction.id);
  }
}
