import Product from "./Product";

const Products = ({ products, onAdd, onToggle }) => {
  return (
    <>
      {products.map((product, index) => (
        <Product
          key={index}
          product={product}
          onAdd={onAdd}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Products;
