import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LogoModalComponent } from './components/logo-modal/logo-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LogoModalComponent]
})
export class AppModule { }
