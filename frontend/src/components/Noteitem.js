import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { notes, updateNote } = props;
  return (
    <div className='col-md-3  '>
      <div className="card my-3 " >
        <div className="card-body">
          <div className="d-flex align-items-center">

            <h5 className="card-title">{notes.title}</h5>
            <div className="d-flex btn-group">
              <button className="d-flex btn btn-sm dropdown-toggle " type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="true">    
              </button>
              <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                <li><i className="fa-regular fa-trash-can mx-1" onClick={()=>{deleteNote(notes._id);props.showAlert("Deleted Successfully!", "success")}}></i></li>
                <li><i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}} ></i></li>
              </ul>
            </div>

          </div>
          <p className="card-text">
            {notes.description}
          </p>

          <i className="fa-solid fa-hashtag">{notes.tag}</i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem