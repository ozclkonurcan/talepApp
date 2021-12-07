
import React, { useState} from 'react'
import '../assets/style/login.css'
import {Redirect} from 'react-router-dom'
import '../pages/Login.css'
import swal from 'sweetalert'

const Login = (props) => {
    const [PersonelEmail,setPersonelEmail] = useState('');
    const [PersonelPassword,setPersonelPassword] = useState('');
    const [DurumID,setDurumID] = useState(props.DurumID);
    const [redirect,setRedirect] = useState(false);

	


    const submit = async (e) => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_API+'Auth/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({
                PersonelEmail,
                PersonelPassword,
				DurumID
            })
        }).then(resp => {
			
			if(resp.status === 200){
				setRedirect(true) 
		
		
		  window.location.reload(true)
			}else{
				swal({
					title: "Hatalı Giriş!",
					text: "Kullanıcı Email yada Şifre Hatalı!",
					icon: "error"
				  });
			}
		})
       
	
    }


	setTimeout(() => {
		document.querySelector('.Login').classList.remove('size')
	}, 0.2);

	
	
		
	if(redirect){
        return <Redirect to="/profil" />;
    }
	



    return (
        <div className=" container-fluid" style={{marginTop:"100px"}} >
       


        <main class="d-flex w-100 Login size">
		<div class="container d-flex flex-column">
			<div class="row vh-90">
				<div class=" col-md-6 mx-auto h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center">
							<h1 class="h2">Login</h1>
							<p class="lead">
								
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-5">
								
                                <form onSubmit={submit}>
										<div class="mb-4">
											<label class="form-label">Email</label>
											<input class="form-control form-control-lg" type="email" 
                                            required
                                            onChange={e => setPersonelEmail(e.target.value)} placeholder="Enter your email" />
										</div>
										<div class="mb-4">
											<label class="form-label">Password</label>
											<input class="form-control form-control-lg" type="password" 
                                            required
                                            
                                             onChange={e => setPersonelPassword(e.target.value)} placeholder="Enter your password" />
					
										</div>
										<div>
			
										</div>
										<div class="text-center mt-3">
											<button type="submit" class="btn btn-lg btn-primary" >Giriş Yap</button>
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
        
	</main>



	


           </div>
    )
}


export default Login;


