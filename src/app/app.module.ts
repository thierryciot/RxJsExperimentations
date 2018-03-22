import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmitterComponent } from './emitter/emitter.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { ItemStreamService } from './item-stream.service';
import {SpeechRecognitionService} from './speech-recognition.service';

@NgModule({
  declarations: [
    AppComponent,
    EmitterComponent,
    ReceiverComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ItemStreamService,
    SpeechRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
