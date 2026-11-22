import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
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
  return <></>;
};

export default Payment;
