import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rx';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {

  speechRecognitionEngine;

  constructor() { }

  record(): Observable<string> {

    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this.speechRecognitionEngine = new webkitSpeechRecognition();
      this.speechRecognitionEngine.continuous = true;
      this.speechRecognitionEngine.lang = 'en-us';
      this.speechRecognitionEngine.maxAlternatives = 1;

      this.speechRecognitionEngine.onresult = speech => {
        let term = '';
        if (speech.results) {
          const result = speech.results[speech.resultIndex];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              console.log('Unrecognized result - Please try again');
            }
            else {
              // term = _.trim(transcript);
              term = transcript;
              console.log('Did you said? -> ' + term + ' , If not then say something else...');
            }
          }
        }
        // this.zone.run(() => {
        //   observer.next(term);
        // });
      };

      this.speechRecognitionEngine.onerror = error => {
        observer.error(error);
      };

      this.speechRecognitionEngine.onend = () => {
        observer.complete();
      };

      this.speechRecognitionEngine.start();
        console.log('Say something - We are listening !!!');
      });
  }

  destroySpeechObject() {
    if (this.speechRecognitionEngine) {
      this.speechRecognitionEngine.stop();
    }
  }

}
