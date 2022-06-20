import { Component, OnInit, Inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { onSnapshot, doc } from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddToDropdownListComponent } from '../add-to-dropdown-list/add-to-dropdown-list.component';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { EditElementInDropdownListComponent } from '../edit-element-in-dropdown-list/edit-element-in-dropdown-list.component';

@Component({
  selector: 'app-dropdown-lists',
  templateUrl: './dropdown-lists.component.html',
  styleUrls: ['./dropdown-lists.component.scss']
})
export class DropdownListsComponent implements OnInit {
  public categories: String[];
  public userNames: String[];
  public paymentTypes: String[];
  public companyNames: String[];

  constructor(private readonly firestore: Firestore, public dialog: MatDialog) {
    this.categories = [];
    this.userNames = [];
    this.paymentTypes = [];
    this.companyNames = [];
  }

  ngOnInit(): void {
    let list = [] as String[];
    let data = {} as {names?:any[]};

    onSnapshot(doc(this.firestore, 'dropdownLists/category'), doc => {
      data = doc.data() as {names?:any[]}
      list = data.names as String[];
      this.categories = list.sort();
    })
    onSnapshot(doc(this.firestore, 'dropdownLists/user'), doc => {
      data = doc.data() as {names?:any[]}
      list = data.names as String[];
      this.userNames = list.sort();
    })
    onSnapshot(doc(this.firestore, 'dropdownLists/payment'), doc => {
      data = doc.data() as {names?:any[]}
      list = data.names as String[];
      this.paymentTypes = list.sort();
    })
    onSnapshot(doc(this.firestore, 'dropdownLists/company'), doc => {
      data = doc.data() as {names?:any[]}
      list = data.names as String[];
      this.companyNames = list.sort();
    })
  }

  addToList(list:String){
    let data = {
      list: list,
    }
    this.dialog.open(AddToDropdownListComponent, {data});
  }

  editElemInList(list: String, itemToUpdate: String){
    let data = {
      list: list,
      itemToUpdate: itemToUpdate,
    }
    this.dialog.open(EditElementInDropdownListComponent, {data});
  }

  deleteElemFromList(list: String, itemToDel: String){
    let firestore = new FirestoreService(this.firestore);
    firestore.deleteElemFromDropdownList(list, itemToDel);
  }
}
