import { TestBed } from '@angular/core/testing';

import { VNDBService } from './vndb.service';

describe('VndbService', () => {
  let service: VNDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VNDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
