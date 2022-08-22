import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
const CartContext = createContext<CartProviderData>({} as CartProviderData);

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

interface CartProps {
  children: ReactNode;
}

interface CartProviderData {
  cart: Product[];
  show: boolean;
  addProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
  showCart: (show: boolean) => void;
}

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [show, setShow] = useState(false);

  const addProduct = (product: Product) => {
    setCart([...cart, product]);
  };

  const deleteProduct = (productToBeDeleted: Product) => {
    const newCart = cart.filter(
      (product) => product.title !== productToBeDeleted.title
    );
    setCart(newCart);
  };

  const showCart = (show: boolean) => {
    setShow(show);
  };

  return (
    <CartContext.Provider
      value={{ cart, show, addProduct, showCart, deleteProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
