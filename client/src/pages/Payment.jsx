import { useState, useEffect } from "react";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const { authUser } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();
  if (!authUser) return navigateTo("/products");

  const [stripePromise, setStripePromise] = useState(null);
  useEffect(() => {
    loadStripe(
      "pk_test_51UMSMJDJWLyI8rX01gz6KQTRqaBgIye9KlOHNqTP0r6ijW4usFKMeZHwKbCnLU43NRN6WWLZkl0qlzOtoK60UU5b00MNzmirrQ",
    )
      .then((stripe) => setStripePromise(stripe))
      .catch((err) => console.log(err));
  }, []);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { orderStep } = useSelector((state) => state.order);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    state: "Delhi",
    Phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "India",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let totalWithTax = total + total * 0.18;

  if(total > 50){
    totalWithTax += 2
  }
  return <></>;
};

export default Payment;
