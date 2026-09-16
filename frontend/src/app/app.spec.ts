import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  const storedValues = new Map<string, string>();
  const themeStorage: Storage = {
    get length() {
      return storedValues.size;
    },
    clear: () => storedValues.clear(),
    getItem: (key) => storedValues.get(key) ?? null,
    key: (index) => [...storedValues.keys()][index] ?? null,
    removeItem: (key) => storedValues.delete(key),
    setItem: (key, value) => storedValues.set(key, value),
  };

  beforeEach(async () => {
    vi.stubGlobal('localStorage', themeStorage);
    themeStorage.clear();
    delete document.documentElement.dataset['theme'];

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => {
    themeStorage.clear();
    delete document.documentElement.dataset['theme'];
    vi.unstubAllGlobals();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the URL input inside the main content', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('main app-input-url input[type="url"]')).not.toBeNull();
  });

  it('should toggle and persist the selected theme', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('.theme-toggle') as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(document.documentElement.dataset['theme']).toBe('light');

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.title).toBe('Mudar para tema claro');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(themeStorage.getItem('theme')).toBe('dark');
  });

  it('should restore a saved theme', async () => {
    themeStorage.setItem('theme', 'dark');
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('.theme-toggle') as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });
});
