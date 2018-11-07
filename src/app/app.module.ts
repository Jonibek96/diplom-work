import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogRef, MAT_DIALOG_DATA, MatNativeDateModule, MatSortModule} from '@angular/material';
import { Table1Component } from './table1/table1.component';
import { AppComponent } from './app.component';
import { TabFilterPipe } from './table1/tab-filter.pipe';
import { FormSodirotComponent } from './form-sodirot/form-sodirot.component';
import { DialogComponent } from './dialog/dialog.component';
import { DiologVoridComponent } from './diolog-vorid/diolog-vorid.component';
import {AuthService} from './services/auth.service'
import {DataService} from './services/data.service';
import { DeleteDocComponent } from './delete-doc/delete-doc.component';
import { FormHisobComponent } from './form-hisob/form-hisob.component';
import { HisobotVaktComponent } from './hisobot-vakt/hisobot-vakt.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HisobotVaktsodirComponent } from './hisobot-vaktsodir/hisobot-vaktsodir.component';
import { FilterTablePipe } from './filter-table.pipe';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyDirecriveDirective } from './my-direcrive.directive';





@NgModule({
  declarations: [
    AppComponent,
    Table1Component,
    TabFilterPipe,
    FormSodirotComponent,
    DialogComponent,
    DiologVoridComponent,
    DeleteDocComponent,
    FormHisobComponent,
    HisobotVaktComponent,
    DialogErrorComponent,
    HisobotVaktsodirComponent,
    FilterTablePipe,
    WelcomeComponent,
    MyDirecriveDirective
  ],
  imports: [
    HttpClientModule,
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    ReactiveFormsModule,

  ],
  entryComponents: [
    DialogComponent,
    DiologVoridComponent,
    DeleteDocComponent,
    DialogErrorComponent
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
