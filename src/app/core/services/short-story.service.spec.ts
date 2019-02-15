import {TestBed} from '@angular/core/testing';

import {ShortStoryService} from './short-story.service';

describe('ShortStoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShortStoryService = TestBed.get(ShortStoryService);
    expect(service).toBeTruthy();
  });
});
