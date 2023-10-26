import drawer from "./Drawer.module.scss";
import {useContext, useState} from "react";
import AppContext from "../../context";
import Info from "../Info/Info"
import axios from "axios";

const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}


const Drawer = ({ totalPrice, setIsOpenDrawer}) => {
    //Фильтрованный массив элементов корзины из контекста, установщик стейта элементов корзины из контекста, сами элементы корзины, установщик стейта массива покупок
    const { arrMapForDrawer, setDrawerCards, drawerCards, setOrderCards } = useContext(AppContext);
    //стейт для отображения сборки заказа
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    //cтейт дя отображения выгрузки на бек
    const [isLoading, setIsLoading] = useState(false);
    //cтейт для отображения номера заказа
    const [countOfOrder, setCountOfOrder] = useState(0);
    //функция для сборки заказа
    const onClickToCompleteOrder = async () => {
        //включаем загрузку...
        setIsLoading(prevState => prevState = true);
        try {
            //Выгружаем данные элементов корзины в поле items на бэк
            const {data} = await axios.post("https://652fe5f06c756603295de4fc.mockapi.io/Orders", {
                items: drawerCards
            });
            //Гет запрос для отображения элементов покупок без перезагрузки страницы
            axios.get("https://652fe5f06c756603295de4fc.mockapi.io/Orders").then(res => setOrderCards(prevState => res.data));
            //Включаем отображение сборки заказа
            setIsOrderComplete(prevState => prevState = true);
            //Удалеяем элементы корзины из стейта
            setDrawerCards(prevState => prevState = []);
            //Номер заказа по айди , который всегда на один больше предыдущего
            setCountOfOrder(prevState => prevState = data.id);
            //Поочередно удаляем элементы корзины из бэка, потому что PUT почеум то в mockAPI не работает
            for (let i = 0; i < drawerCards.length; i++) {
                await axios.delete(`https://652acf604791d884f1fd6097.mockapi.io/Drawer/${drawerCards[i].id}`);
                await delay(100);
            }
        }
        catch (e) {
            alert(`Не удалось создать заказ ${e}`);
        }
        //отключаем загрузку...
        setIsLoading(prevState => prevState = false);
    }
    //Закрыте окна в случае тыка на кнопку
    const onCloseDrawer = () => {
        setIsOpenDrawer(prevState => !prevState);
        document.querySelector("body").style.overflow = "auto";
    }
    return (
        <div className={drawer.drawerOverlay}>
            <div className={drawer.drawer}>
                <div className={drawer.drawer__inner}>
                    {arrMapForDrawer.length === 0 ? (
                        <Info onCloseDrawer={onCloseDrawer}
                              isOrderComplete={isOrderComplete}
                              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"}
                              description={isOrderComplete ? `Ваш заказ #${countOfOrder} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                              url={isOrderComplete ? "/image/order-complete.svg" : "/image/emptyBox.svg"}
                        />
                    ) : (
                        <>
                            <div className={drawer.drawer__title}>
                                <h2>Корзина</h2>
                                <img src="/image/delete.svg" alt="CloseDrawer" onClick={onCloseDrawer}/>
                            </div>
                            <div className={drawer.drawerCards}>
                                {arrMapForDrawer}
                            </div>
                            <div className={drawer.drawerTotalPrice}>
                                <div>
                                    <span>Итого: </span>
                                    <div></div>
                                    <span>{totalPrice} руб.</span>
                                </div>
                                <div>
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <span>{totalPrice/20} руб. </span>
                                </div>
                                <button onClick={onClickToCompleteOrder} disabled={isLoading}>
                                    Оформить заказ
                                    <img src="/image/arrow.svg" alt="arrow"/>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Drawer;
