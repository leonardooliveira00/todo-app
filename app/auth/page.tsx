import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function AuthPage() {
  return (
    <main>
      <div className="flex min-h-screen flex-1 items-center justify-center gap-16 p-4 bg-blue-200">
        <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-indigo-300">
          <LoginForm />
        </div>

        <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-amber-200">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
