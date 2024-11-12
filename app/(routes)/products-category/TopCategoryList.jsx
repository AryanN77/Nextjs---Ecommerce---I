import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopCategoryList({ categoryList, selectedCategory }) {
  return (
    <div>
      <div className="flex gap-2 mt-2 overflow-auto md:mx-20 justify-center">
        {categoryList.map((category, index) => (
          <Link
            href={`/products-category/${category.name}`}
            className={` ${
              selectedCategory === category.name &&
              `bg-green-600 text-white hover:bg-green-200 hover:text-green-900`
            } flex flex-col gap-2 items-center bg-green-50 p-2 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px] `}
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
            <h2 className={`${selectedCategory === category.name && ``}`}>
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopCategoryList;
