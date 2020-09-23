import { useSelector, useDispatch } from "react-redux";
import Client from "shopify-buy";

const client = Client.buildClient({
	storefrontAccessToken: process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN,
	domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
});

const SHOP_FOUND = "shopify/SHOP_FOUND";
const PRODUCTS_FOUND = "shopify/PRODUCTS_FOUND";
const PRODUCT_FOUND = "shopify/PRODUCT_FOUND";

const initialState = {
	shop: {},
	products: [],
	product: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOP_FOUND:
			return { ...state, shop: action.payload }
		case PRODUCTS_FOUND:
			return { ...state, products: action.payload }
		case PRODUCT_FOUND:
			return { ...state, product: action.payload }
		default:
			return state;
	};
};

function getShop() {
	return (dispatch) => {
		client.shop.fetchInfo().then((payload) => {
			dispatch({
				type: SHOP_FOUND,
				payload,
			});
		});
	};
};

function getProducts() {
	return (dispatch) => {
		client.product.fetchAll().then((payload) => {
			dispatch({
				type: PRODUCTS_FOUND,
				payload,
			});
		});
	};
};

function getProduct(id) {
	return async (dispatch) => {
		const payload = await client.product.fetch(id);
		
		dispatch({
			type: PRODUCT_FOUND,
			payload,
		});

		return payload;
	};
};

export function useShopify() {
	const dispatch = useDispatch();

	const shop = useSelector((app) => app.shopify.shop);
	const products = useSelector((app) => app.shopify.products);
	const product = useSelector((app) => app.shopify.product);

	const fetchShop = () => dispatch(getShop());
	const fetchProducts = () => dispatch(getProducts());
	const fetchProduct = (id) => dispatch(getProduct(id));

	return {
		products,
		product,
		shop,
		fetchProducts,
		fetchProduct,
		fetchShop,
	};
}
