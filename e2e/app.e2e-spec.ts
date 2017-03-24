import { NgFrontPage } from './app.po';

describe('ng-front App', () => {
  let page: NgFrontPage;

  beforeEach(() => {
    page = new NgFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
