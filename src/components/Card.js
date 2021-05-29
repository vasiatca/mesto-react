const Card = (props) => {
  return (
    <li className="element__card" onClick={props.onCardClick}>
      <img className="element__image" src={props.image} alt="Фото" />
      <button type="button" className="element__delete" />
      <div className="element__info">
        <h3 className="element__title">{props.name}</h3>
        <div className="element__like-group">
          <button type="button" className="element__like" />
          <p className="element__like-number">{props.likesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;