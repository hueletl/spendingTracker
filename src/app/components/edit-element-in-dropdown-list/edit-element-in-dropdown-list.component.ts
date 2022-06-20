import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-edit-element-in-dropdown-list',
  templateUrl: './edit-element-in-dropdown-list.component.html',
  styleUrls: ['./edit-element-in-dropdown-list.component.scss']
})
export class EditElementInDropdownListComponent implements OnInit {
  private readonly origItem;
  
  constructor(private readonly firestore: FirestoreService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.origItem = data.itemToUpdate;
  }

  ngOnInit(): void {
  }

  editElemInDropdownList(){
    this.firestore.updateElemInDropdownList(this.data.list, this.origItem, this.data.itemToUpdate);
  }

  deleteElement(){
    this.firestore.deleteElemFromDropdownList(this.data.list, this.data.itemToUpdate);
  }
}
