import { FormEvent, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/auth/AuthContext';
import { LoadingButton } from '../../components/LoadingButton';
import { emailRegex } from '../../utils';

const formValidations = {
  name: [(value: string) => value.length >= 1, 'The name is required'],
  gender: [(value: string) => value === 'male' || value === 'female', 'The gender is required'],
  email: [(value: string) => emailRegex.test(value), 'The email is not valid'],
}

export const Register = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const { signUp, isButtonLoading } = useContext(AuthContext);

  const { name, gender, email, status, onChange, isFormValid, nameValid, genderValid, emailValid } = useForm({
    name: '',
    gender: '',
    email: '',
    status: 'active',
  }, formValidations)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true)

    if (!isFormValid) return;

    signUp({ name, gender, email, status })
  }

  return (
    <div className="w-11/12 mx-auto md:max-w-3xl">
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-font-strong text-5xl font-bold">Register</h1>
        <p className="text-font-light text-2xl max-w-xs mx-auto">Get access to your own posts by creating an account</p>
      </div>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-5 md:mb-7">
          <div className={`border flex justify-between items-center rounded-lg py-4 px-6 md:py-5 ${(!!nameValid && formSubmitted) && 'border-red-400'}`}>
            <input type="text" className="bg-transparent text-2xl w-full mr-6" placeholder="Name" id="name"
              name="name" onChange={(e) => onChange(e.target.value, 'name')} value={name} />
          </div>
          <span className="text-red-400 text-xl">{formSubmitted && nameValid}</span>
        </div >
        <div className="mb-5 md:mb-7">
          <div className={`border flex justify-between items-center rounded-lg py-4 px-6 md:py-5 ${(!!emailValid && formSubmitted) && 'border-red-400'}`}>
            <input type="email" className="bg-transparent text-2xl w-full mr-6" placeholder="Email" id="email"
              name="email" onChange={(e) => onChange(e.target.value, 'email')} value={email} />
          </div>
          <span className="text-red-400 text-xl">{formSubmitted && emailValid}</span>
        </div >
        <div>
          <div className={`border flex justify-between items-center rounded-lg py-4 px-6 md:py-5 ${(!!genderValid && formSubmitted) && 'border-red-400'}`}>
            <select id="gender" name="gender" onChange={(e) => onChange(e.target.value, 'gender')} defaultValue={""}>
              <option value="" disabled hidden>Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <span className="text-red-400 text-xl">{formSubmitted && genderValid}</span>
        </div >
        <LoadingButton text='Sign up' isLoading={isButtonLoading} />
        <p className="text-font-light mt-5 text-2xl max-w-md mx-auto text-center md:mt-7">Already have an account? <NavLink to='/auth/login'><span className='text-accent font-medium'>Sign in</span></NavLink></p>
      </form >
    </div >
  )
}
