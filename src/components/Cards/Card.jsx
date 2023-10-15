import cardStyles from "./Card.module.scss"
import {useState} from "react";

const Card = ({name, price, url, onAdd, onFavorite}) => {
    //стейт для отображения добавления товара в корзину
    const [isAdded, setIsAdded] = useState(false)
    //в зависимости от значения isAdded выдает строку содержащую название свг картинки
    const imgSrc = isAdded ? "added.svg" : "add.svg";
    //функция, инвертирующая значение isAdded при клике на кнопку
    const changeAddIcon = () => {
        onAdd(name, price, url);
        setIsAdded(prev => !prev);
    }
    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.like}>
                <img src="/image/unliked.svg" alt="will u get like it?"/>
            </div>
            <img src={url} alt="url"/>
            <p>{name}</p>
            <div className={cardStyles.cardPrice}>
                <div onClick={() => console.log(cardStyles.cardPrice)} className={cardStyles.cardPrice__info}>
                    <p>Цена:</p>
                    <span>{price + " руб."}</span>
                </div>
                <img src={"/image/" + imgSrc} alt="will add?" onClick={changeAddIcon}/>
            </div>
        </div>
    )
}

export default Card;
