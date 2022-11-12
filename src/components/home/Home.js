import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeLogo from "../../assets/Logo_Home.png";
const Home = () => {
  return (
    <>
      <Container className="intro">
        <Row className="justify-content-md-center gap-5 ">
          <Col md="4" xl="3" className="logo ">
            <img className="homeLogo" src={HomeLogo} alt="Teknik Sipil" />
          </Col>
          <Col md="4" xl="3" className="my-intro align-self-center">
            <h3>Selamat Datang..</h3>
            <p>
              Ini adalah sebuah website penghitung total besi yang akan
              digunakan
            </p>
          </Col>
        </Row>
        <Card className="card">
          <Card.Body>
            <Card.Title>PLAT</Card.Title>
            <Card.Text>Perhitungan Jumlah Besi Pada Plat Atap</Card.Text>
            <Link className="plat" to="/plat">
              Mulai Perhitungan
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;
