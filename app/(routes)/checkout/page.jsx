"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Checkout() {
  const [user, setUser] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  const [totalAmount, setTotalAmount] = useState(0);

  const getCartItems = async () => {
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
    const getCartItems = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(getCartItems?.length);
    setCartItemList(getCartItems);
  };
  const calculateTotalAmount = () => {
    const TotalAmount = subtotal + subtotal * 0.09 + 15;
    return TotalAmount.toFixed(2);
  };

  useEffect(() => {
    const userName = JSON.parse(localStorage.getItem("user"));
    const jwttoken = localStorage.getItem("jwt");
    setUser(userName);
    setJwt(jwttoken);
  }, []);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total += element.amount;
    });
    setTotalAmount(parseFloat(total * 1.09 + 15.0));
    setSubtotal(total);
  }, [cartItemList]);

  useEffect(() => {
    setTotalAmount(subtotal * 1.09 + 15);
  }, [subtotal]);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      router.push("/sign-in");
    }
    getCartItems();
  }, []);
  const onApprove = (data) => {
    console.log(data);

    const payload = {
      data: {
        paymentId: data.paymentId,
        totalOrderAmount: totalAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList,
        userId: user.id,
      },
    };

    GlobalApi.createOrder(payload, jwt).then((res) => {
      console.log(res);
      cartItemList.forEach((item, index) => {
        GlobalApi.deleteCartItem(item.id).then((resp) => {});
      });
      router.replace("/order-confirmation");
    });
  };
  return (
    <div>
      <h2 className="p-3 bg-green-600 text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8 mb-4">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid md:grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subtotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax(9%): <span>${subtotal * 0.09}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${calculateTotalAmount()}</span>
            </h2>
            {/* <Button>
              Payment <ArrowBigRight />
            </Button> */}
            <PayPalButtons
              style={{ layout: "horizontal" }}
              onApprove={onApprove}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
