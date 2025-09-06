import React from "react";
import { Container, Row, Col, ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/res-logo.png";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <Container>
        <Row>
          {/* Logo & About */}
          <Col lg="3" md="6" sm="12" className="mb-4">
            <div className="footer__logo text-start">
              <img src={logo} alt="logo" />
              <h5>MyPizza</h5>
              <p>Best pizzas in town, freshly baked with love. Taste the difference!</p>
            </div>
          </Col>

          {/* Delivery Time */}
          <Col lg="3" md="6" sm="12" className="mb-4">
            <h5 className="footer__title">Delivery Time</h5>
            <ListGroup className="footer__list">
              <li className="delivery__time-item">
                <span>Friday - Monday</span>
                <p>9:00am - 11:00pm</p>
              </li>
              <li className="delivery__time-item">
                <span>Tuesday - Wednesday</span>
                <p>Off day</p>
              </li>
            </ListGroup>
          </Col>

          {/* Quick Links */}
          <Col lg="3" md="6" sm="12" className="mb-4">
            <h5 className="footer__title">Quick Links</h5>
            <ul className="footer__links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/pizzas">Foods</Link></li>
              <li><Link to="/Cart">Cart</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg="3" md="6" sm="12" className="mb-4">
            <h5 className="footer__title">Contact</h5>
            <ul className="footer__contact">
              <li>📍 123 Pizza Street, Food City</li>
              <li>📞 +92 300 1234567</li>
              <li>📧 info@mypizza.com</li>
            </ul>
          </Col>
        </Row>

        {/* Bottom */}
        <Row>
          <Col lg="12" className="text-center">
            <div className="footer__bottom">
              <p>© {new Date().getFullYear()} MyPizza. All Rights Reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
