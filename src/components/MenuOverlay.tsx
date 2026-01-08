
interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-[9998] min-h-screen pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Menu Window */}
      <div
        style={{ 
          backgroundColor: '#F3E5AB'
        }}
        className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] rounded-lg shadow-2xl p-12 border border-default-text mx-auto w-fit pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col gap-6 text-2xl text-default-text">
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
