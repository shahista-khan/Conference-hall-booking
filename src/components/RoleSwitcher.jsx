import { useAppContext } from '../context/AppContext'
import { Settings, ShieldCheck } from 'lucide-react'

const RoleSwitcher = () => {
  const { role, switchRole } = useAppContext()

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-[#0A1628] border-b border-white/10 h-8 px-4 flex items-center justify-between text-xs text-white/60">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1">⚙️ PROTOTYPE MODE</span>
        <span className="h-4 w-px bg-white/10" />
        <span>Switch Role:</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => switchRole('user')}
          className={`rounded-full px-3 py-0.5 text-xs font-semibold transition-all ${
            role === 'user'
              ? 'bg-gold text-[#0A1628]'
              : 'bg-transparent text-white/50 border border-white/20 hover:text-white/80'
          }`}
        >
          👮 User View
        </button>
        <button
          onClick={() => switchRole('superadmin')}
          className={`rounded-full px-3 py-0.5 text-xs font-semibold transition-all ${
            role === 'superadmin'
              ? 'bg-gold text-[#0A1628]'
              : 'bg-transparent text-white/50 border border-white/20 hover:text-white/80'
          }`}
        >
          🔐 Admin View
        </button>
      </div>
    </div>
  )
}

export default RoleSwitcher
