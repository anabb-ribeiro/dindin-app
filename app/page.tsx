
import GoogleButton from "./components/GoogleButton";
import CredentialsForm from "./components/CredentialsForm"
import RedirectSignUp from "./components/RedirectSignUp";
import Header from "./components/Header";

export default function HomePage() {

  return (
    <div className="flex flex-col h-screen bg-finances-img bg-cover bg-no-repeat bg-fixed pt-10 pb-20 px-40">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row gap-4 justify-center items-center">
        <section className="w-1/2 py-20 px-10 flex-col">
          <h1 className="text-[34px] font-bold tracking-wide mb-6">
            Controle suas <span className="text-[#6460FB]">finanças</span>,  <br /> sem planilha chata.
          </h1>
          <h2 className="mb-8 text-[18px]">
            Organizar as suas finanças nunca foi tão fácil,<br /> com o DINDIN, você tem tudo num único lugar <br /> e em um clique de distância.
          </h2>
          <RedirectSignUp />
        </section>

        <section className="w-[35%] h-[90%] bg-white rounded-[5px] flex flex-col justify-evenly items-center p-5">
          <h1 className="text-[#6460FB] text-[28px]">Login</h1>
          <CredentialsForm />
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-[#484848]">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>
          <GoogleButton />
        </section>
      </main>
    </div>
  );
}