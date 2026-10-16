import { useState, useEffect } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleAuthPopup } from "../../store/slices/popupSlice";
import { forgotPassword } from "../../store/slices/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { authUser, isSigningUp, isLoggingIn, isRequestingForToken } =
    useSelector((state) => state.auth);
  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  const [mode, setMode] = useState("signin");      // signin | signup | forgot | reset
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  // Detect reset password URL and open popup with reset mode

  useEffect(() => {
    if(location.pathname.startsWith("/password/reset/")){
      setMode("reset");
      dispatch(toggleAuthPopup())
    }
  }, [location.pathname, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("email", formData.email)
    data.append("password", formData.password)

    if(mode === "signup") data.append("name", formData.name);

    if(mode === "forgot"){
      dispatch(forgotPassword({email: formData.email})).then(() => {
        dispatch(toggleAuthPopup());
        setMode("signin");
      });
      return
    }
  }

  return <></>;
};

export default LoginModal;
