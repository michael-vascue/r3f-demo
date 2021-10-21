import React, { useEffect, useState } from 'react'
import { Html, OrbitControls } from '@react-three/drei'
import { getMaxWidth } from '../../utils'
import { Card, CardInfo } from '..'

interface CardWallProps {
  count: number;
  radius: number;
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
  setSelectedCard: (card: CardInfo) => void;
}

export const CardWall: React.FC<CardWallProps> = ({ count, radius, showDialog, setShowDialog, setSelectedCard }) => {
  const [cards, setCards] = useState([])
  const [cardSize, setCardSize] = useState(2)

  useEffect(() => {
    const newCards = Array.from(Array(cardSize).keys()).map((_, index) => ({
      name: `Spacesuit ${index}`,
      url: '/spacesuit.png',
      model: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    }))

    setCards(newCards)
  }, [cardSize])

  const maxCardsOnLine = getMaxWidth(cardSize)
  const numOfRows = Math.ceil(cardSize / maxCardsOnLine)
  let y = numOfRows < 2 ? 0 : (cardSize * radius) / maxCardsOnLine / 10
  let currentIndex = 0

  return (
    <>
      {cards.map((card, i) => {
        if (i !== 0 && i % maxCardsOnLine === 0) {
          y -= 0.3
          currentIndex = 1
        } else {
          currentIndex++
        }

        return (
          <Card
            key={`1${i}`}
            radius={radius}
            initialPoint={currentIndex + (-5.5 - maxCardsOnLine / 2)}
            count={count}
            info={card}
            yAxis={y}
            showDialog={showDialog}
            onClick={() => {
              setSelectedCard(card)
              setShowDialog(true)
            }}
          />
        )
      })}
      <Html position={[0, -0.15, 0.035]}>
        <input
          type="range"
          min="2"
          max="100"
          step="1"
          value={cardSize}
          onChange={(event) => setCardSize(+event.target.value)}
        />
      </Html>
      <OrbitControls />
    </>
  )
}