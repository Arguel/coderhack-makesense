import google from './logo-google.png'
import './google.css'

const Google=({option})=>{

    if(option==='cuidadano'){
        return(
            <div className='register__google'>
                <img src={google} className='register__logo-google' alt="Logo de google" />
                <a href='/'>Continuar con Google</a>
            </div>
        )
    } 
    else return null    
} 

export default Google