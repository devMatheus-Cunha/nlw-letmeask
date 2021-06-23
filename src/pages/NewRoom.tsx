import { FormEvent, useState } from 'react'
import {
  Link,
  useHistory,
} from "react-router-dom";

// Images
import illustrationImg from '../assets/img/illustration.svg';
import logoImg from '../assets/img/logo.svg';

// Context
import { useAuth } from "../hooks/useAuth";

// Style
import '../styles/auth.scss';

// Components
import { Button } from '../components/Button';

// Detabase
import { database } from '../services/firebase';

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function NewRoom() {
  const history = useHistory()

  // State
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('')

  // Functions
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h5>Seja bem vindo <strong>{user?.name}</strong></h5>
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom} >
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">
              Criar sala
            </Button>
            <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
          </form>
        </div>
      </main>
    </div>
  )
}