import {Injectable} from '@angular/core';
import {Firestore} from '@angular/fire/firestore';
import {addDoc, collection, onSnapshot, orderBy, query, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import {Observable, of} from 'rxjs';
import {Transaction} from 'src/app/models/transaction.model';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private transactions: Observable<Transaction[]>;
  private readonly dropdownLists: Observable<String[]>[];

  private readonly transactionsCollection;

  constructor(private readonly firestore: Firestore) {
    this.transactions = new Observable<Transaction[]>();
    this.dropdownLists = new Array<Observable<String[]>>(4);

    this.transactionsCollection = collection(this.firestore, 'transactions');

    this.setTransactionsFromFirestore();
    this.setDropdownListFromFirestore("category", 0);
    this.setDropdownListFromFirestore("user", 1);
    this.setDropdownListFromFirestore("payment", 2);
    this.setDropdownListFromFirestore("company", 3);
  }

  setTransactionsFromFirestore(){
    const docs = [] as Transaction[];
    const transactionsOrderQuery =
        query(this.transactionsCollection, orderBy('date_created', 'desc'));

    onSnapshot(transactionsOrderQuery, (snapshot) => {
      docs.length = 0;
      snapshot.docs.forEach(element => {
        const doc = element.data() as Transaction;
        doc.id = element.id;
        docs.push(doc);
      });
    });

    this.transactions = of(docs);
  }

  setDropdownListFromFirestore(list: String, index:number){
    let results:String[] = [];
    let data = {} as {names?:any[]};
    onSnapshot(doc(this.firestore, `dropdownLists/${list}`), doc => {
      data = doc.data() as {names?:any[]}
      results = data.names as String[];
      this.dropdownLists[index] = of(results);
    })
  }

  getDropdownLists(){
    return this.dropdownLists;
  }

  addList(){}
  editList(){}
  removeList(){}

  getTransactions(){
    return this.transactions;
  }

  getCategories(){
    return this.dropdownLists[0];
  }

  getPeopleNames(){
    return this.dropdownLists[1];
  }

  getPaymentType(){
    return this.dropdownLists[2];
  }

  getCompanyNames(){
    return this.dropdownLists[3];
  }

  addTransaction(transaction: Transaction){
    addDoc(this.transactionsCollection, transaction);
  }

  addElemToList(docId: String, newItem: String){
    const toUpdateDocRef = doc(this.firestore, `dropdownLists/${docId}`);
    updateDoc(toUpdateDocRef, {names: arrayUnion(newItem)});
  }

  updateTransaction(transaction: Transaction){
    const id = transaction.id;
    const toUpdateDocRef = doc(this.firestore, `transactions/${id}`);

    delete transaction['id'];

    transaction.category = (transaction.category == undefined)? "": transaction.category;
    transaction.amount = (transaction.amount == undefined)? 0: transaction.amount;
    transaction.payee = (transaction.payee == undefined)? "": transaction.payee;
    transaction.on_behalf_of = (transaction.on_behalf_of == undefined)? "": transaction.on_behalf_of;
    transaction.payment_type = (transaction.payment_type == undefined)? "": transaction.payment_type;
    transaction.company = (transaction.company == undefined)? "": transaction.company;
    transaction.date_due = (transaction.date_due == undefined)? null: transaction.date_due;
    transaction.date_paid = (transaction.date_paid == undefined)? null: transaction.date_paid;
    transaction.date_apply_to = (transaction.date_apply_to == undefined)? null: transaction.date_apply_to;
    transaction.comments = (transaction.comments == undefined)? "": transaction.comments;

    updateDoc(toUpdateDocRef, {...transaction});
  }

  updateElemInDropdownList(docId: String, origItem: String, updatedItem: String){
    this.deleteElemFromDropdownList(docId, origItem);
    this.addElemToList(docId, updatedItem);
  }

  deleteTransaction(id?: string){
    const toDelDocRef = doc(this.firestore, `transactions/${id}`);
    deleteDoc(toDelDocRef);
  }

  deleteElemFromDropdownList(docId: String, itemToDel: String){
    const toDelDocRef = doc(this.firestore, `dropdownLists/${docId}`);
    updateDoc(toDelDocRef, {names: arrayRemove(itemToDel)});
  }
}
