import {
  Link,
} from "react-router-dom";

// Images
import illustrationImg from '../assets/img/illustration.svg'
import logoImg from '../assets/img/logo.svg'

// Context
import { useAuth } from "../hooks/useAuth";

// Style
import '../styles/auth.scss'

// Components
import { Button } from '../components/Button'


export function NewRoom() {
  const {user} = useAuth()


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
          <form action="">
            <input
              type="text"
              placeholder="Nome da sala"
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