import { Table, Button } from "react-bootstrap";
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

const rowVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function TableView({ data, sortKey, sortDirection, toggleSort, navigate }) {
    const getArrow = (key) => {
        if (sortKey !== key) return "↕";
        return sortDirection === "asc" ? "▲" : "▼";
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Table striped bordered hover className="table align-middle mb-0 w-100 mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>
                            <div className="d-flex align-items-center justify-content-between">
                                <span>Name</span>
                                <Button size="sm" variant="outline-light" onClick={() => toggleSort("name")}>
                                    {getArrow("name")}
                                </Button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex align-items-center justify-content-between">
                                <span>Email</span>
                                <Button size="sm" variant="outline-light" onClick={() => toggleSort("email")}>
                                    {getArrow("email")}
                                </Button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex align-items-center justify-content-between">
                                <span>Company</span>
                                <Button size="sm" variant="outline-light" onClick={() => toggleSort("company")}>
                                    {getArrow("company")}
                                </Button>
                            </div>
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <motion.tr key={user.id} variants={rowVariants}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company.name}</td>
                            <td>
                                <Button onClick={() => navigate(`/users/${user.id}`)}>View Details</Button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </Table>
        </motion.div>
    );
}
