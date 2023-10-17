import drawerCard from "./DrawerCard.module.scss"
const DrawerCard = ({props, onDelete}) => {
    return (
        <div className={drawerCard.drawerCard}>
            <img src={props.url} alt="snicker"/>
            <div className={drawerCard.drawerCard__info}>
                <p>{props.name}</p>
                <span>{props.price} руб.</span>
            </div>
            <img onClick={() => onDelete(props.id)} src={"/image/delete.svg"} alt="will add?"/>
        </div>
    )
}

export default DrawerCard;
