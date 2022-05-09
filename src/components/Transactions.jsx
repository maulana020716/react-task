import { Offcanvas, Accordion, Row, Col, Image } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

const Transactions = ({ show1, handleClose1, placement, transact }) => {
  return (
    <Offcanvas show={show1} onHide={handleClose1} placement={placement}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Transactions</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Accordion>
          {transact
            .slice(0)
            .reverse()
            .map((transacts, index) => (
              <Accordion.Item eventKey={index} key={transacts.id}>
                <Accordion.Header>{transacts.timestamp}</Accordion.Header>
                <Accordion.Body>
                  {transacts.cart.map((trans) => (
                    <Row className="justify-content-md-center" key={trans.id}>
                      <Col xs={6} className="mb-3">
                        <Image
                          src={trans.img}
                          thumbnail={true}
                          className="d-inline ml-2"
                          style={{ width: 150, height: "auto", marginLeft: 8 }}
                        />
                      </Col>
                      <Col xs={6} className="text-center">
                        <h3 className="mb-3">{trans.name}</h3>
                        <h3 className="mb-4">
                          <CurrencyFormat
                            value={trans.price * trans.total}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp"}
                          />
                        </h3>
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
                          value={transacts.total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp"}
                        />
                      </h3>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Transactions;
