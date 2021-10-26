import React,{useState} from 'react';
import { useHistory } from 'react-router';
import  '../style.css';
const Sign = (props) => {
    const history = useHistory();
    const [otp,setotp] = useState(null);
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");

    const handleChange1 = (e)=>{
        setname(e.target.value);
    }
    const handleChange2 = (e)=>{
        setpassword(e.target.value);
    }
    const handleChange3 = (e)=>{
        setemail(e.target.value);
    }
    const handleChange7 = (e)=>{
      setotp(e.target.value);
    }

    const handleSubmit1 = async (e)=>{
      e.preventDefault();

      const response = await fetch ("http://localhost:5000/api/auth/createUser",{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name:name, password: password,email:email})
        });
        if(response.status===200){
            history.push("/login");
            props.showAlert("Account Created Successfully!!","success");
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
        setotp(null);
  }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setotp(123);
    }
    return (
        <>
            
  <div className="d-md-flex half">
    <div className="bg hello"></div>
    <div className="contents">

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-12">
            <div className="form-block mx-auto">
              <div className="text-center mb-5">
              <h3>Sign Up to <strong>E-Commerce</strong></h3>
              </div>
              {otp===null?(
              <form >
                <div className="form-group first">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" value={name} onChange={handleChange1}  placeholder="Your Name" id="username"/>
                </div>
                <div className="form-group last mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" value={password} onChange={handleChange2} placeholder="Your Password" id="password"/>
                </div>
                <div className="form-group last mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" value={email} onChange={handleChange3}  placeholder="your-email@gmail.com" id="email"/>
                </div>
                <input type="submit" value="Proceed" className="btn btn-block btn-primary" onClick={handleSubmit1}/>
              </form>):(
              <form >
                <div className="form-group first my-3">
                  <label htmlFor="username"></label>
                  <input type="text" className="form-control" value={otp} onChange={handleChange7}  placeholder="Enter the OTP send to your email" id="username"/>
                </div>
                <input type="submit" value="Sign Up" className="btn btn-block btn-primary" onClick={handleSubmit1}/>
              </form>)}
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </div>
    
    

        </>
    )
}

export default Sign
