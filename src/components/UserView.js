import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';

export default function UserView({productsData}) {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const productsArr = productsData.map(product => {
			if (product.isActive) {
				return(
					<ProductCard key={product._id} productProp={product} />
				);
			} else {
				return null;
			}
		});
console.log(typeof productsArr)
console.log(typeof productsData)
		setProducts(productsArr);
	}, [productsData]);

	return (
		<>
			{products}
		</>
	);
};