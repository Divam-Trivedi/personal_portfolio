class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav>
          <a href="/index.html"><img src="/Images/logo_dt.svg" /></a>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/Projects_html/projects.html">Projects</a></li>
            <li><a href="/creativity.html">Creative</a></li>
            <li><a href="/certificates.html">Certs</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>© 2025 Divam Trivedi</p>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);