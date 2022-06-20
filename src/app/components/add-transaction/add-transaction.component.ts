import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Transaction } from 'src/app/models/transaction.model';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  public transaction: Transaction;
  public categories: String[];
  public peopleNames: String[];
  public paymentTypes: String[];
  public companyNames: String[];

  constructor(private readonly firestore: FirestoreService) {
    this.transaction = {};
    this.resetTransaction();
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

  addTransaction(){
    this.transaction.date_created = Timestamp.now();
    this.firestore.addTransaction(this.transaction);
  }

  resetTransaction(){
    this.transaction.amount = 0;
    this.transaction.category = "";
    this.transaction.comments = "";
    this.transaction.company = "";
    this.transaction.date_apply_to = null;
    this.transaction.date_created = null;
    this.transaction.date_due = null;
    this.transaction.date_paid = null;
    this.transaction.on_behalf_of = "";
    this.transaction.payee = "";
    this.transaction.payment_type = "";
  }
}
