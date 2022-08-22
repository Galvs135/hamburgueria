import "./style.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Provider/auth";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";

export const Header = () => {
  const { Logout, userName } = useAuth();
  return (
    <div className="upperBar">
      <section className="name">
        <h2 className="firstName">Burguer</h2>
        <h4 className="secondName">Kenzie</h4>
      </section>
      <h2 className="user">{userName}</h2>
      <section className="infos">
        <Link to="/vitrine" className="store">
          <IoStorefrontSharp />
        </Link>
        <Link to="/cart" className="cart">
          <MdLocalGroceryStore />
        </Link>
        <button onClick={Logout} className="btnSair">
          <IoExit />
        </button>
      </section>
    </div>
  );
};
