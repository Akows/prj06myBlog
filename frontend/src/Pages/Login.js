import './Login.css';
import '../ResetStyle.css';

const Login = () => {

    const submitEvent = () => {
        return;
    };

    return (
        <div className='login'>

            <form>
                <div className='loginform'>

                    <p>Login</p>

                    <div className='input'>
                        <input/>
                    </div>

                    <div className='input'>
                        <input/>
                    </div>

                    <div className='submitbutton' onClick={submitEvent}>
                        로그인
                    </div>

                </div>
            </form>

        </div>
    );
};

export default Login;