import React from 'react'


export default function Home
    ({
         searchValue,
         searchChange,
         arrMap
    }) {
    return (
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
    )
}
