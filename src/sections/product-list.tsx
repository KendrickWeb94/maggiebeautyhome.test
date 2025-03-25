
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   tags: string; // JSON string
// }

// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     axios.get('your-php-backend-url/get_products.php')
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Product List</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <Link to={`/${product.id}/product-details`}>
//               <img src={`/images/${product.image}`} alt={product.name} style={{ maxWidth: '100px' }} />
//               <h3>{product.name}</h3>
//               <p>Category: {product.category}</p>
//               <p>Price: ${product.price.toFixed(2)}</p>
//               <p>Tags: {JSON.parse(product.tags).join(', ')}</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;