import Card from "./components/Cards/Card";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer"
import React, {useEffect, useState} from "react";
import axios, {options, post} from "axios";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
    //стейт для массива кроссовок
    const [items, setItems] = useState([]);
    //стейт для отображения корзины
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    //стейт для отображения содержимого корзины
    const [drawerCards, setDrawerCards] = useState([]);
    //Контролируемыый инпут для поиска
    const [searchValue, setSearchValue] = useState("");
    ///стейт для отображения содержимого закладок
    const [favoriteCards, setFavoriteCards] = useState([]);
    //стейт для отображения загрзки товаров из бэка
    const [isLoading, setIsLoading] = useState(true);
    //высчет тотал прайса корзины
    const price = drawerCards.reduce((sum, curr) => sum + curr.price, 0);

    //Выгружать список кроссовок с бекенда только при первом рендере страница
    useEffect(() => {
        (async function() {
            //Выгружаем кроссовки на основную страницу с помощью феча(аксиос)
            const mainItems = await axios.get("https://652acf604791d884f1fd6097.mockapi.io/mainItems");
            //Выгружаем сохраненные в корзине и в закладках раньше товары через аксиос
            const drawerItems = await axios.get("https://652acf604791d884f1fd6097.mockapi.io/Drawer");
            const favoriteItems = await axios.get("https://652fe5f06c756603295de4fc.mockapi.io/Favorite");
            //установка всех стейтов
            if (mainItems.status === 200 ) {
                setIsLoading(prevState => prevState = false);
            }
            setDrawerCards(prevState => drawerItems.data);
            setFavoriteCards(prevState => favoriteItems.data);
            // new Promise(resolve => {setItems(prevState => mainItems.data)});
            setTimeout(()=> setItems(prevState => mainItems.data), 0);
        })();
    }, []);

    //Интрактивный инпут
    const searchChange = (event) => {
        setSearchValue(prevState => event.target.value);
    }
    //Добавление в корзину
    const onAddToDrawer = async (obj) => {
        console.log(obj);
        //Проверяем есть ли уже такой объект в закладках, если есть, то ничего не добавляем
        let isCopy = true;
        drawerCards.forEach(item => {
            if (item.url === obj.url) isCopy = false;
        })
        if (isCopy) {
            //Сохраняем добавляемые в корзину элементы на беке, чтобы при перезагрузке отобразить их
            await axios.post("https://652acf604791d884f1fd6097.mockapi.io/Drawer", obj);
            //повторный гет запрос из-за отсутствия поля id в элементах корзины, хз, фишка мок апи наверное
            axios.get("https://652acf604791d884f1fd6097.mockapi.io/Drawer").then(res => {
                setDrawerCards(prevState => res.data);
            });
            setDrawerCards(prevState => [...prevState, obj]);
        }
        else {
            console.log((drawerCards.find(item => item.url===obj.url).id), "objID");
            onDeleteFromDrawer(drawerCards.find(item => item.url===obj.url).id);
        }
    }
    //Удаление из корзины
    const onDeleteFromDrawer = (id) => {
        console.log(drawerCards);
        console.log(id, "!_!_!_!_!_!_!")
        axios.delete(`https://652acf604791d884f1fd6097.mockapi.io/Drawer/${id}`);
        setDrawerCards(prevState => prevState.filter(item => item.id !== id));
    }
    const onDeleteFromFavorites = (id) => {
        console.log(id, "------");
        axios.delete(`https://652fe5f06c756603295de4fc.mockapi.io/Favorite/${id}`);
        setFavoriteCards(prevState => prevState.filter(item => item.id !== id));
    }

    const onAddToFavorite = async (obj) => {
        //console.log(obj);
        //Проверяем есть ли уже такой объект в закладках, если есть, то ничего удаляем его из закладок
        let isCopy = true;
        favoriteCards.forEach(item => {
            if (item.url ===  obj.url) isCopy = false;
        })
        if (isCopy) {
            //Сохраняем добавляемые в закладки элементы на беке, чтобы при перезагрузке отобразить их
            await axios.post("https://652fe5f06c756603295de4fc.mockapi.io/Favorite", obj);
            //повторный гет запрос из-за отсутствия поля id в элементах корзины, хз, фишка мок апи наверное
            axios.get("https://652fe5f06c756603295de4fc.mockapi.io/Favorite").then(res => {
                setFavoriteCards(prevState => res.data);
            });
            //сохраняем в массиве
            setFavoriteCards(prevState => [...prevState, obj]);
        }
        else {
            // await axios.get("https://652fe5f06c756603295de4fc.mockapi.io/Favorite").then(res => {
            //     console.log(res.data);
            //     setFavoriteCards(prevState => res.data);
            // });
            //Ищем в массиве закладок элемент с таким же уникальным айди, что и объект, который мы передаем, и удаляем его если он есть
            // console.log(favoriteCards.find(item => item.url===obj.url).uniqId ,favoriteCards.find(item => item.url===obj.url).id)
            onDeleteFromFavorites(favoriteCards.find(item => item.url===obj.url).id);
        }
    }

    //Фильтрация рендеринг списка кроссовок для главной страницы и в зависимости от состояния isLoading нам выведет скелетон или наши карточки
    const arrMapForHome = (isLoading ? [...Array(12)] : items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())))
            .map((item, index) => <Card
                key = {index}
                onFavorite = {onAddToFavorite}
                //Тут обязательно нужно именно ЗАМЕНЯТЬ массив , а не просто пушить как в JS
                onAdd = {onAddToDrawer}
                isLoading = {isLoading}
                added = {drawerCards.some(obj => obj.url === item.url)}
                {...item}
            />)

    //Фильтрация рендеринг списка кроссовок для страницы закладок
    const arrMapForFavorites = favoriteCards
        .map((item, index) => <Card
            key = {index}
            uniqId={item.id}
            name = {item.name}
            price = {item.price}
            url = {item.url}
            onFavorite = {onAddToFavorite}
            //Тут обязательно нужно именно ЗАМЕНЯТЬ массив , а не просто пушить как в JS
            onAdd = {onAddToDrawer}
            isAddedToFavorite = {true}
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
            <Routes>
                <Route
                    path = "/"
                    element=
                    {
                        <Home
                            searchValue={searchValue}
                            searchChange={searchChange}
                            arrMap={arrMapForHome}
                        />
                    }
                />
                <Route
                    path = "/favorites"
                    element=
                    {
                        <Favorites arrMap={arrMapForFavorites}/>
                    }
                />
                <Route
                    path = "/profile"

                />
            </Routes>
        </div>
    );
}

export default App;
