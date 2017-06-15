import { CoreHtml5CanvasPage } from './app.po';

describe('core-html5-canvas App', () => {
  let page: CoreHtml5CanvasPage;

  beforeEach(() => {
    page = new CoreHtml5CanvasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
