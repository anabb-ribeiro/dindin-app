import Image from "next/image"

function Header() {
  return (
    <header className="w-full h-[15vh]">
      <Image src="/Logo.png" width={169} height={45} alt="Logo" />
    </header>
  )
}

export default Header