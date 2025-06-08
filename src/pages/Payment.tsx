
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { QrCode, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const orderSummary = {
    items: [
      { title: "Morning Whispers", price: 8500 },
      { title: "Sunset Solitude", price: 12000 }
    ],
    subtotal: 20500,
    shipping: 0,
    total: 20500
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-8 pb-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Card className="border-arteza-blush">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-serif font-bold text-arteza-charcoal mb-4">
                Thank You for Your Purchase!
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Your order has been confirmed and will be carefully prepared for shipping.
                You'll receive updates via email and WhatsApp.
              </p>
              
              <div className="bg-arteza-blush/20 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-arteza-charcoal mb-2">Order #ART2024001</h3>
                <p className="text-sm text-muted-foreground">
                  Expected delivery: 5-7 business days
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  asChild
                  size="lg"
                  className="w-full bg-arteza-indigo text-white hover:bg-arteza-charcoal"
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full border-arteza-blush text-arteza-charcoal hover:bg-arteza-blush"
                >
                  <Link to="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
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
            Secure Checkout
          </h1>
          <p className="text-muted-foreground">
            Complete your purchase safely and securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card className="border-arteza-blush">
                <CardContent className="p-6">
                  <h2 className="text-xl font-serif font-bold text-arteza-charcoal mb-6">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="border-arteza-blush focus:border-arteza-indigo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="border-arteza-blush focus:border-arteza-indigo"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border-arteza-blush">
                <CardContent className="p-6">
                  <h2 className="text-xl font-serif font-bold text-arteza-charcoal mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="border-arteza-blush focus:border-arteza-indigo"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className="border-arteza-blush focus:border-arteza-indigo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                          className="border-arteza-blush focus:border-arteza-indigo"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-arteza-blush">
                <CardContent className="p-6">
                  <h2 className="text-xl font-serif font-bold text-arteza-charcoal mb-6">
                    Payment Method
                  </h2>
                  
                  {/* Payment Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Button
                      type="button"
                      variant={paymentMethod === "upi" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("upi")}
                      className={`h-auto p-4 ${paymentMethod === "upi" ? 
                        "bg-arteza-indigo text-white" : 
                        "border-arteza-blush hover:bg-arteza-blush"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <QrCode className="h-5 w-5" />
                        <span>UPI Payment</span>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className={`h-auto p-4 ${paymentMethod === "card" ? 
                        "bg-arteza-indigo text-white" : 
                        "border-arteza-blush hover:bg-arteza-blush"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card</span>
                      </div>
                    </Button>
                  </div>

                  {/* UPI Payment */}
                  {paymentMethod === "upi" && (
                    <div className="text-center">
                      <div className="bg-white p-4 rounded-lg border border-arteza-blush inline-block mb-4">
                        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-arteza-indigo" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Scan QR code or pay to UPI ID:
                      </p>
                      <p className="font-medium text-arteza-indigo">upasna@paytm</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Amount: ₹{orderSummary.total.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Card Payment */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => setFormData(prev => ({ ...prev, cardName: e.target.value }))}
                          className="border-arteza-blush focus:border-arteza-indigo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          className="border-arteza-blush focus:border-arteza-indigo"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                            placeholder="MM/YY"
                            className="border-arteza-blush focus:border-arteza-indigo"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                            placeholder="123"
                            className="border-arteza-blush focus:border-arteza-indigo"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-arteza-indigo text-white hover:bg-arteza-charcoal"
              >
                Complete Order - ₹{orderSummary.total.toLocaleString()}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-arteza-blush sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-serif font-bold text-arteza-charcoal mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{item.title}</span>
                      <span>₹{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-arteza-indigo">₹{orderSummary.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure SSL encrypted payment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
