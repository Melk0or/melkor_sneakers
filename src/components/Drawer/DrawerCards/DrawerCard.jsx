import drawerCard from "./DrawerCard.module.scss"
const DrawerCard = ({name, price, url}) => {
    return (
        <div className={drawerCard.drawerCard}>
            <img src={url} alt="snicker"/>
            <div className={drawerCard.drawerCard__info}>
                <p>{name}</p>
                <span>{price} руб.</span>
            </div>
            <img src={"/image/delete.svg"} alt="will add?"/>
        </div>
    )
}

export default DrawerCard;
