import {
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {  useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Swal from 'sweetalert2'
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase-config";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const [icon, setIcon] = useState("ic:outline-remove-red-eye");
  const [icon2, setIcon2] = useState("ic:outline-remove-red-eye");

  const handleRegister = async () => {
    setLoading(true)
    try {
      const user = await createUserWithEmailAndPassword(auth,email,password)
      setEmail('')
      setPassword('')
      setRepeatPassword('')
      const userName = user.user.email
      const newUserSplit = userName.split('@')
      console.log(user.user.email)
      Swal.fire({
        title : `Good job ${newUserSplit[0]} !`,
        text : "Register your account successfull",
        icon : 'success',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        } 
      })
      setLoading(false)
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Got it'
      })
    }
  };

  const handleErrorPassword=(e)=> {
       setRepeatPassword(e)
    if (password !== e){
      setError('Password and repeat password not same field')
    }else {
      setError('')
    }
  }

  const handleVisible = () => {
    let password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
      setIcon("mdi:eye-off-outline");
    } else {
      password.type = "password";
      setIcon("ic:outline-remove-red-eye");
    }
  };

  const handleVisible2 = () => {
    let repeat = document.getElementById("repeat-password");
    if (repeat.type === "password") {
      repeat.type = "text";
      setIcon2("mdi:eye-off-outline");
    } else {
      repeat.type = "password";
      setIcon2("ic:outline-remove-red-eye");
    }
  };

  return (
    <section className="bg-gray-50">
      <Navbar />
      <div
        className="flex flex-col items-center justify-center px-6 py-8 
        mx-auto md:h-screen lg:py-0"
      >
        <span
          className="flex items-center mb-6 text-2xl font-semibold
           text-gray-900"
        >
          Registration Form
        </span>
        <div
          className="w-full bg-white rounded-lg shadow dark:border 
          md:mt-0 sm:max-w-md xl:p-0 "
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300
                     text-gray-900 sm:text-sm rounded-lg 
                     focus:ring-primary-600 focus:border-primary-600 
                     block w-full p-2.5"
                placeholder="name@mail.com"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <InputGroup>
                <input
                onChange={(e)=> setPassword(e.target.value)}
                  type="password"
                  id ="password"
                  value={password}
                  placeholder="Input your password"
                  className="bg-gray-50 border border-gray-300
                       text-gray-900 sm:text-sm rounded-lg 
                       focus:ring-primary-600 focus:border-primary-600 
                       block w-full p-2.5"
                />

                <InputRightElement>
                  <Icon
                    onClick={handleVisible}
                    icon={icon} 
                  />
                </InputRightElement>
              </InputGroup>
              <h1 className="text-xs text-red-700 p-1 h-2 " >{error}</h1>
            </div>
            <div>
              <label
                for="repeat-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Repeat Password
              </label>
              <InputGroup>
                <input
                onChange={(e)=> handleErrorPassword(e.target.value)}
                  type="password"
                  id ="repeat-password"
                  value={repeatPassword}
                  placeholder="Input your repeat password"
                  className="bg-gray-50 border border-gray-300
                       text-gray-900 sm:text-sm rounded-lg 
                       focus:ring-primary-600 focus:border-primary-600 
                       block w-full p-2.5 "
                />
                <InputRightElement>
                  <Icon
                    onClick={handleVisible2}
                    icon={icon2} 
                  />
                </InputRightElement>
              </InputGroup>
              <h1 className="text-xs text-red-700 p-1 h-2 " >{error}</h1>
            </div>
            <div>
              <Button
              isDisabled={error || !email || !password || !repeatPassword|| loading}
                colorScheme="whatsapp"
                className="w-full text-white bg-primary-600 
                    hover:bg-primary-700 focus:ring-4 focus:outline-none 
                    focus:ring-primary-300 font-medium rounded-lg text-sm 
                    px-5 py-2.5 text-center "
                onClick={handleRegister}
              >
                Create an account
              </Button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{" "}
                <Link to="/login">
                  <a
                    href="true"
                    className="font-medium hover:underline 
                      text-[#69cb44] text-500"
                  >
                    Login here
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
