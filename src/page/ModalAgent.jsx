import '../style/modalPage.css'
import AddAgent from '../components/AddAgent'

function ModalAgent({closeModal,loadData}) {

    const close= ()=>{
        closeModal(false)
    }

  return (
    <div className="bg-modal-page">
        <div onClick={close} className="bg-modal"></div>
        <AddAgent loadData={loadData} closeModal={closeModal} />
    </div>
  )
}

export default ModalAgent