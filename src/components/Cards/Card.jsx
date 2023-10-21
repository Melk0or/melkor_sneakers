import cardStyles from "./Card.module.scss"
import {useState} from "react";
import ContentLoader from "react-content-loader";

const Card = ({ name, price, url, onAdd, onFavorite, isAddedToFavorite = false, isLoading, added}) => {
    //стейт для отображения добавления товара в корзину
    const [isAdded, setIsAdded] = useState(added===true ? true : false);
    //стейт для отображения закладки
    const [isFavorite, setIsFavorite] = useState(isAddedToFavorite);
    //в зависимости от значения isAdded выдает строку содержащую название свг картинки
    const imgAddSrc = isAdded ? "added.svg" : "add.svg";
    //в зависимости от значения isAddedToFavorite выдаст либо лайк либо в зависимости от значения isFavorite выдает строку содержащую название свг картинки
    const imgFavSrc = isAddedToFavorite ? "liked.svg" : isFavorite ? "liked.svg" : "unliked.svg";
    //функция, инвертирующая значение isAdded при клике на кнопку
    const changeAddIcon = () => {
        onAdd({name, price, url});
        setIsAdded(prev => !prev);
    }
    //функция, инвертирующая значение isFavorite при клике на кнопку
    const changeFavoriteIcon = () => {
        onFavorite({name, price, url});
        setIsFavorite(prev => !prev);
    }
    return (
        <div className={cardStyles.card}>
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={150}
                    height={200}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="116" rx="10" ry="10" width="150" height="15" />
                    <rect x="1" y="137" rx="10" ry="10" width="93" height="15" />
                    <rect x="118" y="168" rx="10" ry="10" width="32" height="32" />
                    <rect x="1" y="174" rx="10" ry="10" width="80" height="24" />
                    <rect x="1" y="12" rx="10" ry="10" width="150" height="93" />
                </ContentLoader>
            ) : (
                <>
                    <div className={cardStyles.like}>
                        <img src={"/image/" + imgFavSrc} alt="will u get like it?" onClick={changeFavoriteIcon}/>
                    </div>
                    <img src={url} alt="url"/>
                    <p>{name}</p>
                    <div className={cardStyles.cardPrice}>
                        <div onClick={() => console.log(cardStyles.cardPrice)} className={cardStyles.cardPrice__info}>
                            <p>Цена:</p>
                            <span>{price + " руб."}</span>
                        </div>
                        <img src={"/image/" + imgAddSrc} alt="will add?" onClick={changeAddIcon}/>
                    </div>
                </>
                )}
        </div>
    )
}

export default Card;
