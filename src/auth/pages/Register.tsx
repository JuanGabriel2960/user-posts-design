import { FormEvent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/auth/AuthContext';
import { User } from '../../interfaces/users';
import http from '../../api/http';

export const Register = () => {

  const { setUser } = useContext(AuthContext);

  const { name, gender, email, status, onChange } = useForm({
    name: '',
    gender: '',
    email: '',
    status: 'active',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await http.post<User>('/users', { name, gender, email, status }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
      })

      setUser(data)
    } catch (error: any) {
      console.log('An error ocurred. Please try again later.')
    }
  }

  return (
    <div className="w-11/12 mx-auto md:max-w-3xl">
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-font-strong text-5xl font-bold">Register</h1>
        <p className="text-font-light text-2xl max-w-xs mx-auto">Get access to your own posts by creating an account</p>
      </div>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-5 md:mb-7">
          <div className="border flex justify-between items-center rounded-lg py-4 px-6  md:py-5">
            <input type="text" className="bg-transparent text-2xl w-full mr-6" placeholder="Name" id="name"
              name="name" onChange={(e) => onChange(e.target.value, 'name')} value={name} />
          </div>
        </div >
        <div className="mb-5 md:mb-7">
          <div className="border flex justify-between items-center rounded-lg py-4 px-6 md:py-5">
            <input type="email" className="bg-transparent text-2xl w-full mr-6" placeholder="Email" id="email"
              name="email" onChange={(e) => onChange(e.target.value, 'email')} value={email} />
          </div>
        </div >
        <div>
          <div className="border flex justify-between items-center rounded-lg py-4 px-6 md:py-5">
            <select id="gender" name="gender" onChange={(e) => onChange(e.target.value, 'gender')} defaultValue={""}>
              <option value="" disabled hidden>Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div >
        <button
          className="bg-accent text-white mt-10 py-5 font-bold rounded-lg w-full md:py-6 md:mt-14">Sign up</button>
        <p className="text-font-light mt-5 text-2xl max-w-md mx-auto text-center md:mt-7">Already have an account? <NavLink to='/auth/login'><span className='text-accent font-medium'>Sign in</span></NavLink></p>
      </form >
    </div >
  )
}
