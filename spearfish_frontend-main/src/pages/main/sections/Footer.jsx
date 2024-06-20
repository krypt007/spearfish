import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="flex-column-center align-center">
      <div className="mb-20">
        <p className="fs-0-8">We are social. Find us on</p>
        <div className="flex-row-center align-center gap-10 social-icons">
          <a href='https://www.facebook.com/SpearfishKe'
            target="_blank" rel="noreferrer">
            <div>
              <Icon icon='ic:round-facebook' className="social-icon" />
            </div>
          </a>
          <a href='https://www.instagram.com/spearfishke/'
            target="_blank" rel="noreferrer">
            <div>
              <Icon icon='ph:instagram-logo-fill' className="social-icon" />
            </div>
          </a>
          <a href='https://www.linkedin.com/company/spearfishke'
            target="_blank" rel="noreferrer">
            <div>
              <Icon icon='brandico:linkedin-rect' className="social-icon" />
            </div>
          </a>
        </div>
      </div>
      <h1>Spearfish</h1>
      <div className="footer-container text-align-center">
        <p className="m-tb-10">
          Spearfish. Copyright © all rights reserved {(new Date()).getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export default Footer;
