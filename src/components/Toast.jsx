import { CheckCircle2, Info, AlertCircle, XCircle } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const iconMap = {
  success: CheckCircle2,
  info: Info,
  error: XCircle
}

const toastColor = {
  success: 'bg-[#ECFDF5] text-[#059669]',
  info: 'bg-[#EFF6FF] text-[#003087]',
  error: 'bg-[#FEF2F2] text-[#DC2626]'
}

const Toast = () => {
  const { toasts } = useAppContext()

  return (
    <div className="pointer-events-none fixed right-4 top-16 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type] || Info
        return (
          <div
            key={toast.id}
            className="pointer-events-auto overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl shadow-black/10 transition-all duration-300"
          >
            <div className="flex gap-3 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${toastColor[toast.type]}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#0A1628]">{toast.title}</div>
                <div className="text-xs text-[#718096] mt-1">{toast.message}</div>
              </div>
            </div>
            <div className="h-1 w-full bg-[#E2E8F0]">
              <div className={`h-1 ${toast.type === 'success' ? 'bg-[#059669]' : toast.type === 'error' ? 'bg-[#DC2626]' : 'bg-[#003087]'} animate-progress`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Toast
