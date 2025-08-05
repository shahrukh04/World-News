import React from 'react'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

interface DropdownMenuContentProps {
  align?: 'start' | 'center' | 'end'
  children: React.ReactNode
  className?: string
}

interface DropdownMenuItemProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({ isOpen: false, setIsOpen: () => {} })

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  asChild, 
  children 
}) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      'aria-expanded': isOpen,
      'aria-haspopup': true
    } as any)
  }

  return (
    <button
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup={true}
      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  )
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ 
  align = 'start', 
  children, 
  className 
}) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  }

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
        alignmentClasses[align],
        className
      )}
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        {children}
      </div>
    </div>
  )
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  onClick, 
  children, 
  className 
}) => {
  const { setIsOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    onClick?.()
    setIsOpen(false)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900',
        className
      )}
      role="menuitem"
    >
      {children}
    </button>
  )
}