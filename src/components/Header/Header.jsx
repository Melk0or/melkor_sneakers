import headerStyles from "./Header.module.scss"

const Header = ({price, setIsOpenDrawer }) => {
    return (
        <header className={headerStyles.header}>
            <div className="container">
                <div className={headerStyles.header__inner}>
                    <div className={headerStyles.headerLeft}>
                        <img width={40} src="/image/logo.svg" alt="LogotipMelkorSneackers"/>
                        <div className={headerStyles.headerLeft__info}>
                            <h2>
                                melkor sneackers
                            </h2>
                            <p>Магазин лучших кроссовок</p>
                        </div>
                    </div>
                    <div className={headerStyles.headerRight}>
                        <div className={headerStyles.headerRight__item} onClick={() => {
                            window.scrollTo(0, 0);
                            document.querySelector("body").style.overflow = "hidden";
                            setIsOpenDrawer(prevState => !prevState);
                        }
                        }>
                            <img src="/image/Group.svg" alt="Group"/>
                            <p>{price} руб.</p>
                        </div>
                        <div className={headerStyles.headerRight__item}>
                            <img src="/image/heart.svg" alt="heart"/>
                            <p>Закладки</p>
                        </div>
                        <div className={headerStyles.headerRight__item}>

                            <img src="/image/Union.svg" alt="Union" />
                            <p>Профиль</p>
                            {/*<span>3</span>*/}
                            {/*<p className={headerStyles.delete}>Покупки</p>*/}

                            {/*<div className={headerStyles.dropdown}>*/}
                            {/*    <div className={headerStyles.dropdownItem}>1.Nike Blazer</div>*/}
                            {/*    <div className={headerStyles.dropdownItem}>2.Nike Blazer</div>*/}
                            {/*    <div className={headerStyles.dropdownItem}>3.Nike Blazer</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;