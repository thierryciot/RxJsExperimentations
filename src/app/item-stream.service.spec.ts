import { TestBed, inject } from '@angular/core/testing';

import { ItemStreamService } from './item-stream.service';

describe('ItemStreamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemStreamService]
    });
  });

  it('should be created', inject([ItemStreamService], (service: ItemStreamService) => {
    expect(service).toBeTruthy();
  }));
});
