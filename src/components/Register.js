import { createRef } from "react";
import AuthApi from "./../utils/AuthApi";

const Register = (props) => {
  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    AuthApi.register({ password, email })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <form
        className="popup__content"
        name="register"
        onSubmit={handleSubmit}
        action="#"
        noValidate
      >
        <input
          type="email"
          className="popup__field"
          name="email"
          ref={emailRef}
          required
        />
        <input
          type="password"
          className="popup__field"
          name="password"
          ref={passwordRef}
          required
        />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
