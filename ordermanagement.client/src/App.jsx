import { Routes, Route } from "react-router-dom";
import Store from "./pages/Store";
import Orders from "./pages/orders/Orders";
export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Store />} />
            <Route path='orders' element={<Orders />} />
        </Routes>
    );
}
