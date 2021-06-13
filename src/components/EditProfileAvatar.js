import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditProfileAvatar = (props) => {
	const avatarRef = createRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		const avatar = avatarRef.current.value;

		props.onUpdateAvatar({
			avatar,
		});
		avatarRef.current.value = "";
	};

	return (
		<PopupWithForm
			name="update-avatar"
			title="Обновить аватар"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			children={
				<>
					<input
						type="url"
						className="popup__field"
						name="avatar"
						placeholder="Ссылка"
						ref={avatarRef}
						required
					/>
					<span className="popup__error"></span>
					<button type="submit" className="popup__submit-button">
						Сохранить
          </button>
				</>
			}
		/>
	);
};

export default EditProfileAvatar;