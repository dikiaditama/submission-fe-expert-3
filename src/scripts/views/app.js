import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import AppShellInitiator from '../utils/appshell-initiator';

class App {
  constructor({ toggler, drawer, header, content }) {
    this._toggler = toggler;
    this._drawer = drawer;
    this._header = header;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    AppShellInitiator.init({
      toggler: this._toggler,
      drawer: this._drawer,
      header: this._header,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-to-content');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#main').focus();
    });
  }
}

export default App;
