import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

// Images
import logoImg from '../assets/img/logo.svg'
import deleteImage from '../assets/img/delete.svg'
import checkImage from '../assets/img/check.svg'
import answerImage from '../assets/img/answer.svg'


// Components 
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Questions'

// Style 
import '../styles/room.scss'

// Services
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

// Type
type RoomParams = {
  id: string
}
// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const { title, questions } = useRoom(params.id)


  async function handleEndRoom() {
    await database.ref(`rooms/${params.id}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }


  // Fuctiions
  async function handleCheckQuesitonAsAnswered(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}/`).update({
      isAnswered: true
    })

  }

  async function handleHighlightQuesiton(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}/`).update({
      isHighligted: true
    })
  }

  async function handleDeleteQuesiton(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir está pergunta?')) {
      await database.ref(`rooms/${params.id}/questions/${questionId}/`).remove()
    }
  }

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s) </span>}
        </div>

        <div className="question-list">
          {
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isHighligted={question.isHighligted}
                  isAnswered={question.isAnswered}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuesitonAsAnswered(question.id)}
                      >
                        <img src={checkImage} alt="" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuesiton(question.id)}
                      >
                        <img src={answerImage} alt="" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuesiton(question.id)}
                  >
                    <img src={deleteImage} alt="" />
                  </button>

                </Question>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}