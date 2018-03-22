import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemStreamService} from './item-stream.service';
import {SpeechRecognitionService} from './speech-recognition.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { range } from 'rxjs/observable/range';
import {map, filter, scan, combineAll, sample} from 'rxjs/operators';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/sample';

@Component({
  selector: 'rxjs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy {

  // ngOnInit() {
  // }
  constructor(private itemStreamService: ItemStreamService,
              private speechService: SpeechRecognitionService)
  {
  }

  useReplaySubject( flag ) {
    // debugger;
    this.itemStreamService.useReplaySubject(flag);
  }

  ngOnInit() {
    console.log('Starting app');
    const domEl = document.querySelector('#boxId');

    /* We create a stream of all mouse move: the item in stream is the dom event */
    const input = Observable.fromEvent(domEl, 'mousemove');

    /* We want mouse move not as fast as system can give us but every 100ms */
    /* This does not do what we want: it sends an event only if mouse has not moved in 100ms */
    // const debouncedInput = input.pipe(debounceTime(100));
    /* Instead we use this: Only emit values after a fixed amount has passed between the last emission,throw away all other values*/
    const debouncedInput = input.pipe(debounce(() => timer(100)));

    // const mappedInput =
      debouncedInput.pipe(map(val => {
          return { x: val['offsetX'], y: val['offsetY'] };
        }
      ));

    // const sub =
    // mappedInput.subscribe({
    //   next: data => console.log(`* mouse move: ${data['x']}, ${data['y']}`),
    //   // next: ev => console.log(`** mouse move: ${ev['offsetX']}, ${ev['offsetY']}`),
    //   error: err => console.log(`* Error: ${err}`),
    //   complete: () => console.log(`Complete!`),
    // });
    // sub.unsubscribe();

    /* Find all mouse move while mouse down */
    const input2 = Observable.fromEvent(domEl, 'mousedown');
    // create a single stream of mousemove
    const mouseSelect = input2
      .do( md => console.log(`mousedown event ${md['offsetX']} ${md['offsetY']}`))
      .mergeMap( md => Observable.fromEvent(domEl, 'mousemove'))
      .pipe(distinctUntilChanged((mmv1, mmv2) => mmv1['offsetX'] === mmv2['offsetX'] && mmv1['offsetY'] === mmv2['offsetY']))
      .pipe(sample(interval(100)))
      // .do( mmv => console.log(`mousemouve event while mouse down ${mmv['offsetX']} ${mmv['offsetY']}`))
      // .pipe(combineAll())
      .takeUntil(Observable.fromEvent(domEl, 'mouseup')
        .do( mu => console.log(`mouseup event ${mu['offsetX']} ${mu['offsetY']}`))
      )
      .repeat()
    ;

    // const sub =
      mouseSelect.subscribe({
      next: data => console.log(`* mouse select: ${data['offsetX']} ${data['offsetY']}`),
      error: err => console.log(`* Error: ${err}`),
      complete: () => console.log(`Complete!`),
    });
  }

  ngOnDestroy() {
    this.speechService.destroySpeechObject();
  }

  // mouseMove(ev) {
  //   console.log(`mouse move: ${ev.offsetX}, ${ev.offsetY}`);
  //   // debugger;
  // }

  activateSpeech(): void {
    this.speechService.record()
      .subscribe(
        (value) => {
          // this.speechData = value;
          console.log(value);
        },
        (err) => {
          console.log(`Speech service error: ${err}`);
          if (err.error === 'no-speech') {
            console.log('restarting Speech service');
            this.activateSpeech();
          }
        },
        () => {
          console.log('Speech service done.');
          // this.activateSpeechSearchMovie();
        });
  }
}
