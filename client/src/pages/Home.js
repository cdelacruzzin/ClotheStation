import React from "react";
// import Cart from "../components/Cart";
import ProductList from '../components/ProductList';
import CategoryMenu from '../components/CategoryMenu';

const Home = () => {
    return (
        <div className="children">
            <CategoryMenu />
            <ProductList />
        </div>
    );
};
export default Home;