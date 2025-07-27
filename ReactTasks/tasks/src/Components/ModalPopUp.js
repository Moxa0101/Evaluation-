import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Container, Modal } from 'react-bootstrap';
import '../assets/mp.css';

function ModalPopUp() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.log(err.message));
  }, []);

  const handleView = (post) => {
    setSelectedPost(post);
    setModalShow(true);
  };

  return (
    <Container className='mpctn'>
      <Row>
        {posts.map(post => (
          <Col xs={12} sm={6} md={4} lg={3} key={post.id}>
            <Card className='mpctn1'>
              <Card.Header>User Info.</Card.Header>
              <Card.Body>
                <Card.Title>Post #{post.id}</Card.Title>
                <Card.Text>{post.title}</Card.Text>
                <Button variant="primary" onClick={() => handleView(post)}>View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <PostModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          post={selectedPost}
        />
      </Row>
    </Container>
  );
}

function PostModal({ show, onHide, post }) {
  if (!post) return null;

  return (
    <Modal show={show} onHide={onHide} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Post #{post.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{post.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPopUp;
