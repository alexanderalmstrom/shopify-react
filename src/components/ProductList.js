import React from "react";
import { useShopify } from "../hooks";

export default (props) => {
	const { products, fetchProduct } = useShopify();

	function handleClick(e, id) {
		e.preventDefault();
		
		fetchProduct(id).then((res) => {
			props.history.push(`/product/${res.id}`);
		});
	};

	return (
		<div className="product-list">
			{products && products.map((product, i) => {
					const image = product.images[0];

					return (
						<div className="product-card" key={product.id + i}>
							{image ? (
								<img src={image.src} alt={product.title} />
							) : null}
							<div>
								<h2 className="product-card__title">{product.title}</h2>
								<p className="product-card__price">${product.variants[0].price}</p>
							</div>
							<button
								className="product-card__link"
								onClick={(e) => handleClick(e, product.id)}
							>
								View product
							</button>
						</div>
					)
				})}
		</div>
	);
};
