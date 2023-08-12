import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Swal from 'sweetalert2'
import { signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase-config";


const LoginUser = () => {
  const navigate = useNavigate();

  const [icon, setIcon] = useState("ic:outline-remove-red-eye");
  const [loading, setLoading] = useState(false)
  const [email,setEmail] =useState('')
  const [password, setPassword] =useState('')

  const handleVisible = () => {
    let password = document.getElementById("myInput");
    if (password.type === "password") {
      password.type = "text";
      setIcon("mdi:eye-off-outline");
    } else {
      password.type = "password";
      setIcon("ic:outline-remove-red-eye");
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true)
      const user = await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      const userName = user.user.email
      const newUserSplit = userName.split('@')
      Swal.fire(
        `Hello ${newUserSplit[0]} !`,
        'Login Successfull',
        'success'
      )
      navigate("/")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Got it'
      })
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex justify-center min-h-screen w-full m-0 p-0 items-center border">
        <div className=" relative h-96 w-[full] md:w-[500px]  flex-col justify-center items-center ">
          <Input
            variant="flushed"
            className=" w-[full] md:w-[500px]  "
            placeholder="Email"
            type="text"
            p="5"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <InputGroup
            size="md"
            mb="1.5"
            mt="1.5"
            className=" w-[full] md:w-[500px] "
          >
            <Input
              variant="flushed"
              placeholder="Password"
              type="password"
              id="myInput"
              p="5"
              className=" w-[full] md:w-[500px] "
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <InputRightElement>
              <Icon onClick={handleVisible} icon={icon} />
            </InputRightElement>
          </InputGroup>
          <Button
            colorScheme="gray"
            bgColor="#DEF5E5"
            mt="6"
            w="full"
            rounded="12px"
            onClick={handleLogin}
            isDisabled={loading}
          >
            Log in
          </Button>
     
          <p className=" text-sm text-center mt-4 text-slate-500 ">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-sm text-[#8EC3B0] font-semibold ">
                Register
              </span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginUser;
