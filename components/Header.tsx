import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <>
      <a className="skip-link screen-reader-text" href="#content">Skip to content</a>
      <div className="wrapper" id="custom-background-css">
        <header className="mg-headwidget">
          {/* Top Bar - can be added later */}
          <div className="clearfix"></div>

          <div className="mg-nav-widget-area-back" style={{ backgroundImage: 'url("/images/head-back.jpg")' }}>
            <div className="overlay">
              <div className="inner">
                <div className="container-fluid">
                  <div className="mg-nav-widget-area">
                    <div className="row align-items-center">
                      <div className="col-md-3 text-center-xs">
                        <div className="navbar-header">
                          <div className="site-logo">
                            {/* Logo can be added here */}
                          </div>
                          <div className="site-branding-text">
                            <h1 className="site-title">
                              <Link href="/" rel="home">Crypto Pulse Now</Link>
                            </h1>
                            <p className="site-description">Latest cryptocurrency news and analysis</p>
                          </div>
                        </div>
                      </div>
                      {/* Banner advertisement can be added here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mg-menu-full">
            <nav className="navbar navbar-expand-lg navbar-wp">
              <div className="container-fluid">
                <div className="m-header align-items-center">
                  <Link className="mobilehomebtn" href="/"><span className="fa-solid fa-house-chimney"></span></Link>
                  <button className="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbar-wp" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="burger">
                      <span className="burger-line"></span>
                      <span className="burger-line"></span>
                      <span className="burger-line"></span>
                    </span>
                  </button>
                  {/* Header search and subscribe can be added here */}
                </div>

                <div className="collapse navbar-collapse" id="navbar-wp">
                  <div className="d-md-block">
                    <ul className="nav navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" href="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/categories">Categories</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/about">About</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="desk-header d-lg-flex pl-3 ml-auto my-2 my-lg-0 position-relative align-items-center">
                  <ThemeToggle />
                  {/* Header search and subscribe can be added here */}
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className="clearfix"></div>
      </div>
    </>
  );
};

export default Header;