import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/auth";
import { useCart } from "../../Provider/cart";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export const Cart = () => {
  const history = useNavigate();
  const { authToken } = useAuth();
  const { cart, deleteProduct } = useCart();

  const handleDelete = (data: Product) => {
    deleteProduct(data);
  };

  useEffect(() => {
    if (authToken === "") {
      history("/");
    }
  }, []);

  return (
    <div className="vitrine">
      <ul className="produtosContent">
        {cart.map((element, index) => (
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
                  onClick={() => handleDelete(element)}
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
