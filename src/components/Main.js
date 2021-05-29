import Card from './Card';

const Main = (props) => {
	return (
		<>
			<section className="profile">
				<div className="profile__content">
					<div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
						<img className="profile__avatar" src={props.userAvatar} alt="Фото" />
					</div>
					<div className="profile__info">
						<div className="profile__item">
							<div className="profile__item-inner">
								<h1 className="profile__title">{props.userName}</h1>
								<button type="button" id="edit-popup" className="profile__edit-button" onClick={props.onEditProfile}></button>
							</div>
						</div>
						<p className="profile__subtitle">{props.userDescription}</p>
					</div>
				</div>
				<button type="button" id="add-popup" className="profile__add-button" onClick={props.onAddPlace}></button>
			</section>

			<section className="elements">
				<ul className="element">
					{props.cards.map((item) =>
						<Card
							key={item._id}
							image={item.link}
							name={item.name}
							likesCount={item.likes.length}
							onCardClick={() => props.onCardClick(item)}
						/>
					)}
				</ul>
			</section>
		</>
	)

}

export default Main;