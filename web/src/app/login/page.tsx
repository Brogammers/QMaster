import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="bg-animation">
      <div className="container row flex flex-col justify-center items-center h-4/5">
        <h2 className="text-8xl font-bold text-white mb-16">Login</h2>
        <LoginForm />
      </div>
    </div>
  )
}