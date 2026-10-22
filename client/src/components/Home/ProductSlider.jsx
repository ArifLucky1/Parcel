import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductSlider = ({ title, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const dispatch = useDispatch();
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <>
      <section className="py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <div className="flex space-x-2">
            <button onClick={() => scroll("left")} className="p-2 glass-card hover:glow-on-hover animate-smooth">
              <ChevronLeft className="w-6 h-5 text-primary"/>
            </button>
            <button onClick={() => scroll("right")} className="p-2 glass-card hover:glow-on-hover animate-smooth">
              <ChevronRight className="w-6 h-5 text-primary"/>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
          {
            products.map((product) => {
              return (
                <link key={product.id} to={`/product/${product.id}`} className="flex-shrink-0 w-80 glass-card hover:glow-on-hover animate-smooth group">
                  {/* PRODUCT IMAGE */}
                  
                </link>
              )
            })
          }
        </div>



      </section>
    </>
  );
};

export default ProductSlider;
