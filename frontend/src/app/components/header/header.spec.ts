import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the application name inside the header', () => {
    const element: HTMLElement = fixture.nativeElement;
    const heading = element.querySelector('header h1');

    expect(heading?.textContent?.trim()).toBe('Shortner URL');
    expect(element.querySelector('[aria-hidden="true"] svg')).not.toBeNull();
  });
});
