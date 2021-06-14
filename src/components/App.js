import { useState, useEffect } from "react";

import Api from "./../utils/Api";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import CurrentUserContext from "./../contexts/CurrentUserContext";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((own) => own._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = (card) => {
    Api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    Api.editUser({ name, about }).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    Api.updateAvatar(avatar).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  };

  const handleAddPlaceCard = ({ name, link }) => {
    Api.addNewCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await Api.getUser();
        setCurrentUser(userInfo);

        const cards = await Api.getInitialCards();
        setCards(cards);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />

          <Main
            cards={cards}
            onEditProfile={() => setIsEditProfilePopupOpen(true)}
            onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
            onAddPlace={() => setIsAddPlacePopupOpen(true)}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddCard={handleAddPlaceCard}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
