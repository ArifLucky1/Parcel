import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { myOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch()
  }, [dispatch]);

  const filterOrders = myOrders.filter(
    (order) => statusFilter === "all" || order.order_status === statusFilter
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Package className="w-5 h-5 text-yellow-500"/>
        break;
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500"/>
        break;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500"/>
        break;
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500"/>
        break;
    
      default:
        return <Package className="w-5 h-5 text-yellow-500"/>
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400"
        break;
      case "Shipped":
        return "bg-blue-500/20 text-blue-400"
        break;
      case "Delivered":
        return "bg-green-500/20 text-green-400"
        break;
      case "Cancelled":
        return "bg-red-500/20 text-red-400"
        break;
    
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }
  return <></>;
};

export default Orders;
