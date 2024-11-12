import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDailog from "./ProductItemDailog";

function ProductItem({ product }) {
  return (
    <div className="p-2 md:p-4 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-110 hover:shadow-lg transition-all ease-in-out cursor-pointer">
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.images[0]?.url}
        alt={product.name}
        width={100}
        height={100}
        className="h-[125px] object-contain"
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <div className="flex gap-2">
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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-green-600 hover:text-white hover:bg-green-600"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              <ProductItemDailog asChild product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
