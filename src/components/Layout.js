import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShopify } from "../hooks";

export default (props) => {
	const { shop, fetchShop } = useShopify();

	useEffect(fetchShop, []);

	return (
		<Fragment>
			<header className="header">
				<Link to="/" className="logo">{shop.name}</Link>
			</header>
			{props.children}
		</Fragment>
	);
};
