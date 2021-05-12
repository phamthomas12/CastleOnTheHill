import axios from "axios";
import React,{useState, useRef, useEffect} from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
    Image
  } from "semantic-ui-react";
  import {Link} from "react-router-dom";
  import { useHistory } from "react-router-dom";
  // import uploadPicCloundinary from "../../utils/uploadPicCloundinary";
  // import defaultUser from "../../assets/images/defaultUser";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [image, setImage] = useState("");
  const [url,setUrl] = useState(undefined)
  let history = useHistory()

    useEffect(()=>{
        if(url){
          uploadUser()}
        },[url])

    const uploadImage = async e => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "ITHubProject");
      
        const res = await fetch("https://api.cloudinary.com/v1_1/wendyvo/image/upload", {
        method: "POST",
        body: data
    })
      .then(res=>res.json())
      .then(data=>{
         setUrl(data.url)
      })
      .catch(err=>{
          console.log(err)
      })

    }

    const uploadUser = () => {
      const user = {
        name,
        email,
        password,
        password2,
        profilePicUrl:url
      }
      axios.post("/api/user/signup",user).then((res) => {
        history.push("/login");
        });
    };

    const PostUser = () => {
      if(image) {
        uploadImage()
      } else {
        uploadUser()
      }
    }

    return (
      <Grid textAlign='center' style={{ height: '150vh'}} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' /> Log-in to your account */}
            Create a new Account
          </Header>
            <Form size='large'>
            <Segment stacked>
            <Form.Input label="Full Name" type="text"  
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Full Name" 
                        required />
               
            <Form.Input label="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="E-mail" 
                        required />
            
            <Form.Input label="Password"  
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        type="password" 
                        required />
            
            <Form.Input label="Confirm Password"  
                        onChange={(e) => setPassword2(e.target.value)} 
                        placeholder="Confirm Password" 
                        type="password" 
                        required/>
            
            <Button color='teal' 
                    fluid size='large'  
                    onClick={()=>PostUser()}>
                Sign Up
            </Button>
            </Segment>
            </Form>
          <Message>
            Already created an account <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
}

export default SignUp;