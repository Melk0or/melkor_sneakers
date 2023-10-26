import React, {useContext} from 'react'
import {useNavigate} from "react-router-dom";
import drawer from "../components/Drawer/Drawer.module.scss";
import AppContext from "../context";


export default function Orders() {
    const navigate = useNavigate();
    const { arrayForOrders } = useContext(AppContext);
    return (
        <main className="main">
            <div className="container">
                <div className="main__inner">
                    {arrayForOrders.length > 0 ?
                        (   <>
                                <div className="main_inner-title" style={{justifyContent: "flex-start", flexDirection: "row"}}>
                                    <img src="/image/backArrow.svg" alt="go Back Button" className="goBackArrow" onClick={() => navigate(-1)}/>
                                    <h1>Мои Покупки</h1>
                                </div>
                                <div className="cards">
                                    {arrayForOrders}
                                </div>
                            </>
                        ):(
                            <>
                                <div className={"favoritesEmpty"}>
                                    <img src="/image/alice.svg" alt="alice edmodji"/>
                                    <h2>У вас нет заказов :(</h2>
                                    <p>Вы ничего еще не купили</p>
                                    <button onClick={() => navigate(-1)}>
                                        Вернуться назад
                                        <img src="/image/arrow.svg" alt="arrow"/>
                                    </button>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </main>
    )
}
