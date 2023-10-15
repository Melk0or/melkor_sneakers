import Card from "./components/Cards/Card";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer"
import {useEffect, useState} from "react";

function App() {
    //стейт для массива кроссовок
    const [items, setItems] = useState([]);
    //стейт для отображения корзины
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    //стейт для отображения содержимого корзины
    const [drawerCards, setDrawerCards] = useState([]);
    //высчет
    const price = items.reduce((sum, curr) => sum + curr.price, 0);
    //рендеринг списка кроссовок
    const arrMap = items.map(item => <Card
        name = {item.name}
        price = {item.price}
        url = {item.url}
        onFavorite = {() => console.log("favorite")}
        onAdd = {(name, price, url) => console.log({name, price, url})}
    />)
    //Выгружать список кроссовок с бекенда только при первом рендере страница
    useEffect(() => {
        fetch("https://652acf604791d884f1fd6097.mockapi.io/mainItems")
            .then(res => {
                return res.json();
            })
            .then(newJson => {
                setItems(prevState => prevState = newJson);
            });
    }, []);
    return (
        <div className="wrapper">
            {isOpenDrawer ? <Drawer drawerCards={drawerCards} setIsOpenDrawer={setIsOpenDrawer}/> : null}
            <Header price={price} setIsOpenDrawer={setIsOpenDrawer}/>
            <main className="main">
                <div className="container">
                    <div className="main__inner">
                        <div className="main_inner-title">
                            <h1>Все кроссовки</h1>
                            <div className="search-section">
                                <img src="/image/seacrh.svg" alt="search"/>
                                <input type="search" placeholder="Поиск..." name="search"/>
                            </div>
                        </div>
                        <div className="cards">
                            {arrMap}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
