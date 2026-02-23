import Favorite from '../../assets/favorite.svg';
import NotFavorite from '../../assets/not-favorite.svg';

const MarkAsFavoriteButton = ({ is_favorite, onClick }) => {
  return (
    <button className={`favorite-button ${is_favorite ? "favorited" : ""}`} onClick={onClick}>
      <img src={is_favorite ? Favorite : NotFavorite} alt={is_favorite ? "Unfavorite" : "Mark as Favorite"} />
      <div>{is_favorite ? "Favorited" : "Mark as Favorite"}</div>
    </button>
  );
}

export default MarkAsFavoriteButton;