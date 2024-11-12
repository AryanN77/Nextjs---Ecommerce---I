"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCart";

function ProductItemDailog({ product }) {
  const jwt = localStorage.getItem("jwt");
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.mrp
  );
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addtoCart = () => {
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: JSON.parse(localStorage.getItem("user")).id,
        userId: JSON.parse(localStorage.getItem("user")).id,
      },
    };
    GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        toast("Added to Cart");
        setUpdateCart(!updateCart);
        setLoading(false);
      },
      (e) => {
        toast("Error Occured While adding to Cart");
        setLoading(false);
      }
    );
  };
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.images[0]?.url}
        alt={product.name}
        width={100}
        height={100}
        className="h-[125px] object-contain bg-slate-200 p-3 rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold ">{product.name}</h2>
        <p className="text-sm font-medium text-gray-500">
          {product.description}
        </p>
        <div className="flex gap-2 text-xl">
          <span className="font-medium">Price: </span>
          {product.sellingPrice && <h2>${product.sellingPrice}</h2>}
          <h2
            className={`font-semibold ${
              product.sellingPrice && "line-through text-gray-400"
            } `}
          >
            ${product.mrp}
          </h2>
        </div>
        <h2 aschild className="font-medium text-lg">
          Quantity ({product.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 items-center px-3">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2> Total: ${(quantity * productTotalPrice).toFixed(2)}</h2>
          </div>
          <Button
            className="flex gap-3"
            onClick={() => {
              addtoCart();
            }}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.categories[0].name}
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDailog;
