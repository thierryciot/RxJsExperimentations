import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs/Rx';

import { Item } from './item';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ItemStreamService {

  private flagUseReplaySubject = false;
  private stream: Subject<Item>;

  constructor() {
  }

  useReplaySubject( flag ) {
    this.flagUseReplaySubject = flag;
  }

  getStream(): Subject<Item> {
    if ( this.stream === undefined ){
      if ( this.flagUseReplaySubject ) {
        this.stream = new ReplaySubject(); // this one will remember all emitted items
      }
      else {
        this.stream = new Subject();  // this one will NOT remember all emitted items
      }
    }

    return this.stream;
  }
}
