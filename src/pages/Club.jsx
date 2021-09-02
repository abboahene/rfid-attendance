import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import CudModal from '../components/cudModal'
const Club = () => {
    const [clubs, setClubs] = useState([])
    const [reload, setReload] = useState(false)

    function reloadClub() {
        setReload(!reload)
    }

    useEffect(() => {
        axios.get('http://localhost:3002/clubs').then( res => {
            setClubs(res.data)
        }).catch(err => {
            console.log(err)
        })       
    }, [reload]);

    ///for modal
    let addInputRef  = useRef(null)
    let updateInputRef  = useRef(null)
    const [modal, setModal] = useState({});
    const modal_add = { 
        title: 'Add Class',
        body: <form ref={addInputRef}>
                <input type="text" className="form-control" placeholder="Enter New Class Name" id="inputDefault"/>
            </form>,
        action: 'add',
        club: { name: ''}
    }
    const modal_update = { 
        title: 'Update Class',
        body: <input type="text"/>,
        action: 'update', 
        club: {name: ''}
    }
    const modal_delete = { 
        title: 'Delete Class',
        body: <p>Are you sure you want to delete?</p>,
        action: 'delete',
        club: {name: ''} 
    }
    ///for modal
    
    ///======handle button clicks
    function buttonAdd() {
        setModal(modal_add)
    }
    function buttonUpdate(club) {
        modal_update.body = <form ref={addInputRef}>
                                <label className="form-label mt-4">Enter new club name:</label>
                                <input type='text' placeholder={club.name} className="form-control" ref={updateInputRef}/>
                            </form>
        modal_update.club = club
        setModal(modal_update)
    }
    function buttonDelete(club) {
        modal_delete.body = <p>Are you sure you want to delete <b>{club.name}?</b></p>
        modal_delete.club = club 
        setModal(modal_delete)
    }
    ///======handle button clicks

    
    return ( 
        <div className="col-9 col-md-10 p-5">
            <h1 className="text-success">Classes</h1>
            <CudModal title={modal.title} body={modal.body} action={modal.action} club={modal.club} reload={reloadClub}/>
            <button onClick={ buttonAdd } className={`btn btn-sm btn-success rounded shadow-sm mr-1 mb-2 pull-right`} data-toggle="modal" data-target="#cudModal">Add Class <i className="fa fa-plus"></i></button>
            <table className="table table-lights table-striped shadow-sm rounded">
                <thead>
                    <tr className="text-center"> 
                        <th scope="col">Class Name</th>
                        <th scope="col pull-right">
                            <span className="text-warning">Edit</span>/
                            <span className="text-danger">Delete</span>                           
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {clubs.map( club => {
                        return  <tr key={club._id} className="text-center">
                                    <td>{club.name}</td>
                                    <td>
                                        <button onClick={ () => buttonUpdate(club) } className={`btn btn-sm btn-warning rounded shadow mr-1`} data-toggle="modal" data-target="#cudModal"><i className="fa fa-edit"></i>
                                        </button>
                                        <button onClick={ () => buttonDelete(club) } className={`btn btn-sm btn-danger rounded shadow`} data-toggle="modal" data-target="#cudModal"><i className="fa fa-minus"></i>
                                        </button>
                                    </td>
                                </tr>
                    })}
                </tbody>
            </table>
        </div>
     );
}
 
export default Club;