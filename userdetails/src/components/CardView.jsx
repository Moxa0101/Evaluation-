import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "../App.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 ,transition: { duration: 0.5 } }
};

export default function CardView({ data, navigate }) {
  return (
    <motion.div className="container-fluid" variants={containerVariants} initial="hidden" animate="visible">
      <div className="row">
        {data.map((user) => (
          <motion.div
            key={user.id}
            className="col-sm-12 col-md-6 col-lg-4 mb-3 d-flex justify-content-center"
            variants={cardVariants}
          >
            <Card className="modern-user-card">
              <Card.Body className="d-flex align-items-center">
                <div className="user-id-circle">{user.id}</div>
                <div className="user-info-container">
                  <div className="user-name">{user.name}</div>
                  <div className="user-details">
                    <div className="user-detail">
                      <i className="far fa-envelope"></i>
                      {user.email}
                    </div>
                    <div className="company-tag">
                      <i className="far fa-building"></i> {user.company.name}
                    </div>
                  </div>
                </div>
                <Button className="view-details-btn" onClick={() => navigate(`/users/${user.id}`)} title="View full details">
                  <i className="bi bi-eye"></i>
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
