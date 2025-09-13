// Navbar.jsx
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AppNavbar({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    return (
        <div className="container-fluid">
        <Navbar bg="light" expand="lg" className="mb-4 ">
            <>
                <Navbar.Brand>
                    <i className="fas fa-users me-2" style={{ color: "#4f46e5",marginLeft:"18px" }}></i>
                    User Directory
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Button
                        onClick={handleLogout}
                        style={{marginRight:"18px"}}
                    >
                        <i className="fas fa-sign-out-alt me-1"></i> Logout
                    </Button>
                </Nav>
            </>
        </Navbar>
        </div>
    );
}

export default AppNavbar;
