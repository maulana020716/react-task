import Carousel from "react-bootstrap/Carousel";
const Carousels = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block "
          style={{ width: "100%", height: "auto" }}
          src="https://www.rucika.co.id/wp-content/uploads/2020/07/Artikel-1a.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          style={{ width: "100%", height: "auto" }}
          src="https://djabesmen.co.id/wp-content/uploads/2018/02/bannerwebrangkametal.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          style={{ width: "100%", height: "auto" }}
          src="https://i2.wp.com/royalboard.co.id/wp-content/uploads/2022/03/Banner-Post-RB-Classic-Artikel-Maret-2022.jpg?fit=1080%2C750&ssl=1"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
