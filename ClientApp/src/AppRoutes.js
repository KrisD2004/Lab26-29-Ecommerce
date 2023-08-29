import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Jewelry } from "./components/Jewelry";
import { Clothes } from "./components/Clothes";
import { HouseAppliances } from "./components/HouseAppliances";
import { Groceries } from "./components/Groceries";
import { Electronics } from "./components/Electronics";
import { Instruments } from "./components/Instruments";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    /*{
        path: '/jewelry',
        element: <Jewelry />
    },
    {
        path: '/clothes',
        element: <Clothes />
    },
    {
        path: '/house appliances',
        element: <HouseAppliances />
    },
    {
        path:'/groceries',
        element: <Groceries />
    },
    {
    path:'/electronics',
    element: <Electronics />
    },
{
    path:'/instruments',
    element: <Instruments />
    }*/
];

export default AppRoutes;
