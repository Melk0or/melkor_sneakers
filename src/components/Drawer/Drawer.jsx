import DrawerCard from "./DrawerCards/DrawerCard"
import drawer from "./Drawer.module.scss";
const Drawer = ({ totalPrice, drawerCards, setIsOpenDrawer, onDelete}) => {
    //рендеринг элементов корзины
    const drawerCardArray = drawerCards.map(item => <DrawerCard props = {item} onDelete = {onDelete}/>);
    //Закрыте окна в случае тыка на кнопку
    const onCloseDrawer = () => {
        setIsOpenDrawer(prevState => !prevState);
        document.querySelector("body").style.overflow = "auto";
    }
    return (
        <div className={drawer.drawerOverlay}>
            <div className={drawer.drawer}>
                <div className={drawer.drawer__inner}>
                    {drawerCards.length === 0 ? (
                        <>
                            <div className={drawer.drawer__title}>
                                <h2>Корзина</h2>
                                <img src="/image/delete.svg" alt="CloseDrawer" onClick={onCloseDrawer}/>
                            </div>
                            <div className={drawer.drawerEmpty}>
                                <img src="/image/emptyBox.svg" alt="empty Box"/>
                                <h2>Корзина пуста</h2>
                                <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                                <button onClick={onCloseDrawer}>
                                    Вернуться назад
                                    <img src="/image/arrow.svg" alt="arrow"/>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={drawer.drawer__title}>
                                <h2>Корзина</h2>
                                <img src="/image/delete.svg" alt="CloseDrawer" onClick={() => {
                                setIsOpenDrawer(prevState => !prevState);
                                document.querySelector("body").style.overflow = "auto";
                            }}/>
                            </div>
                            <div className={drawer.drawerCards}>
                                {drawerCardArray}
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
                                <button>
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
