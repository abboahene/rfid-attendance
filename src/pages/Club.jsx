import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CudModal from '../components/cudModal'
const Club = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/clubs').then( res => {
            setClubs(res.data)
        }).catch(err => {
            console.log(err)
        })       
    }, []);

    return ( 
        <div className="col-9 col-md-10 p-5">
            <CudModal/>
            <table className="table table-lights table-striped shadow-sm rounded">
                <thead>
                    <tr className="text-center"> 
                        <th scope="col">Club Name</th>
                        <th scope="col pull-right">
                            <span className="text-success">Add</span>/
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
                                        <button className="btn btn-sm btn-success rounded shadow mr-1" data-toggle="modal" data-target="#cudModal"><i className="fa fa-plus"></i></button>
                                        <button className="btn btn-sm btn-warning rounded shadow mr-1" data-toggle="modal" data-target="#cudModal"><i className="fa fa-edit"></i></button>
                                        <button className="btn btn-sm btn-danger rounded shadow" data-toggle="modal" data-target="#cudModal"><i className="fa fa-minus"></i></button>
                                    </td>
                                </tr>
                    })}
                </tbody>
            </table>
        </div>
     );
}
 
export default Club;