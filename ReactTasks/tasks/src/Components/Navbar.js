import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link}  from 'react-router-dom';

function Navbar2() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to='/'  style={{margin:'10px'}}>Home</Nav.Link>
            <Nav.Link as={Link} to='/Counter' style={{margin:'10px'}}>Counter</Nav.Link>
            <Nav.Link as={Link} to='/TodoList' style={{margin:'10px'}}>TodoList</Nav.Link>
            <Nav.Link as={Link} to='/JsonParsing'  style={{margin:'10px'}}>JsonParsing</Nav.Link>
            <Nav.Link as={Link} to='/Form' style={{margin:'10px'}}>Form</Nav.Link>
            <Nav.Link as={Link} to='/FetchApi' style={{margin:'10px'}}>FetchApi</Nav.Link>
            <Nav.Link as={Link} to='/ModalPopUp'  style={{margin:'10px'}}>ModalPopUp</Nav.Link>
            <Nav.Link as={Link} to='/Sort' style={{margin:'10px'}}>Sort</Nav.Link>
            <Nav.Link as={Link} to='/Charts' style={{margin:'10px'}}>Charts</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>
  );
}

export default Navbar2;