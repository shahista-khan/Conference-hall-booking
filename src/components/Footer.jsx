import { useAppContext } from '../context/AppContext'
import emblem from '../assets/emblem.svg'

const Footer = () => {
  const { currentUser } = useAppContext()

  return (
    <footer className="bg-[#0A1628] border-t border-white/10 py-8 px-6 text-center text-white/60">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3">
        <img src={emblem} alt="Government of India emblem" className="h-9 opacity-80" />
        <div className="text-xs font-bold tracking-[0.28em] text-white/70">DELHI POLICE</div>
        <div className="text-[11px] text-white/40">Headquarters Conference Room Portal</div>
        <div className="h-px w-32 bg-white/10 my-3" />
        <div className="text-[11px] text-white/30">© 2026 Delhi Police · All Rights Reserved</div>
        <div className="text-[11px] text-gold/60 italic">शान्ति सेवा न्याय  |  Shanti Sewa Nyay</div>
      </div>
    </footer>
  )
}

export default Footer
