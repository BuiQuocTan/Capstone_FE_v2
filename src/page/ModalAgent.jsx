import '../style/modalPage.css'
import AddAgent from '../components/AddAgent'

function ModalAgent({closeModal}) {

    const close= ()=>{
        closeModal(false)
    }

  return (
    <div className="bg-modal-page">
        <div onClick={close} className="bg-modal"></div>
        <AddAgent />
    </div>
  )
}

export default ModalAgent