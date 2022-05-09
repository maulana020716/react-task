import Card from "react-bootstrap/Card";
const Filter = ({ categories, onFilter }) => {
  return (
    <div className="row" style={{ marginTop: 10, marginBottom: 10 }}>
      <h3
        style={{
          marginBottom: 10,
          marginTop: 10,
          textDecoration: "underline",
        }}
      >
        Filter by category
      </h3>
      {categories.map((category, index) => (
        <div
          className="col-3"
          key={category.id}
          onClick={() => onFilter(category.name)}
        >
          <Card>
            <Card.Img variant="top" src={category.img} />
            <Card.Body>
              <Card.Text style={{ textAlign: "center" }}>
                {category.name}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Filter;
