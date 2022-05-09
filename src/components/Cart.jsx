import { Offcanvas, Row, Col, Image, Button } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { HiPlus, HiMinus } from "react-icons/hi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Cart = ({
  show,
  handleClose,
  cart,
  addToCart,
  subsFromCart,
  deleteCart,
  addTransact,
  placement,
}) => {
  const total = cart.reduce((n, { price, total }) => n + price * total, 0);
  const MySwal = withReactContent(Swal);

  const confirmModal = () => {
    MySwal.fire({
      title: <p>Konfirmasi Pesanan</p>,
      text: "Anda yakin ingin checkout dengan pesanan ini ?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Iya",
    }).then((result) => {
      if (result.isConfirmed) {
        const id = Math.floor(Math.random() * 999);
        const data = {
          id: id,
          cart: cart,
          total: total,
          timestamp: new Date().toLocaleString(),
        };
        addTransact(data);
        return MySwal.fire(
          "Berhasil!",
          "Pesanan anda telah kami catat!",
          "success"
        );
      }
    });
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement={placement}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length > 0 ? (
          <>
            {cart
              .slice(0)
              .reverse()
              .map((product, index) => (
                <Row className="justify-content-md-center" key={index}>
                  <Col xs={6} className="mb-3">
                    <input
                      type="checkbox"
                      value={product.id}
                      className="d-inline"
                      onChange={() => deleteCart(product.id)}
                      checked
                    />
                    <Image
                      src={product.img}
                      thumbnail={true}
                      className="d-inline ml-2"
                      style={{ width: 150, height: "auto", marginLeft: 8 }}
                    />
                  </Col>
                  <Col xs={6} className="text-center">
                    <h3 className="mb-3">{product.name}</h3>
                    <h3 className="mb-4">
                      <CurrencyFormat
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp"}
                      />
                    </h3>
                    <>
                      <Button
                        variant="danger"
                        onClick={() => subsFromCart(product)}
                      >
                        <HiMinus />
                      </Button>
                      <Button variant="light">{product.total}</Button>
                      <Button
                        variant="primary"
                        onClick={() => addToCart(product)}
                      >
                        <HiPlus />
                      </Button>
                    </>
                  </Col>
                </Row>
              ))}
            <Row>
              <Col xs={6} className="mb-3">
                <h3>Total</h3>
              </Col>
              <Col xs={6} className="mb-3 text-center">
                <h3>
                  <CurrencyFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp"}
                  />
                </h3>
              </Col>
            </Row>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={confirmModal}>
                Beli
              </Button>
            </div>
          </>
        ) : (
          <h3>Belum ada produk di keranjang</h3>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
