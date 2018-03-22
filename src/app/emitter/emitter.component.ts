import {Component, Input, OnInit} from '@angular/core';

import { ItemStreamService } from '../item-stream.service';
import { Item } from '../item';
// import {HttpClient} from "@angular/common/http";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'rxjs-emitter',
  templateUrl: './emitter.component.html',
  styleUrls: ['./emitter.component.css']
})
export class EmitterComponent implements OnInit {

  restLoading: boolean;
  @Input() uniqueName: string;

  emittedItemsList: Item[] = [];

  constructor(private itemStreamService: ItemStreamService, private http: HttpClient) {
    this.restLoading = false;
  }

  emit(): void {
    this.createAndPostItem('some text');
  }

  private createAndPostItem(title: string) {
    const x = new Item();
    x.title = title;
    x.emitter = this.uniqueName;
    this.emittedItemsList.push(x);
    this.itemStreamService.getStream().next(x);
  }

  ngOnInit() {
  }

  static extractWeather(data): string {
    // debugger;
    let weatherDescription;
    try {
      const firstEl = data.list[0];
      const x = firstEl.weather[0];
      weatherDescription = x.main;
    } catch (e) {
      weatherDescription = e.message;
    }

    return weatherDescription;
  }

  getWeatherXXX() {
    this.restLoading = true;
    // this.http
    // .get('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=07c07b836d65c97b5f35bab83d5de481&units=metric')
    //   .subscribe( data => {
    //     const weather = EmitterComponent.extractWeather(data);
    //     this.createAndPostItem(weather);
    //     this.restLoading = false;
    //   });
    this.http
      .get('http://localhost:3004/weather')
      .subscribe( data => {
        // debugger;
        const weather = data[0]['main'];
        // const x = data[0];
        // const weather = x['main'];
        this.createAndPostItem(weather);
      });
  }
}
