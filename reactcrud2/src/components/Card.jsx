import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../App.css";

export default function CardList({ data, onDelete, onEdit }) {
  const truncate = (text, maxChars) =>
    text.length <= maxChars ? text : text.slice(0, maxChars) + "...";

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {data.map((item) => (
        <Card key={item.id} style={{ width: "22.5rem" }} className="shadow">
          <Card.Body>
            <Card.Title title={item.title}>
              {item.id})
              {truncate(item.title, 30)}
            </Card.Title>
            <hr />
            <Card.Text title={item.body}>
              {truncate(item.body, 100)}
            </Card.Text>
          </Card.Body>
          <div className="d-flex flex-row ml-20">
          <Button
              variant="danger"
              onClick={() => onDelete(item.id)}
              className="me-2"
            >
              <i className="bi bi-trash3-fill"></i>
            </Button>
            <Button variant="warning" onClick={() => onEdit(item.id)}>
              <i className="bi bi-pencil-fill"></i>
            </Button>
            </div>
        </Card>
      ))}
    </div>
  );
}
