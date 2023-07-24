import { TestBed } from '@angular/core/testing';

import { KartikShopFormService } from './kartik-shop-form.service';

describe('KartikShopFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KartikShopFormService = TestBed.get(KartikShopFormService);
    expect(service).toBeTruthy();
  });
});
