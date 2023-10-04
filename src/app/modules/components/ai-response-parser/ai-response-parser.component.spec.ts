import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiResponseParserComponent } from './ai-response-parser.component';

describe('AiResponseParserComponent', () => {
  let component: AiResponseParserComponent;
  let fixture: ComponentFixture<AiResponseParserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AiResponseParserComponent]
    });
    fixture = TestBed.createComponent(AiResponseParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
