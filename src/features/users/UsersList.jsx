import { useSelector } from 'react-redux' ; 
import { selectAllUsers } from './usersSlice' ; 

import { Link } from 'react-router-dom';


const UsersList = () => {

    // fetch users : 
    const users = useSelector ( selectAllUsers ) ; 

    // render users : 
    const renderedUsers = users.map ( 
        user => <li key = { user.id }>
                    <Link to={`/users/${user.id}`}>{ user.name } </Link>
                </li>
    )


    return (
        <section>
            <h2>Users List</h2>

            <ul> { renderedUsers } </ul>
        </section>
    )
}

export default UsersList ; 