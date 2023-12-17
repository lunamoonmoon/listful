import Modal from "../LoginModal/Modal";

export default function NavBar() {

  return (
    <nav>
      <div>
        Logo
      </div>
      <div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Modal>
            <button>login/sign up</button>
            </Modal>
          </li>
          <li>My Profile</li>
          <li>About</li>
        </ul>
      </div>
    </nav>
    )
};
