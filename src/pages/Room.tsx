// Images
import logoImg from '../assets/img/logo.svg'

// Components 
import { Button } from '../components/Button'

// Style 
import '../styles/room.scss'

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Room() {
  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>codigo</div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 Perguntas</span>
        </div>
        <form action="">
          <textarea placeholder="O que você qier perguntar" />
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            <Button type="submit"/>
          </div>
        </form>
      </main>
    </div>
  )
}