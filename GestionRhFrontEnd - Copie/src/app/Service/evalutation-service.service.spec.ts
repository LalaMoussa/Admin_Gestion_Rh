import { TestBed } from '@angular/core/testing';

import { EvalutationServiceService } from './evalutation-service.service';

describe('EvalutationServiceService', () => {
  let service: EvalutationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalutationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
