import Image from "next/image";


export default function Navbar() {
  return (
    <section className="bg-white"><div className="relative w-5 h-5"><Image
        src="/icons/Vector.svg"
        alt="My photo"
       fill
        className="object-contain"
      /></div></section>
  )
}
