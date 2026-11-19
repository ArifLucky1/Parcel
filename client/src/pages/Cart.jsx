import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      updateCartQuantity({ id, quantity });
    }
  };

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
  return <></>;
};

export default Cart;
