import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function CartItemList({ cartItemList, onDeleteItem }) {
  return (
    <div>
      <div className="h-[500px] overflow-auto">
        {cartItemList.map((item, index) => (
          <div
            className="flex justify-between items-center p-2 mb-5"
            key={index}
          >
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + item.image}
                alt={item.name}
                width={80}
                height={80}
                className="border p-2"
              />
              <div className="">
                <h2 className="font-bold">{item.name}</h2>
                <h2 className="">Quantity {item.quantity}</h2>
                <h2 className="text-lg font-bold">$ {item.amount}</h2>
              </div>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => {
                onDeleteItem(item.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;
