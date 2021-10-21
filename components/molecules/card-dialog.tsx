import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'
import { useCardDialog } from '../../hooks'
import '@google/model-viewer'

export const CardDialog = (): JSX.Element => {
  const { showDialog, setShowDialog, selectedCard } = useCardDialog()

  return (
    <Dialog
      isOpen={showDialog}
      aria-label="model"
      onDismiss={() => setShowDialog(false)}
      style={{
        width: '100vw',
        height: '100vh',
        margin: '0',
        padding: '0',
        backgroundColor: 'transparent',
      }}
    >
      <button
        style={{
          backgroundColor: 'transparent',
          textAlign: 'center',
          color: '#ffffff',
          borderRadius: '3px',
          padding: '0',
          border: 'none',
          textDecoration: 'none',
          fontSize: '3rem',
          float: 'right',
          marginRight: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => setShowDialog(false)}
      >
        <span aria-hidden>×</span>
      </button>
      {selectedCard && (
        <model-viewer
          style={{ height: '100vh', width: '100vw' }}
          auto-rotate={true}
          autoplay={true}
          camera-controls={true}
          environment-intensity="2"
          exposure="2"
          neutral
          shadow-intensity={1}
          src={selectedCard.model}
          stage-light-intensity="3"
        />
      )}
    </Dialog>
  )
}
