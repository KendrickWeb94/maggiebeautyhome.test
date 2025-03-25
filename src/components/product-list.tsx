import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GradientImg from "../assets/grasient-lg.png";
import AddToCart from './add-to-cart';

export {
    GradientImg
};

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    tags: string; // JSON string
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('http://maggiebeautyhome.kesug.com/get_products.php')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // const addToCart = (product: Product) => {
    //     const storedCart = localStorage.getItem('cart');
    //     const existingCart = storedCart ? JSON.parse(storedCart) : [];
    //     const updatedCart = [...existingCart, product];
    //     localStorage.setItem('cart', JSON.stringify(updatedCart));
    // };

    return (
        <div className='col-span-2 h-fit relative breakpoint:pt-2 ds:pt-8 space-y-6'>
            <h1 className=" inter-tight-600 text-gray-800 text-2xl">
                Our products
            </h1>
            <ul className=' grid-cat-3'>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`} className='space-y-6 hover:scale-105 smooth '>
                            <img src={product.image} alt={product.name} className='h-[250px] rounded-md object-cover w-full' />
                            <div className="space-y-2 pb-2">
                                <h3 className='inter-600'>{product.name}</h3>
                                <p className='text-sm inter-500 text-gray-500'><strong className='text-gray-700 inter-600'>Category</strong> {product.category}</p>
                                <p className='text-sm text-gray-500'><strong className='text-gray-700 inter-600'>Price:</strong> ${product.price.toFixed(2)}</p>
                            </div>
                        </Link>
                        <hr className='pb-2' />

                        <AddToCart product={product} />
                    </li>
                ))}
            </ul>
            <div className="absolute h-[200px] w-full object-cover -translate-y-[6rem]">
                <img src={GradientImg} className="w-full h-full" alt="" />
            </div>
        </div>
    );
};

export default ProductList;