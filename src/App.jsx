import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "./components/Products";
import Search from "./components/Search";
import Carousels from "./components/Carousels";
import Filter from "./components/Filter";
import Navbars from "./components/Navbars";

import { Container } from "react-bootstrap";
import Cart from "./components/Cart";
import Transactions from "./components/Transactions";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [transact, setTransact] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    };
    const getCategories = async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      setCategories(data);
    };
    const getCart = async () => {
      const res = await fetch("http://localhost:5000/cart");
      const data = await res.json();
      setCart(data);
    };
    const getTransact = async () => {
      const res = await fetch("http://localhost:5000/transactions");
      const data = await res.json();
      setTransact(data);
    };
    getCategories();
    getTasks();
    getCart();
    getTransact();
  }, []);

  const fetchTasksSearch = async (text) => {
    if (typeof text === "undefined" || text === "") {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } else {
      const res = await fetch(`http://localhost:5000/products?q=${text}`);
      const data = await res.json();
      console.log(text);
      setProducts(data);
    }
  };

  const fetchTaskFilter = async (filter) => {
    const res = await fetch(
      `http://localhost:5000/products?category=${filter}`
    );
    const data = await res.json();
    setProducts(data);
  };

  const fetchCart = async (id) => {
    const res = await fetch(`http://localhost:5000/cart/${id}`);
    const data = await res.json();
    return data;
  };

  const addTransact = async (transacts) => {
    // console.log(transacts);
    const res = await fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(transacts),
    });
    var data = await res.json();
    setTransact([...transact, data]);
    transacts.cart.reduce(
      (n = "", { id }) =>
        fetch(`http://localhost:5000/cart/${id}`, {
          method: "DELETE",
        }),
      ""
    );
    // console.log(ids.toString());

    setCart([]);
  };

  const addToCart = async (product) => {
    const checkCart = cart.some((el) => el.id === product.id);
    if (!checkCart) {
      product.total = 1;
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      });
      var data = await res.json();
      data.total = 1;
      setCart([...cart, data]);
    } else {
      const addToTotal = await fetchCart(product.id);
      const updCart = { ...addToTotal, total: addToTotal.total + 1 };
      const res = await fetch(`http://localhost:5000/cart/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updCart),
      });

      const data = await res.json();
      setCart(
        cart.map((cart) =>
          cart.id === product.id ? { ...cart, total: data.total } : cart
        )
      );
    }
  };

  const subsFromCart = async (product) => {
    const addToTotal = await fetchCart(product.id);
    if (addToTotal.total === 1) {
      await fetch(`http://localhost:5000/cart/${addToTotal.id}`, {
        method: "DELETE",
      });
      setCart(cart.filter((cart) => cart.id !== addToTotal.id));
    } else {
      const updCart = { ...addToTotal, total: addToTotal.total - 1 };
      const res = await fetch(`http://localhost:5000/cart/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updCart),
      });
      const data = await res.json();
      setCart(
        cart.map((cart) =>
          cart.id === product.id ? { ...cart, total: data.total } : cart
        )
      );
    }
  };

  const deleteCart = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    });
    setCart(cart.filter((cart) => cart.id !== id));
  };

  return (
    <Router>
      <Navbars onCartClick={handleShow} onTransactClick={handleShow1} />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search onChangeVal={fetchTasksSearch} />
                <Carousels />
                <Filter categories={categories} onFilter={fetchTaskFilter} />
                {/* {showAddTask && <AddTask onAdd={addTask} />} */}

                <div className="row">
                  <h3
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                      textDecoration: "underline",
                    }}
                  >
                    Products
                  </h3>

                  <Transactions
                    show1={show1}
                    handleClose1={handleClose1}
                    placement={"end"}
                    name="end"
                    transact={transact}
                  />
                  <Cart
                    show={show}
                    handleClose={handleClose}
                    cart={cart}
                    addToCart={addToCart}
                    subsFromCart={subsFromCart}
                    deleteCart={deleteCart}
                    addTransact={addTransact}
                    placement={"start"}
                  />
                  {products.length > 0 ? (
                    <Products products={products} onAdd={addToCart} />
                  ) : (
                    "No Tasks to show"
                  )}
                </div>
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
