import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop By Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
        {categoryList.map((category, index) => (
          <Link
            href={`products-category/${category.name}`}
            className="flex flex-col gap-2 items-center bg-green-50 p-2 rounded-lg group cursor-pointer hover:bg-green-200"
            key={index}
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                category?.icon[0]?.url
              }
              alt={`${category?.icon?.formats?.thumbnail?.name}`}
              width={50}
              height={50}
              className="group-hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-green-800">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
