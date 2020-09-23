import React from "react";
import ProductList from "./ProductList";

import Layout from './Layout';

export default (props) => {
	return (
		<Layout>
			<ProductList history={props.history} />
		</Layout>
	);
};
