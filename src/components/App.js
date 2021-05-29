import { useState, useEffect } from 'react';

import Api from './../utils/Api'

import Footer from './Footer';
import Header from './Header';
import Main from './Main';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await Api.getUser();
        setUserInfo(userInfo);

        const cards = await Api.getInitialCards();
        setCards(cards);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="page">
        <Header />

        <Main
          cards={cards}
          userName={userInfo.name}
          userDescription={userInfo.about}
          userAvatar={userInfo.avatar}
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onCardClick={handleCardClick}
        />
        <Footer />

      </div>

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          (
            <>
              <input type="text" className="popup__field" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
              <span className="popup__error"></span>
              <input type="text" className="popup__field" name="about" placeholder="О себе" minLength="2" maxLength="200"
                required />
              <span className="popup__error"></span>
              <button type="submit" className="popup__submit-button">Сохранить</button>
            </>
          )
        }
      />

      <PopupWithForm
        name="add-place"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          (
            <>
              <input type="text" className="popup__field" name="name" placeholder="Место" minLength="2" maxLength="30" required />
              <span className="popup__error"></span>
              <input type="url" className="popup__field" name="link" placeholder="Ссылка" required />
              <span className="popup__error"></span>
              <button type="submit" className="popup__submit-button">Создать</button>
            </>
          )
        }
      />

      <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          (
            <>
              <input type="url" className="popup__field" name="avatar" placeholder="Ссылка" required />
              <span className="popup__error"></span>
              <button type="submit" className="popup__submit-button">Сохранить</button>
            </>
          )
        }
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
