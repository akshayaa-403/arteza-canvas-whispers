
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Morning Whispers",
      price: 8500,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      size: "12x16 inches",
      medium: "Acrylic on Canvas",
      quantity: 1
    },
    {
      id: 2,
      title: "Sunset Solitude",
      price: 12000,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      size: "16x20 inches",
      medium: "Oil on Canvas",
      quantity: 1
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 15000 ? 0 : 500;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-serif font-bold text-arteza-charcoal mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Discover beautiful artworks that speak to your soul
          </p>
          <Button 
            asChild
            className="bg-arteza-indigo text-white hover:bg-arteza-charcoal"
          >
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-arteza-charcoal mb-2">
            Your Cart
          </h1>
          <p className="text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-arteza-blush">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="relative w-full md:w-48 h-48 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-serif font-semibold text-arteza-charcoal mb-1">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-1">
                            {item.size} • {item.medium}
                          </p>
                          <p className="text-lg font-bold text-arteza-indigo">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Quantity:</span>
                        <div className="flex items-center border border-arteza-blush rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-arteza-blush sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-serif font-bold text-arteza-charcoal mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <div className="text-sm text-green-600">
                      Free shipping on orders over ₹15,000
                    </div>
                  )}
                  <div className="border-t border-arteza-blush pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-arteza-indigo">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    asChild
                    size="lg"
                    className="w-full bg-arteza-indigo text-white hover:bg-arteza-charcoal"
                  >
                    <Link to="/payment">Proceed to Payment</Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush"
                  >
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-arteza-blush">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                        ✓
                      </Badge>
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-blue-200 text-blue-700 text-xs">
                        ✓
                      </Badge>
                      <span>Carefully Packaged</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-purple-200 text-purple-700 text-xs">
                        ✓
                      </Badge>
                      <span>Pan-India Shipping</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
