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

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Container className='top-container'>
        <div>
          {/* <h1 className='header-name'>Prúd života</h1> */}
          <img
            src='/images/prud-zivota-logo.png'
            className='header-image'
            alt='prud-zivota'
          ></img>
          <h2 className='header-publisher'>
            Prinášať bohatstvo Božieho slova celému Božiemu ľudu
          </h2>
        </div>
        <div className='header-search-box'>
          <SearchBox />
          <div className='header-two-links'>
            <LinkContainer to='/cart' className='header-cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Košík
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
              <LinkContainer to='/login' className='header-sign-in'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Prihlásenie
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
          </div>
        </div>
      </Container>
      <Navbar variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <i className='fas fa-home'></i>
            </Navbar.Brand>
          </LinkContainer>
          <NavDropdown title='Darujte 2%' className=''>
            <LinkContainer to='profile'>
              <NavDropdown.Item>Fyzické osoby</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item to='profile'>Podnikatelia</NavDropdown.Item>
            <NavDropdown.Item to='profile'>Právnické osoby</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Nové' className=''>
            <LinkContainer to='profile'>
              <NavDropdown.Item>Knihy 2020 12</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item to='profile'>Knihy 2020 12</NavDropdown.Item>
            <NavDropdown.Item to='profile'>Knihy 2020 12</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Podcast' className=''>
            <LinkContainer to='profile'>
              <NavDropdown.Item>Slová života</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item to='profile'>Štúdium života</NavDropdown.Item>
          </NavDropdown>
          <LinkContainer to='/video'>
            <Nav.Link className='video-link'>Video</Nav.Link>
          </LinkContainer>
          <NavDropdown title='Eshop' className=''>
            <LinkContainer to='profile'>
              <NavDropdown.Item>Abecedný zoznamkníh</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item to='profile'>Božia ekonómia</NavDropdown.Item>
            <NavDropdown.Item to='profile'>Brožúry</NavDropdown.Item>
            <NavDropdown.Item to='profile'>Cirkev</NavDropdown.Item>{' '}
            <NavDropdown.Item to='profile'>Duch</NavDropdown.Item>{' '}
            <NavDropdown.Item to='profile'>Evanjelium</NavDropdown.Item>{' '}
            <NavDropdown.Item to='profile'>Kresťanská prax</NavDropdown.Item>{' '}
            <NavDropdown.Item to='profile'>Kresťanská služba</NavDropdown.Item>{' '}
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
          <LinkContainer to='/video'>
            <Nav.Link className='video-link'>Čitáreň</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/video'>
            <Nav.Link className='video-link'>Info</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/contact'>
            <Nav.Link className='video-link'>Kontakt</Nav.Link>
          </LinkContainer>

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
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
