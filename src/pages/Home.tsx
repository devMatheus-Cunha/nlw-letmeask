import { FormEvent, useState } from "react";
import {
  useHistory,
} from "react-router-dom";

// Images
import illustrationImg from '../assets/img/illustration.svg';
import logoImg from '../assets/img/logo.svg';
import googleIconImg from '../assets/img/google-icon.svg';
import log from '../assets/img/log.svg';

// Style
import '../styles/auth.scss';

// Components
import { Button } from '../components/Button';

// Context
import { useAuth } from "../hooks/useAuth";

// Detabase
import { database } from '../services/firebase';

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Home() {
  const history = useHistory()

  //Context
  const { user, signInWithGoogle } = useAuth()

  // State
  const [roomCode, setRoomCode] = useState('')

  // Functions
  async function handleCreatNewRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    
    if (!roomRef.exists()) {
      alert('Esta sala não existe.')
      return
    }

    history.push(`/rooms/${roomCode}`)
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
          <button className="create-room" onClick={handleCreatNewRoom}>
            <img src={googleIconImg} alt="Ícone do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em um sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">
              <img src={log} alt="Ícone do google" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}