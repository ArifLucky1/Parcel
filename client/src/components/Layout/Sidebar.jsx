// import React from "react";
import {
  X,
  Home,
  Package,
  Info,
  HelpCircle,
  ShoppingCart,
  List,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchBar } from "../../store/slices/popupSlice";

const Sidebar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const menuItems = [];

  const { isSidebarOpen } = useSelector((state) => state.popup)
  if(!isSidebarOpen) return null;
  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => dispatch(toggleSearchBar)} />

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-full w-80 z-50 glass-panel animate-slide-in-left">
        <div className="flex items-center justify-between p-6 border-b border-[hsla(var(--glass-border))] ">
          <h2 className="text-xl font-semibold text-primary">Menu</h2>
          <button onClick={() => dispatch(toggleSearchBar)} className="p-2 rounded-lg glass-card hover:glow-on-hover animate-smooth">
            <X className="w-5 h-5 text-primary"/>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;