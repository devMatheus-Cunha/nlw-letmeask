import { useState, FormEvent, useEffect } from 'react'
import { useParams } from 'react-router'

// Images
import logoImg from '../assets/img/logo.svg'

// Components 
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

// Context
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

// Style 
import '../styles/room.scss'

// Type
type RoomParams = {
  id: string
}

type firebaseQuestions = Record<string, {
  content: string,
  author: {
    name: string
    avatar: string
  },
  isHighligted: boolean,
  isAnswered: boolean
}>

type Question = {
  id: string,
  content: string,
  author: {
    name: string
    avatar: string
  },
  isHighligted: boolean,
  isAnswered: boolean
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Room() {
  const params = useParams<RoomParams>()

  // State
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: firebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighligted: value.isHighligted,
          isAnswered: value.isAnswered
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [params.id])

  //Functions 
  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error("Erro");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighligted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${params.id}/questions`).push(question)

    setNewQuestion('')
  }




  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s) </span>}
        </div>
        <form onSubmit={handleCreateNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar"
            onChange={event => setNewQuestion(event.target.value)}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            )}
            <Button type="submit" disabled={!user} >Enivar pergunta</Button>
          </div>
        </form>

        {

        }
      </main>
    </div>
  )
}