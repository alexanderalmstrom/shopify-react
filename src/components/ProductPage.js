import React, { useEffect } from "react"
import { useShopify } from "../hooks"

import Layout from './Layout';

export default (props) => {
	const {
		product,
		fetchProduct,
	} = useShopify();

	const { id } = props.match.params;
	const description = product.description && product.description.split(".");

	useEffect(() => {
		fetchProduct(id);
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Layout>
			<div className="product-page">
				<div className="product-page__images">
					{product.images &&
						product.images.map((image, i) => {
							return (
								<img key={image.id + i} src={image.src} alt={product.title} />
							)
						})}
				</div>
				<div className="product-page__info">
				{product.title && (
					<h1 className="product-page__title">{product.title}</h1>
				)}
				{product.variants && (
					<p className="product-page__price">${product.variants[0].price}</p>
				)}
					<ul className="product-page__desc">
						{description && description.map((desc, i) => {
							return desc && <li key={`desc${i}`}>{desc}</li>
						})}
					</ul>
				</div>
			</div>
		</Layout>
	)
}
