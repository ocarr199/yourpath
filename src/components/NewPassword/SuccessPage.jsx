// ⬇ custom components we need to import
import LoginForm from "../LoginForm/LoginForm";
import image from "../Images/YourPath_Logo_Text.png";

export default function SuccessPage() {

  return (
      <div className="container center">
        <img
          src={image}
          alt="Your Path Logo"
          className=" landing-page center"
        />
        <h4>Success! You've successfully reset your password</h4>
        <LoginForm />
      </div>

  );
}
