import React, { useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../assets/style/style.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alertify from 'alertifyjs';
import Swal from 'sweetalert2'
import '../assets/style/style.css';

toast.configure()


const Nav = (props) => {


  
  const [perList,setPerList] = useState([])
  const [yetList,setYetList] = useState([])
  useEffect(() => {
      axios.get(process.env.REACT_APP_API+'personel/'+props.PersonelID)
          .then((response) => {
              setPerList(response.data);
          })
  },[props.PersonelID])
 
  useEffect(() => {
      axios.get(process.env.REACT_APP_API+'yetkili/'+props.PersonelID)
          .then((response) => {
              setYetList(response.data);
          })
  },[props.PersonelID])





const [talepList,setTalepList] = useState([])

const notificationNumberYetkili =   talepList.filter(tal => {
    return tal.personelID !== props.PersonelAd && tal.talepDurum === 0 && tal.talepTahminiDeger <= 10000
    && yetList.some(per =>  tal.departmanID === per.departmanID &&
      tal.sirketID === per.sirketID  &&
      tal.sektorID === per.sektorID)
})
const notificationNumberMudur = talepList.filter(tal => {
    return tal.personelID !== props.PersonelAd && tal.talepDurum === 0 && tal.talepTahminiDeger > 10000
    &&yetList.some(per =>  tal.departmanID === per.departmanID &&
    tal.sirketID === per.sirketID  &&
    tal.sektorID === per.sektorID)
    
    
})



  useEffect(() => {
    axios.get(process.env.REACT_APP_API+'talep/')
        .then((response) => {
     
            setTalepList(response.data);
        })
},[])

if(props.statuID === 2){
  if(notificationNumberYetkili.length > 0){
    
    setInterval(() => {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Onay bekleyen toplam ${notificationNumberYetkili.length} adet bildiriminiz var!`,
        showConfirmButton: false,
        timer:3000
      })
    }, 100*1000);
  }else{

  }}
// }else if(props.statuID === 3){
//   if(notificationNumberMudur.length > 0){
//     setInterval(() => {
//       Swal.fire({
//         position: 'center',
//         icon: 'warning',
//         title: `Onay bekleyen toplam ${notificationNumberMudur.length} adet bildiriminiz var!`,
//         showConfirmButton: false,

//       })
//     }, 100*1000);
//   }else{
 
//   }
// }


  // const logout = async () => {
  //   await fetch(process.env.REACT_APP_API+'Auth/logout',{
  //     method:'POST',
  //     headers:{'Content-Type':'application/json'},
  //     credentials:'include',
  // }).then(resp => {
  //   resp.status === 200 ? alertify.success("Çıkış işlemi başarılı") : alertify.success("Çıkış işlemi Başarısız")
  // });
  // document.location.reload(true)

  // }
///Auto logout

 
const [signoutTime, setSignoutTime] = useState(500000);
const [warningTime, setWarningTime] = useState(400000);
let warnTimeout;
let logoutTimeout;

const warn = () => {
  fetch(process.env.REACT_APP_API+'auth/user',{
    headers:{'Content-Type':'application/json'},
    credentials:'include'
}).then(resp => {
  if(resp.status === 200){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: `<h3 style='color:#facea8'>Çok uzun süre haraketsiz kaldın.</h3> <br/> <p style='color:#facea8'>Daha fazla haraketsiz kalırsan sistem kapanacak.</p>`,
      background:"transparent",
      showConfirmButton: false,
    })
  }
})
 
};
const logout = () => {
  
  fetch(process.env.REACT_APP_API+'auth/user',{
    headers:{'Content-Type':'application/json'},
    credentials:'include'
}).then(resp => {
  if(resp.status === 200){
     fetch(process.env.REACT_APP_API+'Auth/logout',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
  }).then(resp => {
    resp.status === 200 ? alertify.success("Çıkış yapılıyor") &&
      (document.location.href = 'http://localhost:3000/') : alertify.success("Çıkış işlemi Başarısız")
  });
 // <Redirect to="/login"/>
 // document.location.reload(true);
 
  }
})


}

// const destroy = () => {
//     console.log('Session destroyed');
// }
const setTimeouts = () => {
    warnTimeout = setTimeout(warn, warningTime);
    logoutTimeout = setTimeout(logout, signoutTime);
};

const clearTimeouts = () => {
    if (warnTimeout) clearTimeout(warnTimeout);
    if (logoutTimeout) clearTimeout(logoutTimeout);
};
useEffect(() => {

  const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
  ];

  const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
  };

  for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
  }

  setTimeouts();
  return () => {
      for(let i in events){
          window.removeEventListener(events[i], resetTimeout);
          clearTimeouts();
      }
  }
},[]);
///Auto logout




let menu;

if(props.PersonelAd == null){
    menu = (
 


<li class="nav-item dropdown pe-3">
    
  
      <Link to="/" className="nav-link">Login</Link>


  </li>


    )
}
else{
  menu = (

    <li class="nav-item dropdown pe-3">
    
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src={props.PersonelResim} style={{width:"30px",height:"30px"}} alt="Profile" class="rounded-circle"/>
              <span class="d-none d-md-block dropdown-toggle ps-2">{props.PersonelAd}</span>
            </a>
    
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li class="dropdown-header">
                <h6>{props.PersonelAd}</h6>
                <span>{props.PersonelEmail}</span>
              </li>
              <li>
                <hr class="dropdown-divider"/>
              </li>
    
              <li>
                <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i class="bi bi-person"></i>
                  <span><Link to="/profil" className="nav-link">My Profil</Link></span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider"/>
              </li>
    
              {/* <li>
                <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i class="bi bi-gear"></i>
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider"/>
              </li>
    
              <li>
                <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                  <i class="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </a>
              </li> */}
              <li>
                <hr class="dropdown-divider"/>
              </li>
    
              <li>
                <a class="dropdown-item d-flex align-items-center" href="logout">
                  <i class="bi bi-box-arrow-right"></i>
                  <span>
                  <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
                  </span>
                </a>
              </li>
    
            </ul>
          </li>


  )
}

const mudurYetkiliBildirim = talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(talp => {
    return talp.personelID !== props.PersonelAd && talp.talepDurum === 0 && talp.personelStatuID === 2
    &&   yetList.some(per =>  talp.departmanID === per.departmanID &&
      talp.sirketID === per.sirketID  &&
      talp.sektorID === per.sektorID)
  })
const mudurPersonelBildirim =   talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(talp => {
  return talp.personelID !== props.PersonelAd && talp.talepDurum === 0 && talp.talepTahminiDeger >10000 && talp.personelStatuID === 1
  &&  yetList.some(per =>  talp.departmanID === per.departmanID &&
    talp.sirketID === per.sirketID  &&
    talp.sektorID === per.sektorID)
})


//Personel Yetkili Bildirim
let notification;
if(props.statuID === 2){
  notification = (
  <li class="nav-item dropdown">
    
            <a class="nav-link nav-icon" data-bs-toggle="dropdown">
              <i class="bi bi-bell"></i>
              <span class="badge bg-primary badge-number" >
              {
                  talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(tal => {
                    return tal.personelID !== props.PersonelAd && tal.talepDurum === 0 && tal.talepTahminiDeger <= 10000
                    &&  yetList.some(per =>  tal.departmanID === per.departmanID &&
    tal.sirketID === per.sirketID  &&
    tal.sektorID === per.sektorID)
                  }).length
                  
                }

                
              </span>
            </a>
    
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            
              <li class="dropdown-header">
            
               <p style={{width:"300px"}}></p>
              </li>
              
              <li>
                <hr class="dropdown-divider"/>
              </li>
              {talepList.filter(talp => {
              return talp.personelID !== props.PersonelAd && talp.talepDurum===0 && talp.talepTahminiDeger < 10000
              &&  yetList.some(per =>  talp.departmanID === per.departmanID &&
    talp.sirketID === per.sirketID  &&
    talp.sektorID === per.sektorID)
              
              //|| talp.length === 0 
              
            }).slice(0,5).map(tal =>
            
            <a href="/sorumluPers">
              <li class="notification-item">
                <i class="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4> {tal.personelID}</h4>
                  <p> {tal.talepAciklamasi}</p>
                  <p>{tal.talepTarih}</p>
                </div>
              </li>
              </a>
              )}
           
    
        
         
    
              <li>
                <hr class="dropdown-divider"/>
              </li>
              <li class="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
    
            </ul>
    
          </li>
          )
}else if(props.statuID === 3){
 
  notification = (

  <li class="nav-item dropdown">
  
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-bell"></i>
              <span class="badge bg-primary badge-number" >
              {
                mudurPersonelBildirim.length +  mudurYetkiliBildirim.length
                } 
              </span>
            
            </a>
    
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            
              <li class="dropdown-header">
            
               <p style={{width:"300px"}}></p>
              </li>
              
              <li>
          <hr class="dropdown-divider"/>
              </li>
              {talepList.filter(talp => {
              return talp.personelID !== props.PersonelAd && talp.talepDurum===0
                && talp.talepTahminiDeger > 10000 && talp.personelStatuID === 1 && 
              yetList.some(per =>  talp.departmanID === per.departmanID &&
      talp.sirketID === per.sirketID  &&
      talp.sektorID === per.sektorID) 
              }).slice(0,3).map(tal =>
            
            <a href={tal.personelStatuID === 1 ? "/yoneticiPersonelOnay" : tal.personelStatuID === 2 ? "/yoneticiYetkiliOnay" : "/yoneticiOnay"}>
              <li class="notification-item">
                <i class="bi bi-exclamation-circle text-info"></i>
                <div>
              {tal.personelStatuID === 1 ? <h4 className="text-primary"> {tal.personelID}</h4>
              :<h4 className="text-warning"> {tal.personelID}</h4>}
                  
                  <p> {tal.talepAciklamasi}</p>
                  <p>{tal.talepTarih}</p>
                </div>
              </li>
              </a>
              )}
              {talepList.filter(talp => {
              return talp.personelID !== props.PersonelAd && talp.talepDurum===0  && talp.personelStatuID === 2
              &&   yetList.some(per =>  talp.departmanID === per.departmanID &&
      talp.sirketID === per.sirketID  &&
      talp.sektorID === per.sektorID)
              
              
              
            }).slice(0,2).map(tal =>
            
            <a href={tal.personelStatuID === 1 ? "/yoneticiPersonelOnay" : tal.personelStatuID === 2 ? "/yoneticiYetkiliOnay" : "/yoneticiOnay"}>
              <li class="notification-item">
                <i class="bi bi-exclamation-circle text-info"></i>
                <div>
              {tal.personelStatuID === 1 ? <h4 className="text-primary"> {tal.personelID}</h4>
              :<h4 className="text-warning"> {tal.personelID}</h4>}
                  
                  <p> {tal.talepAciklamasi}</p>
                  <p>{tal.talepTarih}</p>
                </div>
              </li>
              </a>
              )}
           
    
        
         
    
              <li>
                <hr class="dropdown-divider"/>
              </li>
              <li class="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
    
            </ul>
    
          </li>
          )
}
//Personel Yetkili Bildirim






    return (
      <  >
      <header id="header" class="header fixed-top d-flex align-items-center" >

      <div class="d-flex align-items-center justify-content-between">
  
      <a href="/profil" class="logo d-flex align-items-center">
        <span class="d-none d-lg-block">Talep App</span>
      </a>
         {/* <button id="sidebarMenu" className="btn btn-outline-secondary btn-sm" onClick={() => sidebarMenuClick()}> <i class="bi bi-list"></i></button> */}
     
    </div>
    
    
      <nav class="header-nav ms-auto" >
        <ul class="d-flex align-items-center">
    
          <li class="nav-item d-block d-lg-none">
            <a class="nav-link nav-icon search-bar-toggle " href="#">
              <i class="bi bi-search"></i>
            </a>
            
          </li>
          {/* <i class="bi bi-list toggle-sidebar-btn toggle-sidebar"></i> */}
          {notification}
    
          
    
          {menu}
        </ul>
      </nav>
    
    </header>
   

   {/* {Navbars} */}



 
  
    
   
    </>
    )
}

export default Nav;
