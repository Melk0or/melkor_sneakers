import React, {useContext} from 'react'
import {useNavigate} from "react-router-dom";
import drawer from "../components/Drawer/Drawer.module.scss";
import AppContext from "../context";


export default function Favorites() {
    const navigate = useNavigate()
    const { arrMapForFavorites } = useContext(AppContext);
    return (
        <main className="main">
            <div className="container">
                <div className="main__inner">
                    {arrMapForFavorites.length > 0 ?
                        (   <>
                                <div className="main_inner-title" style={{justifyContent: "flex-start", flexDirection: "row"}}>
                                    <img src="/image/backArrow.svg" alt="go Back Button" className="goBackArrow" onClick={() => navigate(-1)}/>
                                    <h1>Мои Закладки</h1>
                                </div>
                                <div className="cards">
                                    {arrMapForFavorites}
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
