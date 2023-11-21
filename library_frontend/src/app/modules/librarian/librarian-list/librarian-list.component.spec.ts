import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianListComponent } from './librarian-list.component';

describe('LibrarianListComponent', () => {
  let component: LibrarianListComponent;
  let fixture: ComponentFixture<LibrarianListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarianListComponent]
    });
    fixture = TestBed.createComponent(LibrarianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
