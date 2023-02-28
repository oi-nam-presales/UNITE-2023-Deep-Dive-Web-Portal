import { TestBed } from '@angular/core/testing';

import { UnitePluginService } from './unite-plugin.service';

describe('UnitePluginService', () => {
  let service: UnitePluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitePluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
