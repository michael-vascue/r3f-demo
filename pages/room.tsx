import React from 'react'
import dynamic from 'next/dynamic'
import { DialogProvider } from '../providers/dialog.provider'

const DisplayRoom = dynamic(
  () => import('../components').then((mod) => mod.DisplayRoom),
  { ssr: false }
)

export default function RoomPage(): JSX.Element {
  return (
    <DialogProvider>
      <DisplayRoom />
    </DialogProvider>
  )
}
