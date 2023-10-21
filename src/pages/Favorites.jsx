import React from 'react'
import {useNavigate} from "react-router-dom";
import drawer from "../components/Drawer/Drawer.module.scss";


export default function Favorites({arrMap}) {
    const navigate = useNavigate()
    return (
        <main className="main">
            <div className="container">
                <div className="main__inner">
                    {arrMap.length > 0 ?
                        (   <>
                                <div className="main_inner-title" style={{justifyContent: "flex-start", flexDirection: "row"}}>
                                    <img src="/image/backArrow.svg" alt="go Back Button" className="goBackArrow" onClick={() => navigate(-1)}/>
                                    <h1>Мои Закладки</h1>
                                </div>
                                <div className="cards">
                                    {arrMap}
                                </div>
                            </>
                        ):(
                            <>
                                <div className={"favoritesEmpty"}>
                                    <img src="/image/sadEmodji.png" alt="sad edmodji"/>
                                    <h2>Закладок нет :(</h2>
                                    <p>Вы ничего не добавляли в закладки</p>
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
