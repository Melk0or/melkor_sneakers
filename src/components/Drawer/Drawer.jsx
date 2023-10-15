import DrawerCard from "./DrawerCards/DrawerCard"
import drawer from "./Drawer.module.scss";
const Drawer = ({drawerCards, setIsOpenDrawer}) => {
    const drawerCardArray = drawerCards.map(item => <DrawerCard name={item.name} price={item.price} url={item.url}/>);
    return (
        <div className={drawer.drawerOverlay}>
            <div className={drawer.drawer}>
                <div className={drawer.drawer__inner}>
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
                            <span>{12999 * 2} руб.</span>
                        </div>
                        <div>
                            <span>Налог 5%: </span>
                            <div></div>
                            <span>1074 руб. </span>
                        </div>
                        <button>
                            Оформить заказ
                            <img src="/image/arrow.svg" alt="arrow"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drawer;
