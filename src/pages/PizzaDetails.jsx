import React, { useState, useEffect } from "react";
import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ExtraIngredient from "../components/ExtraIngredient/ExtraIngredient.jsx";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";
import "../styles/product-card.css";

import ProductCard from "../components/UI/product-card/ProductCard";

const ExtraIngredients = {
  MUSHROOMS: "Mushrooms",
  ONION: "Onion",
  PEPPER: "Pepper",
  PINAPPLE: "Pinapple",
  TUNA: "Tuna",
  MEAT: "Meat",
  CHEESE: "Cheese",
  HOTSAUCE: "Hot Sauce",
  CORN: "Corn",
};

const PizzaDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const product = products.find((product) => product.id === id);

  // ✅ Hooks must be at top, not conditional
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [isUpdateNotificationDisplayed, setIsUpdateNotificationDisplayed] =
    useState(false);
  const [previewImg, setPreviewImg] = useState(product?.image01 || "");

  useEffect(() => {
    if (!product) return; // safe guard
    setPreviewImg(product.image01);
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const existingPizza = cartProducts.find((item) => item.id === id);
    if (existingPizza && Array.isArray(existingPizza.extraIngredients)) {
      setExtraIngredients(existingPizza.extraIngredients);
    } else {
      setExtraIngredients([]);
    }
  }, [cartProducts, id, product]);

  // ✅ product not found UI
  if (!product) {
    return (
      <Helmet title="Not Found">
        <CommonSection title="Product Not Found" />
        <section className="p-5 text-center">
          <h2>Sorry, this product does not exist.</h2>
        </section>
      </Helmet>
    );
  }

  const { title, price, category, desc, image01 } = product;
  const relatedProduct = products.filter(
    (item) => category === item.category && item.id !== id
  );

  const addItem = () => {
    setIsUpdateNotificationDisplayed(true);
    setTimeout(() => {
      setIsUpdateNotificationDisplayed(false);
    }, 3000);

    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
        extraIngredients: extraIngredients || [],
      })
    );
  };

  function updateExtraIngredients(ingredient) {
    if (extraIngredients.includes(ingredient)) {
      setExtraIngredients(extraIngredients.filter((item) => item !== ingredient));
    } else {
      setExtraIngredients((prev) => [...prev, ingredient]);
    }
  }

  return (
    <Helmet title="Product-details">
      {isUpdateNotificationDisplayed && (
        <div className="updateCartNotifiation">
          <span>You successfully updated your cart!</span>
        </div>
      )}

      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            {/* Left thumbnails */}
            <Col lg="2" md="2">
              <div className="product__images">
                {[product.image01, product.image02, product.image03].map(
                  (img, idx) =>
                    img && (
                      <div
                        className="img__item mb-3"
                        key={idx}
                        onClick={() => setPreviewImg(img)}
                      >
                        <img src={img} alt="" className="w-50" />
                      </div>
                    )
                )}
              </div>
            </Col>

            {/* Main Image */}
            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            {/* Details */}
            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  Price: <span>${price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCART__btn">
                  {cartProducts.find((item) => item.id === id)
                    ? "Update Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </Col>

            {/* Extra Ingredients */}
            <Col lg="12">
              <div className="extraIngredientsGrid">
                {Object.values(ExtraIngredients).map((ingredient) => (
                  <ExtraIngredient
                    key={ingredient}
                    isChecked={extraIngredients.includes(ingredient)}
                    onSelect={() => updateExtraIngredients(ingredient)}
                    ingredient={ingredient}
                  />
                ))}
              </div>
            </Col>

            {/* Description */}
            <Col lg="12">
              <h6 className="description">Description</h6>
              <div className="description__content">
                <p>{desc}</p>
              </div>
            </Col>

            {/* Related Products */}
            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col
                lg="3"
                md="4"
                sm="6"
                xs="6"
                className="mb-4"
                key={item.id}
              >
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PizzaDetails;
