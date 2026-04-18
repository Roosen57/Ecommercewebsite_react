import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Auth() {
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, login, user, logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  function onSumit(data) {
    if (mode === 'login') {
      setErrorMessage(login(data.email, data.password));
    } else {
      setErrorMessage(signup(data.email, data.password));
    }
    if (errorMessage.success) {
      navigate('/');
    }
  }

  return (
    <div>
     
      <div style={{backgroundColor: '#202020', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', marginTop: '1rem', margin: '0 auto', borderRadius: '1rem', padding: '1rem', color: '#fff', height:'100%', paddingTop: '1rem'}}>
        <h1 style={{textAlign: 'center', padding: '2rem'}}>{mode === 'signup' ? 'Sign Up' : 'Login'}</h1>
        
        <div>
          <form onSubmit={handleSubmit(onSumit)}>
              {user && <p>User logged in : {user}</p>}
            <div>
              <h2 htmlFor="email" style={{textAlign: 'left', padding: '0.5rem'}}>Email</h2>
              <input id="email" {...register("email", { required: "Email is required" })} style={{padding: '0.5rem', border: '0.1px solid #ccc', borderRadius: '6px', width: '90%'}} type="email"></input>
              {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
            </div>

            <div>
              <h2 htmlFor="password" style={{textAlign: 'left', padding: '0.5rem'}}>Password</h2>
              <input id="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} style={{padding: '0.5rem', border: '0.1px solid #ccc', borderRadius: '6px', width: '90%'}} type="password"></input>
              {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
            </div>

            <div>
              <button type="submit" style={{width: '30%', fontSize: '1rem', padding: '1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', margin: '1rem'}}>{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
            </div>
            {!errorMessage.success && <p style={{color: 'red'}}>{errorMessage.message}</p>}
          </form>

          <div>
            {mode === 'signup' && <p>Already have an account? <span style={{cursor: 'pointer', color: '#007bff'}} onClick={() => setMode('login')}>Login</span></p>}
            {mode === 'login' && <p>Don't have an account? <span style={{cursor: 'pointer', color: '#007bff'}} onClick={() => setMode('signup')}>Sign Up</span></p>}
          </div>

        </div>
      </div>
    </div>
  );
}