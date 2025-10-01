import { useEffect, useState, useContext } from "react";
import { useParams , useNavigate  } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Pagination from "./Pagination";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import Spinner from "react-bootstrap/Spinner";
import { useData } from "./DataContext";

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [cardPerPage, setCardPerPage] = useState(3);
    const [search, setSearch] = useState('');
    const { data } = useData();

    useEffect(() => {
        if ( data && data.length > 0) {
            const foundUser = data.find(u => String(u.id) === id);
            setUser(foundUser || null);
        }
    }, [id, data]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(res => res.json())
            .then(setPosts)
            .catch(console.error);
    }, [id]);

    if (!user)
        return (
            <div className="loading-container">
                <Spinner animation="border" variant="light" />
            </div>
        );

    const filteredData = posts.filter((post) =>
        (post.title?.toLowerCase().trim().includes(search.toLowerCase().trim())) ||
        (post.body?.toLowerCase().trim().includes(search.toLowerCase().trim()))
    );

    const startIndex = (page - 1) * cardPerPage;
    const endIndex = startIndex + cardPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <div className="container">
            <Card className="p-3 m-3">
                <Card.Body className="d-flex align-items-center">
                    <Button
                        variant="outline-secondary"
                        onClick={()=>{navigate(-1)}}
                        className="me-3 back-button"
                    >
                        <i className="bi bi-caret-left-fill"></i>
                    </Button>
                    <div className="user-info-container">
                        <div className="user-name">{user.name}</div>
                        <div className="user-details">
                            <div className="user-detail">
                                <i className="far fa-envelope"></i>
                                {user.email}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-end">
                <input type="text" placeholder="Search here..." style={{ marginRight: "15px" }}
                    value={search}
                    onInput={(e) => setSearch(e.target.value)} />
            </div>

            <motion.div
                className="d-flex flex-wrap flex-row"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredData.length > 0 ? (
                    currentData.map((post) => (
                        <motion.div
                            key={post.id}
                            variants={cardVariants}
                            className="col-lg-4 col-md-6 col-sm-12 d-flex"
                        >
                            <Card
                                className="p-3 m-2 shadow"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    minHeight: "250px"
                                }}
                            >
                                <Card.Title>
                                    <span style={{ color: "#4f46e5", fontSize: "25px" }}>Title:</span>
                                    {post.title}
                                </Card.Title>
                                <Card.Text>
                                    <h5 style={{ color: "#4f46e5" }}>Description:</h5>
                                    {post.body}
                                </Card.Text>
                            </Card>
                        </motion.div>

                    ))
                ) : (
                    <div className="text-center w-100 my-5">
                        <h4 style={{ color: "red", fontSize: "24px" }}>No data found</h4>
                    </div>
                )}
            </motion.div>


            {
                filteredData.length > 0 && (
                    <div className="paginationCtn">
                        <Form.Select
                            style={{ maxWidth: "100px", zIndex: "2" }}
                            value={cardPerPage}
                            onChange={(e) => {
                                setCardPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>All</option>
                        </Form.Select>

                        <div className="pagesToShow">
                            <Pagination
                                total={filteredData.length}
                                cardPerPage={cardPerPage}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                )
            }
        </div >
    );
}
