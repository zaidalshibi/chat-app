import axios from "axios";


function Login () {
    const handleSubmit = async(e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const roomId = e.target.roomId.value;
        await axios.post('http://localhost:3000/user', {username, roomId}).then((res) => {
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('roomId', roomId);
            window.location.href = '/chat';
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="login">
            <h1> Login </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label> Username </label>
                <input type="text" id="username"/>
                <br />
                <label> room id </label>
                <input type="text" id="roomId"/>
                <br />
                <button type="submit"> Login </button>
            </form>
        </div>

    );
}

export default Login;