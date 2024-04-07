import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const [username, setUsername] = useState('');

    const getUsername = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/username", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setUsername(response.data.username);
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };

    useEffect(() => {
        getUsername();
    }, []);

    useEffect(() => {
        if (username) {
            axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                const filteredUsers = response.data.user.filter(user => user.username !== username);
                setUsers(filteredUsers);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [filter, username]);

    return (
        <div>
            <div className="font-semibold mt-6 text-lg">All Available Users</div>
            <div className="my-2">
                <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" />
            </div>
            <div>
                {users.map(user => <User user={user} key={user._id} />)}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between my-auto">
            <div className="flex my-auto">
                <div className="rounded-full h-10 w-10 bg-slate-300 p-0 flex justify-center mt-1 mb-2 mr-2 my-auto">
                    <div className="flex flex-col justify-center h-full text-xl my-auto">{user.firstName[0]}</div>
                </div>
                <div className="flex flex-col justify-center h-ful my-auto">
                    <div className="font-semibold my-auto">{user.firstName} {user.lastName}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <button onClick={() => navigate('/send?id=' + user._id + "&firstName=" + user.firstName + "&lastName=" + user.lastName)} type="button" className="w-full bg-green-600 hover:bg-green-700 text-white p-5 py-2 text-sm px-auto rounded-lg focus:outline-none">Send Money</button>
            </div>
        </div>
    );
}
