import { FormEvent, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/auth/AuthContext';
import { LoadingButton } from '../../components/LoadingButton';
import { emailRegex } from '../../utils';

const formValidations = {
  email: [(value: string) => emailRegex.test(value), 'The email is not valid'],
}

export const Login = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const { signIn, isButtonLoading } = useContext(AuthContext);

  const { email, onChange, isFormValid, emailValid } = useForm({
    email: '',
  }, formValidations)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true)

    if (!isFormValid) return;

    signIn({ email })
  }

  return (
    <div className="w-11/12 mx-auto md:max-w-3xl">
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-font-strong text-5xl font-bold">Login</h1>
        <p className="text-font-light text-2xl max-w-xs mx-auto">Get access to your own posts by logging into your account</p>
      </div>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div className={`border flex justify-between items-center rounded-lg py-4 px-6 md:py-5 ${(!!emailValid && formSubmitted) && 'border-red-400'}`}>
            <input type="email" className="bg-transparent text-2xl w-full mr-6" placeholder="Email" id="email"
              name="email" onChange={(e) => onChange(e.target.value, 'email')} value={email} />
          </div>
          <span className="text-red-400 text-xl">{formSubmitted && emailValid}</span>
        </div >
        <LoadingButton text='Sign in' isLoading={isButtonLoading} />
        <p className="text-font-light mt-5 text-2xl max-w-md mx-auto text-center md:mt-7">Don't have an account yet? <NavLink to='/auth/register'><span className='text-accent font-medium'>Sign up</span></NavLink></p>
      </form >
    </div >
  )
}
