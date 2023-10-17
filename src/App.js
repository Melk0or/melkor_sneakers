import Card from "./components/Cards/Card";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer"
import {useEffect, useState} from "react";
import axios, {options, post} from "axios";

function App() {
    //стейт для массива кроссовок
    const [items, setItems] = useState([]);
    //стейт для отображения корзины
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    //стейт для отображения содержимого корзины
    const [drawerCards, setDrawerCards] = useState([]);
    //Контролируемыый инпут для поиска
    const [searchValue, setSearchValue] = useState("");

    //высчет
    const price = drawerCards.reduce((sum, curr) => sum + curr.price, 0);

    //Выгружать список кроссовок с бекенда только при первом рендере страница
    useEffect(() => {
        //Выгружаем кроссовки на основную страницу с помощью феча
        fetch("https://652acf604791d884f1fd6097.mockapi.io/mainItems")
            .then(res => {
                return res.json();
            })
            .then(newJson => {
                setItems(prevState => prevState = newJson);
            });
        //Выгружаем сохраненные в корзине раньше товары через аксиос
        axios.get("https://652acf604791d884f1fd6097.mockapi.io/Drawer").then(res => {
            setDrawerCards(prevState => res.data);
        })
    }, []);

    const searchChange = (event) => {
        setSearchValue(prevState => event.target.value);
    }
    //Добавление в корзину
    const onAddToDrawer = async (obj) => {
        //Сохраняем добавляемые в корзину элементы на беке, чтобы при перезагрузке отобразить их
        await axios.post("https://652acf604791d884f1fd6097.mockapi.io/Drawer", obj);
        //повторный гет запрос из-за отсутствия поля id в элементах корзины, хз, фишка мок апи наверное
        axios.get("https://652acf604791d884f1fd6097.mockapi.io/Drawer").then(res => {
            setDrawerCards(prevState => res.data);
        });
        setDrawerCards(prevState => [...prevState, obj]);
    }
    //Удаление из корзины
    const onDeleteFromDrawer = (id) => {
        axios.delete(`https://652acf604791d884f1fd6097.mockapi.io/Drawer/${id}`);
        setDrawerCards(prevState => prevState.filter(item => item.id !== id));
    }

    //Фильтрация рендеринг списка кроссовок
    const arrMap = items
        .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((item, index) => <Card
            key = {index}
            name = {item.name}
            price = {item.price}
            url = {item.url}
            onFavorite = {() => console.log("favorite")}
            //Тут обязательно нужно именно ЗАМЕНЯТЬ массив , а не просто пушить как в JS
            onAdd = {onAddToDrawer}
        />)

    return (
        <div className="wrapper">
            {isOpenDrawer ? <Drawer
                totalPrice = {price}
                drawerCards = {drawerCards}
                setIsOpenDrawer = {setIsOpenDrawer}
                onDelete ={onDeleteFromDrawer}/> : null
            }
            <Header price={price} setIsOpenDrawer={setIsOpenDrawer}/>
            <main className="main">
                <div className="container">
                    <div className="main__inner">
                        <div className="main_inner-title">
                            <h1>{searchValue === "" ? "Все кроссовки" : "Поиск по запросу: " + `"${searchValue}"` }</h1>
                            <div className="search-section">
                                <img src="/image/seacrh.svg" alt="search"/>
                                <input onChange={searchChange} type="search" placeholder="Поиск..." name="search" maxLength={40}/>
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
