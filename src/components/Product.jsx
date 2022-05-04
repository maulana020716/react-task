import { Card, Button } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

const Product = ({ product, onAdd }) => {
  return (
    <div className="col-md-3 col-6" style={{ marginBottom: 10 }}>
      {/* <Link to={`/detail/${product.id}`}> */}
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
      {/* </Link> */}
    </div>
  );
};

export default Product;
