
interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 min-h-screen pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Menu Window */}
      <div
        className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] rounded-lg shadow-2xl p-12 mx-auto w-fit pointer-events-auto"
        style={{ backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col gap-6 text-2xl" style={{ color: 'var(--theme-text)' }}>
          <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Chapters</a>
          <a href="#" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Settings</a>
        </nav>
      </div>
    </div>
  )
}

export default MenuOverlay
