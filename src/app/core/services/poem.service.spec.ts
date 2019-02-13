import {TestBed} from '@angular/core/testing';

import {PoemService} from './poem.service';

describe('PoemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoemService = TestBed.get(PoemService);
    expect(service).toBeTruthy();
  });
});
