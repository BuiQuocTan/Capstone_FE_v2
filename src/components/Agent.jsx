import PersonIcon from '@mui/icons-material/Person'

function Agent({ name,mail,phone,facebook,consultingArea }) {
  return (
    <div className="AgentList">
      <PersonIcon/>
      <div className="finder">
        <h1>{name}</h1>
        <p>Phone Number: {phone}</p>
        <p>Mail: {mail}</p>
        <p>Facebook: <a href={facebook} target="_blank" rel="noreferrer">{facebook}</a></p>
        <p>Consulting Area: {consultingArea}</p>
      </div>
    </div>
  )
}

export default Agent
