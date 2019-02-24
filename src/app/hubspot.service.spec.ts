import { TestBed } from '@angular/core/testing';

import { HubspotService } from './hubspot.service';

describe('HubspotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HubspotService = TestBed.get(HubspotService);
    expect(service).toBeTruthy();
  });
});
