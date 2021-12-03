import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import './login.css';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        loginEmail: 'sergio@demo.com',
        loginPassword: '123456'
    });
    
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        registerEmail: 'sofi@demo.com',
        registerPassword1: '123456',
        registerPassword2: '123456',
        registerName: 'Sofía'
    });

    const { loginEmail, loginPassword } = formLoginValues;
    const { registerEmail, registerPassword1, registerPassword2, registerName } = formRegisterValues;

    const handleLogin = e => {
        e.preventDefault();

        // TODO: Client/Server validations
        dispatch( startLogin( loginEmail, loginPassword ) );
    }

    const handleRegister = e => {
        e.preventDefault();

        if( registerPassword1 !== registerPassword2 ) return Swal.fire( 'Error', 'The passwords must be the same', 'error' );

        // TODO: Client validations
        dispatch( startRegister( registerEmail, registerPassword1, registerName ) );
    };
 
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ handleLoginInputChange }                                
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                name="registerName"
                                value={ registerName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="registerPassword1"
                                value={ registerPassword1 }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Type again the password"
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};