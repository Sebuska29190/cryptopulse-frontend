import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <div className="container-fluid missed-section mg-posts-sec-inner">
        {/* Footer missed section can be added here */}
      </div>

      <footer className="footer back-img">
        <div className="overlay">
          {/* Footer widget area can be added here */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="mg-footer-copyright text-center">
                  <p>&copy; 2024 Crypto Pulse Now. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll To Top */}
      <a href="#" className="ta_upscr bounceInup animated">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default Footer;