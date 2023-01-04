import { useState } from 'react';
import '../style/AddAgent.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function AddAgent({closeModal,loadData}) {
  const [agent, setAgent] = useState({
    name: '',
    phone: '',
    mail: '',
    facebook: '',
    consultingArea: '',
  });

  const close= ()=>{
    closeModal(false)
}

  const addAgent = async () => {
    await addDoc(collection(db, 'listAgent'), {
      name: agent.name,
      phone: agent.phone,
      mail: agent.mail,
      facebook: agent.facebook,
      consultingArea: agent.consultingArea,
    }).then(loadData)
    .then(alert('Add Successfull!!'))
    .then(close)
    
  };
  const handleInput = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  console.log(agent);
  return (
    <div className="Add">
      <h1>Add Agent Finder</h1>
      <div className='Add-Content'>
        <label>Name Agent</label>
        <input type="text" name="name" value={agent.name} onChange={handleInput} />
      </div>
      <br />
      <div className='Add-Content'>
        <label>Phone number</label>
        <input type="text" name="phone" value={agent.phone} onChange={handleInput} />
      </div>
      <br />
      <div className='Add-Content'> 
        <label>Mail</label>
        <input type="text" name="mail" value={agent.mail} onChange={handleInput} />
      </div>
      <br />
      <div className='Add-Content'>
        <label>Facebook</label>
        <input type="text" name="facebook" value={agent.facebook} onChange={handleInput} />
      </div>
      <br />
      <div className='Add-Content'>
        <label>Consulting Area</label>
        <input type="text" name="consultingArea" value={agent.consultingArea} onChange={handleInput} />
      </div>
      <br />
      <button onClick={addAgent}>Add Agent Finder</button>
    </div>
  );
}
export default AddAgent;
