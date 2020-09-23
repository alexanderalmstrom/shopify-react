import React, { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useShopify } from "./hooks"

import Products from "./components/Products"
import ProductPage from "./components/ProductPage"

export default () => {
	const {
		fetchShop,
		fetchProducts,
	} = useShopify();

	useEffect(fetchShop, []);
	useEffect(fetchProducts, []);

	return (
		<Router>
			<div id="app">
				<Route exact path="/" component={Products} />
				<Route path="/product/:id" component={ProductPage} />
			</div>
		</Router>
	)
}
