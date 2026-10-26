import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();
    const handleAddToCart = (product, e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(addToCart({product, quantity: 1}));
    };
    
  return <></>;
};

export default ProductCard;