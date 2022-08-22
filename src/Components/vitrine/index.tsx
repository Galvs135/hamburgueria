import axios, { AxiosResponse } from "axios";
import "./style.css";
import { useEffect, useState } from "react";
import { useCart } from "../../Provider/cart";
import { useAuth } from "../../Provider/auth";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export const Vitrine = () => {
  const history = useNavigate();
  const { cart, addProduct } = useCart();
  const { authToken } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (authToken === "") {
      history("/");
    } else {
      axios
        .get("https://hamburgueria-kenzi.herokuapp.com/products")
        .then((response: AxiosResponse) => setProducts(response.data));
    }
  }, []);

  const handleSubmit = (data: Product) => {
    addProduct(data);
  };

  console.log(cart);
  return (
    <div className="vitrine">
      <ul className="produtosContent">
        {products.map((element, index) => (
          <li key={index} className="screenAll">
            <div className="produtos">
              <figure className="divImg">
                <img src={element.image} className="cardImage" />
              </figure>
              <div className="contentCard">
                <h3 className="cardTitle">{element.title}</h3>
                <span className="cardCategory">{element.category}</span>
                <span className="cardPrice">R$ {element.price}</span>
                <button
                  className="cardADD"
                  onClick={() => handleSubmit(element)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
