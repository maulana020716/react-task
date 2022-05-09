import { Card, Button, Col } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

const Product = ({ product, onAdd }) => {
  return (
    <Col xs={6} className="mb-3">
      <Card>
        <Card.Img variant="top" src={product.img} />
        <Card.Body>
          <Card.Text>{product.name}</Card.Text>
          <Card.Title>
            <CurrencyFormat
              value={product.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp"}
            />
          </Card.Title>
          <Button variant="primary" onClick={() => onAdd(product)}>
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
