
export default function createFooter() {

    const footer = document.querySelector("footer");

    footer.innerHTML = `
  <footer>
    <div class="top-footer">
      <div class="container top-footer-content">
        <div class="link-group">
          <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="shop.html">Shop</a>
            <a href="about.html">About</a>
            <a href="basket.html">Basket</a>
          </div>
          <div class="footer-links">
            <a href="https://www.facebook.com"
              ><i class="fa-brands fa-facebook-square"></i> Facebook</a
            >
            <a href="https://www.twitter.com"
              ><i class="fa-brands fa-twitter-square"></i> Twitter</a
            >
            <a href="https://www.instagram.com">
              <i class="fa-brands fa-instagram-square"></i> Instagram</a
            >
          </div>
        </div>
        <div class="footer-logo">
          <a href="/"
            ><img src="/logo/logo.png" alt="Secrets of Thailand Logo"
          /></a>
        </div>
      </div>
    </div>
    <div class="bottom-footer">
      Copyright © 2022 Secrets of Thailand | All Rights Reserved
    </div>
  </footer>`;

}