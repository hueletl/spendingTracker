import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Transaction } from 'src/app/models/transaction.model';
import { Timestamp } from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  public transactions: Transaction[];

  constructor(private readonly firestore: FirestoreService, public dialog: MatDialog) {
    this.transactions = [];
  }

  ngOnInit(): void {
    this.firestore.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  format(att:any){
    let attribute = att;
    if(att instanceof Timestamp){
      attribute = att.toDate().toDateString();
    }
    return attribute;
  }

  addTransaction(){
    let dialogRef = this.dialog.open(AddTransactionComponent);
  }
  editTransaction(transaction: Transaction){
    let data = {
      amount: transaction.amount,
      category: transaction.category,
      comments: transaction.comments,
      company: transaction.company,
      date_apply_to: transaction.date_apply_to?.toDate(),
      date_created: transaction.date_created?.toDate(),
      date_due: transaction.date_due?.toDate(),
      date_paid: transaction.date_paid?.toDate(),
      id: transaction.id,
      on_behalf_of: transaction.on_behalf_of,
      payee: transaction.payee,
      payment_type: transaction.payment_type,
    }
    let dialogRef = this.dialog.open(EditTransactionComponent, {data});
  }

  deleteTransaction(transactionId?: string){
    this.firestore.deleteTransaction(transactionId);
  }
}
