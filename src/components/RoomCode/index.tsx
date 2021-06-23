// Style
import './style.scss'

// Image
import copyImage from '../../assets/img/copy.svg'

//Type
type RoomCodeProps= {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  // Functions
  function copyRoomToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomToClipboard}>
      <div>
        <img src={copyImage} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}