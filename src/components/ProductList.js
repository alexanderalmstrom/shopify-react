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
						<div
							className="product-card"
							key={product.id + i}
							onClick={(e) => handleClick(e, product.id)}>
							{image ? (
								<img
									className="product-card__image"
									src={image.src}
									alt={product.title}
								/>
							) : null}
							<div className="product-card__info">
								{product.title && (
									<h2 className="product-card__title">{product.title}</h2>
								)}
								{product.variants && (
									<p className="product-card__price">${product.variants[0].price}</p>
								)}
							</div>
						</div>
					)
				})}
		</div>
	);
};
