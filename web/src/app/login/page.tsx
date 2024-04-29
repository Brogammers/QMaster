import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="bg-animation flex flex-col justify-center items-center">
      <div className="login__form container row text-center flex flex-col justify-center items-center h-4/5">
        <h2 className="login__form--title text-8xl font-bold text-white mb-16">Login</h2>
        <LoginForm />
      </div>
    </div>
  )
}