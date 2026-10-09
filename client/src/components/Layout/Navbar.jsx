import { Menu, User, ShoppingCart, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  
  const {theme, toggleTheme} = useTheme();

  const dispatch = useDispatch();

  const {cart} = useSelector(state => state.cart);
  const cartItemCount = 0;
  if(cart){
    cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  }
  
  return 
  <>
    <nav className="fixed left-0 w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16"></div>
      </div>
    </nav>
  </>;
};

export default Navbar;