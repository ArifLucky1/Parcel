import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const { myOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch()
  }, [dispatch]);

  const filterOrders = myOrders.filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter,
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Package className="w-5 h-5 text-yellow-500" />;
        break;
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
        break;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
        break;
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
        break;

      default:
        return <Package className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400";
        break;
      case "Shipped":
        return "bg-blue-500/20 text-blue-400";
        break;
      case "Delivered":
        return "bg-green-500/20 text-green-400";
        break;
      case "Cancelled":
        return "bg-red-500/20 text-red-400";
        break;

      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const statusArray = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const { authUser } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();
  if (!authUser) return navigateTo("/products");

  return (
    <>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track and manage your order history.
            </p>
          </div>

          {/* STATUS FILTER */}
          <div className="glass-card p-4 mb-8">
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-primary" />
                <span className="font-medium">Filter by status: </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {statusArray.map((status) => {
                  return (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${statusFilter === status ? "gradient-primary text-primary-foreground" : "glass-card hover:glow-on-hover text-foreground"}`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ORDERS LIST */}
          {filterOrders.length === 0 ? (
            <div className="text-center glass-panel max-w-md mx-auto ">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No Orders Found
              </h2>
              <p className="text-muted-foreground">
                {statusFilter === "All"
                  ? "You haven't placed any orders yet."
                  : `No orders with status "${statusFilter}" found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">{filterOrders.map((order) => {
              return <div key={order.id} className="glass-card p-6">
                
              </div>
            })}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
