import { NgModule } from '@angular/core';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { AngularMaterialModule } from './imports/angular-material/angular-material.module';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { environment } from '../environments/environment';
import { FirestoreService } from './services/firestore/firestore.service';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { SummarySpendingComponent } from './components/summary-spending/summary-spending.component';
import { DropdownListsComponent } from './components/dropdown-lists/dropdown-lists.component';
import { AddToDropdownListComponent } from './components/add-to-dropdown-list/add-to-dropdown-list.component';
import { EditElementInDropdownListComponent } from './components/edit-element-in-dropdown-list/edit-element-in-dropdown-list.component';
import { Ng2ChartsModule } from './imports/angular-material/ng2-charts';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
    AddTransactionComponent,
    TransactionsListComponent,
    EditTransactionComponent,
    SummarySpendingComponent,
    DropdownListsComponent,
    AddToDropdownListComponent,
    EditElementInDropdownListComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    HomeComponent
  ],
  entryComponents: [
    AddTransactionComponent,
    EditTransactionComponent,
    AddToDropdownListComponent,
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    Ng2ChartsModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot()
  ],
  providers: [
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
