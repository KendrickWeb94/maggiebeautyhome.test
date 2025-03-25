import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TopBar } from "../components/topbar";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "../../node_modules/swiper/swiper.min.css";
import "../../node_modules/swiper/swiper-bundle.css";
import "../../node_modules/swiper/swiper-bundle.min.css";
import clsx from "clsx";
import { getAvailabilityStyles } from "../utils/availabilityStyles";
import { BreadCrumb } from "../components/breadcrumb";
import AddToCart from "../components/add-to-cart";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string;
  availability_status: string;
  rating: string;
  price: any; // Allow any type for price initially
  image: string;
}

interface Review {
  id: number;
  reviewer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `http://localhost/maggiebeautyhome-backend/get_product_details.php?id=${id}`
        )
        .then((response) => {
          setProduct(response.data.product);
          setReviews(response.data.reviews);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  const availabilityStyles = getAvailabilityStyles(
    product.availability_status.toLowerCase()
  );

  // const addToCart = (product: { id: number; name: string; image: string; price: number }) => {
  //   const storedCart = localStorage.getItem('cart');
  //   const existingCart = storedCart ? JSON.parse(storedCart) : [];
  //   const updatedCart = [...existingCart, product];
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  // };

  return (
    <section className="bg-white ">
      <main className="container  mx-auto w-full max-w-[90%]">
        <TopBar />
        <div className="space-y-8 ds:pt-8 mdl:pt-0">
          <BreadCrumb />
          <h1 className=" inter-tight-600 text-gray-800 text-2xl">
            Product details
          </h1>
          <div className="flex ds:flex-wrap breakpoint:flex-nowrap gap-8">
            <img
              src={product.image}
              alt={product.name}
              style={{ height: "450px", objectFit: "cover" }}
              className="ds:max-w-full w-full rounded-md breakpoint:max-w-[450px] "
            />
            <div className="space-y-4 w-full">
              <h2 className="text-3xl inter-600 text-gray-800">
                {product.name}
              </h2>
              <p>
                {" "}
                <span className="text-gray-700 inter-600">
                  Product Category:
                </span>{" "}
                {product.category}
              </p>
              <p>
                {" "}
                <span className="text-gray-700 inter-600">
                  {product.rating}
                </span>{" "}
                Total Ratings
              </p>
              <div
                className={clsx(
                  "badge w-fit",
                  availabilityStyles.bg,
                  availabilityStyles.text,
                  "px-2", // Add some padding
                  "py-1",
                  "rounded-md", // Rounded corners
                  "text-sm", // small text
                  "font-semibold" // bold text.
                )}
              >
                {product.availability_status}
              </div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <p className="text-2xl inter-600 text-gray-900">
                  {typeof product.price === "number"
                    ? `$${product.price.toFixed(2)}`
                    : "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong className="inter-600 text-base">Tags:</strong>{" "}
                  {JSON.parse(product.tags).join(", ")}
                </p>
              </div>
              <div>
                <span className=" inter-600 text-lg underline-offset-8">
                  Product Description
                </span>{" "}
           <br />
                <p className=" text-gray-500 max-w-md inter-400">
                  {product.description}
                </p>
              </div>

              <hr />
              <div className="flex items-center gap-4">
              <AddToCart product={product}  />
                <button className=" flex items-center gap-2 text-gray-800  py-2 px-5 rounded">
                  <Heart size={20} /> Add to wishlist
                </button>
              </div>
              <hr />
            </div>
          </div>
          <section className="space-y-8 py-8">
            <h2 className=" inter-tight-600 text-gray-800 text-2xl">
              Customer Reviews
            </h2>
            <Swiper
              slidesPerView={1.1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 10 },
              }}
              modules={[Pagination]}
              className="mySwiper "
            >
              {reviews.map((review) => (
                <SwiperSlide
                  key={review.id}
                  className="mb-20 p-4 rounded-md  bg-gray-200/50 space-y-4"
                >
                  <div className="w-full flex items-baseline justify-between">
                    <h4 className=" inter-600 text-gray-800">
                      {review.reviewer_name}
                    </h4>
                  </div>
                  <p className=" text-gray-600">{review.review_text}</p>
                  <div className="w-full flex items-baseline justify-between">
                    <p className="text-sm text-gray-500">
                      Date: {new Date(review.review_date).toLocaleDateString()}
                    </p>
                    <p className=" text-gray-700 text-sm">
                      {review.rating} Rating
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>
      </main>
    </section>
  );
};

export default ProductDetails;
