import React, { useEffect, useState } from 'react'
import '../assets/sps.css';


export default function DataTable() {
    const [users, setUsers] = useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const itemPerPage=10;
    const[isAsc,setIsAsc]=useState(true)
    
    useEffect(() => {
        fetch('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json')
            .then(res => res.json())
            .then(data => setUsers(data))
             .catch(err => console.log(err))
             
    }, []);
    const totalPages=3;
    const startIndex = (currentPage -1) * itemPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemPerPage);
   const sortByName = () => {
  const sorted = [...users].sort((a, b) =>
    isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  setUsers(sorted);
  setIsAsc(!isAsc); 
};

  
    return (

        <div className='container mt-4'>
  
        <table  className='tbl'>
            <thead>
                <tr>
                    <th>id</th>
                    <th> Name<span style={{cursor:'pointer'}} onClick={sortByName}> {isAsc?  '&#9650;' : '&#9660; '}</span> </th>
                    <th>Language</th>
                    <th>Version</th>
                </tr>
            </thead>
            <tbody>
                {currentUsers.map((user) => (
                    <tr key={user.id}>
                        
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.language}</td>
                        <td> {user.version}</td>
                    </tr>
                ))}
            </tbody>
        </table>
            <button className='ss' onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} >
            Prev
            </button>
            <button className={`ctnbtn ${currentPage === 1 ? 'active' : ''}`}
             onClick={() => setCurrentPage(1)}> 1 </button>
            <button className={`ctnbtn ${currentPage === 2 ? 'active' : ''}`}
            onClick={() => setCurrentPage(2)}>  2  </button>
            <button  className={`ctnbtn ${currentPage === 3 ? 'active' : ''}`}
            onClick={() => setCurrentPage(3)}>  3  </button>
            <button className='ss' onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages}>
            Next
            </button>
            
        </div>
        

    )
}
