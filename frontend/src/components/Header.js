import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      {/* grey navbar no mobile */}

      <Navbar expand='lg' className='grey-navbar-top no-mobile'>
        <Container>
          <div className='grey-navbar-flex'>
            <LinkContainer to='/contact' className='grey-navbar-top-contact'>
              <p className='grey-navbar-contact'>Kontakt</p>
            </LinkContainer>
          </div>
          <div className='grey-navbar-two-links'>
            <LinkContainer to='/cart' className='grey-navbar-cart'>
              <Nav.Link>
                <p className='number-in-cart '>
                  <span>{cartItems.length}</span>
                </p>
                <i className='fas fa-shopping-cart'></i> Košík
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='profile'>
                  <NavDropdown.Item>Môj profil</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Odhlásiť sa
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login' className='grey-navbar-sign-in'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Prihlásenie
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Používatelia</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Produkty</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Objednávky</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </div>
        </Container>
      </Navbar>
      {/* Header with Logo ... */}
      <div className='top-container no-mobile'>
        <div>
          <Link to='/' className='no-underline'>
            <img
              src='/images/prud-zivota-logo.png'
              className='header-image'
              alt='prud-zivota'
            ></img>
          </Link>
          <h3 className='header-publisher'>
            Prinášať bohatstvo Božieho slova celému Božiemu ľudu
          </h3>
        </div>
        <div className='header-search-box'>
          <SearchBox />
          {/* <div className='header-two-links'>
            <LinkContainer to='/cart' className='header-cart'>
              <Nav.Link>
                <p className='number-in-cart '>
                  <span>{cartItems.length}</span>
                </p>
                <i className='fas fa-shopping-cart'></i> Košík
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='profile'>
                  <NavDropdown.Item>Môj profil</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Odhlásiť sa
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login' className='header-sign-in'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Prihlásenie
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Používatelia</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Produkty</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Objednávky</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </div> */}
        </div>
      </div>
      {/* Red Navbar, on Mobile is Grey with Toggle */}
      <Navbar variant='dark' expand='lg' collapseOnSelect>
        <div className='red-navbar-container'>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/* <i className='fas fa-home no-mobile'></i> */}
              <div className='mobile-navbar mobile-only'>
                {/* <h1 className='header-name'>Prúd života</h1> */}
                <Link to='/' className='no-underline'>
                  <img
                    src='/images/prud-zivota-logo.png'
                    className='header-image-mobile'
                    alt='prud-zivota'
                  ></img>
                </Link>
                <LinkContainer to='/cart' className='header-cart mobile-only'>
                  <Nav.Link>
                    <p className='number-in-cart'>
                      <span>{cartItems.length}</span>
                    </p>
                    <i className='fas fa-shopping-cart'></i> Košík
                  </Nav.Link>
                </LinkContainer>
              </div>
              <div className='mobile-sign-in mobile-only'>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='profile'>
                      <NavDropdown.Item>Môj profil</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Odhlásiť sa
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link className='mobile-sign-in'>
                      <i className='fas fa-user'></i> Prihlásenie
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Používatelia</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Produkty</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Objednávky</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='mob-my' id='basic-navbar-nav'>
            <NavDropdown title='Darujte 2%' className='red-navbar-item'>
              <LinkContainer to='profile'>
                <NavDropdown.Item>Fyzické osoby</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item to='profile'>Podnikatelia</NavDropdown.Item>
              <NavDropdown.Item to='profile'>Právnické osoby</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Nové' className='red-navbar-item'>
              <LinkContainer to='profile'>
                <NavDropdown.Item>Knihy 2020 12</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item to='profile'>Knihy 2020 12</NavDropdown.Item>
              <NavDropdown.Item to='profile'>Knihy 2020 12</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Podcast' className='red-navbar-item'>
              <LinkContainer to='profile'>
                <NavDropdown.Item>Slová života</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item to='profile'>Štúdium života</NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to='/video'>
              <Nav.Link className='red-navbar-item'>Video</Nav.Link>
            </LinkContainer>
            <NavDropdown title='Eshop' className='red-navbar-item'>
              <LinkContainer to='profile'>
                <NavDropdown.Item>Abecedný zoznamkníh</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item to='profile'>Božia ekonómia</NavDropdown.Item>
              <NavDropdown.Item to='profile'>Brožúry</NavDropdown.Item>
              <NavDropdown.Item to='profile'>Cirkev</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Duch</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Evanjelium</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Kresťanská prax</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>
                Kresťanská služba
              </NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Kristus</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Letáky</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Mládež</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Trojjediný Boh</NavDropdown.Item>
              <NavDropdown.Item to='profile'>
                Štúdium a výklad Biblie
              </NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Život</NavDropdown.Item>{' '}
              <NavDropdown.Item to='profile'>Životopisné</NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to='/library'>
              <Nav.Link className='red-navbar-item'>Čitáreň</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/info'>
              <Nav.Link className='red-navbar-item'>Info</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/contact'>
              <Nav.Link className='red-navbar-item'>Kontakt</Nav.Link>
            </LinkContainer>
            <div className='search-navbar-mobile mobile-only'>
              <SearchBox />
            </div>
          </Navbar.Collapse>
          {/* <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='mob-my' id='basic-navbar-nav'>
            <SearchBox />

            <Nav className='mob-my ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <LinkContainer to='/contact'>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse> */}
        </div>
      </Navbar>
    </header>
  )
}

export default Header
