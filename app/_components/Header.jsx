"use client";
import React, { useContext, useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCart";
import CartItemList from "./CartItemList";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [jwt, setJwt] = useState(null);
  const getCartItems = async () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const jwt = localStorage.getItem("jwt");
    const getCartItems = await GlobalApi.getCartItems(id, jwt);
    setTotalCartItem(getCartItems?.length);
    setCartItemList(getCartItems);
  };
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };
  const onDeleteItem = async (id) => {
    const jwt = localStorage.getItem("jwt");
    await GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast("Item Removed!");
      getCartItems();
    });
  };
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const router = useRouter();
  const onSignOut = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  useEffect(() => {
    const LoggedIn = localStorage.getItem("jwt") ? true : false;
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const jwttoken = localStorage.getItem("jwt");
    setUser(userInfo);
    setJwt(jwttoken);
    setIsLoggedIn(LoggedIn);
  }, []);
  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {
    getCartItems();
  }, [updateCart]);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total += element.amount;
    });
    setSubtotal(total);
  }, [cartItemList]);
  return (
    <div className="flex p-5 shadow-md justify-between">
      <div className="flex items-center gap-8">
        <Image src={Logo} alt="app-logo" className="w-[100px] h-[50px]" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer hidden">
              <LayoutGrid />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <DropdownMenuItem key={index}>
                <Link
                  href={`/products-category/${category.name}`}
                  className="flex gap-2 items-center"
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category?.icon[0]?.url
                    }
                    alt={`${category?.icon?.formats?.thumbnail?.name}`}
                    className="w-[24px] h-[24px]"
                    width={24}
                    height={24}
                    unoptimized={true}
                  />
                  <h2>{category.name}</h2>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 mx-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBag />
              <span className="text-green-600 font-semibold">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-green-600 text-white font-bold text-lg p-2">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  key={"cart-itemlist"}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold justify-between">
                  Subtotal <span>$ {subtotal}</span>
                </h2>
                <Button
                  onClick={() => {
                    router.push(jwt ? "/checkout" : "/sign-in");
                  }}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLoggedIn ? (
          <Link href={"/sign-in"}>
            <Button>Log In</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="h-8 w-8 bg-green-50 text-green-600 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Orders</DropdownMenuItem>
              <DropdownMenuItem
                className="font-semibold"
                onClick={() => {
                  onSignOut();
                }}
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
