import { useState } from 'react'
import { DialogContext } from '../contexts/dialog.context'

export const DialogProvider = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  return (
    <DialogContext.Provider
      value={{ showDialog, setShowDialog, selectedCard, setSelectedCard }}
    >
      {children}
    </DialogContext.Provider>
  )
}
