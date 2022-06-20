import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-add-to-dropdown-list',
  templateUrl: './add-to-dropdown-list.component.html',
  styleUrls: ['./add-to-dropdown-list.component.scss']
})
export class AddToDropdownListComponent implements OnInit {
  public item: String;

  constructor(private readonly firestore: FirestoreService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = "";
  }

  ngOnInit(): void {
  }

  addToList(){
    this.firestore.addElemToList(this.data.list, this.item);
  }
}
