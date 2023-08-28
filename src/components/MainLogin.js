import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiLogo from "../img/API.png";


const MainLogin = () => {
  const navigate = useNavigate()
  const [handleInput, setHandleInput] = useState({ username:"", password:""});
 
  
  const handleField = (e) =>{
    setHandleInput({...handleInput, [e.target.name]:e.target.value})
  }
  
  const submtForm = async (e) =>{
    e.preventDefault();
    const username = handleInput.username;
    const password = handleInput.password;

    try {
      const response = await axios.post('https://login-api.web2rise.in/api/login', {username, password});
      const token = response.data.token;
      if(token){
        setHandleInput({ username:"", password:""})
        localStorage.setItem('token', token)
        navigationPage()
      }
    } catch (error) {
      console.error(error); 
    }
  }

  const navigationPage = () => {
    setTimeout(() => {
    const token= localStorage.getItem("token");
      if(token){
        navigate('/dashboard');
      }
    }, 2000);
  };


  return (
    <>
    <section className="background-radial-gradient overflow-hidden">
     <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div className="row gx-lg-5 align-items-center mb-5">
      <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: "10"}}>
        <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
          The best offer <br />
          <span style={{color: "hsl(218, 81%, 75%)"}}>for your business</span>
        </h1>
        <p className="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Temporibus, expedita iusto veniam atque, magni tempora mollitia
          dolorum consequatur nulla, neque debitis eos reprehenderit quasi
          ab ipsum nisi dolorem modi. Quos?
        </p>
      </div>
      <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <div className="card bg-glass">
          <div className="card-body px-4 py-5 px-md-5">
          <div className='apiogo'>
          <img src={ApiLogo} alt='API'/>
          </div>
            <form> 
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control" onChange={handleField} name='username' value={handleInput.username} />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>
 
              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" onChange={handleField} value={handleInput.password} name='password' className="form-control" />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>
 
              <button type="submit" className="btn btn-primary btn-block mb-4" onClick={submtForm}>
                Log In 
              </button>

              <div className="pt-1 userNamePswd"><p><b>username:-</b> prfxadmin</p><p><b>password:-</b> prfxpswd</p></div>

              <div className="text-center">
                <p>or sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fa fa-google" aria-hidden="true"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fa fa-twitter" aria-hidden="true"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fa fa-github" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default MainLogin
