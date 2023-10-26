import React from 'react'
import drawer from "../Drawer/Drawer.module.scss";

export default function Info({onCloseDrawer,  isOrderComplete, title, description, url}) {
    return (
        <>
            <div className={drawer.drawer__title}>
                <h2>Корзина</h2>
                <img src="/image/delete.svg" alt="CloseDrawer" onClick={onCloseDrawer}/>
            </div>
            <div className={drawer.drawerEmpty}>
                <img src={url} alt={url.substring(7, 20)}/>
                <h2 style={isOrderComplete ? {color:" rgba(135, 194, 10, 1)"} : {color: "rgba(0, 0, 0, 1)"}}>{title}</h2>
                <p>{description}</p>
                <button onClick={onCloseDrawer}>
                    Вернуться назад
                    <img src="/image/arrow.svg" alt="arrow"/>
                </button>
            </div>
        </>
    )
}
