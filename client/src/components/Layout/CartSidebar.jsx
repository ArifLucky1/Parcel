import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../../store/slices/cartSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state.popup);
  const { cart } = useSelector((state) => state.cart);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartQuantity({ id, quantity }));
    }
  };

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }

  if (!isCartOpen) return null;
  return <></>;
};

export default CartSidebar;
