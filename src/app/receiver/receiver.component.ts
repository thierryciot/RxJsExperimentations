import { Component, OnInit } from '@angular/core';
// import * as Rx from 'rxjs/Rx';

import { Item } from '../item';
import { ItemStreamService } from '../item-stream.service';

@Component({
  selector: 'rxjs-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  receivedItemsList: Item[] = [];
  subscription;

  constructor(private itemStreamService: ItemStreamService) { }

  ngOnInit() {
    // console.log("itemStreamService: "+this.itemStreamService)
  }

  startReceiving(): void {
    this.subscription = this.itemStreamService.getStream().subscribe(
        (data) => { this.receivedItemsList.push(data); },
      (error) => { alert (`Error: ${error}`); },
      () => { alert(`completed subscription ${this.subscription.toString()}`); }
    );
  }

  stopReceiving(): void {
    this.subscription.unsubscribe();
  }
}
