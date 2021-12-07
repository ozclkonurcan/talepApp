import React,{useEffect,useState}from 'react'
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Nav from './components/Nav';
//import Sidebar  from './components/SideBar'
import Home from './pages/Home';
import Profil from './pages/Profil'
import {BrowserRouter,Route} from 'react-router-dom'
import PersonelTalep from './components/personel/PersonelTalep';
import PersonelTalepListesi from './components/personel/PersonelTalepListesi';
import YetkiliTalep from './components/yetkili/YetkiliTalep';
import YetkiliTalepListesi from './components/yetkili/YetkiliTalepListesi';
import SorumluPers from './components/yetkili/sorumluPers/SorumluPers';
import OnaylıPersonelDurum from './components/yetkili/sorumluPers/OnaylıPersonelDurum';
import OnaysızPersonelDurum from './components/yetkili/sorumluPers/OnaysızPersonelDurum';
import OnaylıPersonel from './components/personel/OnayDurum/OnaylıPersonel';
import OnaysızPersonel from './components/personel/OnayDurum/OnaysızPersonel';
import BekleyenOnayPersonel from './components/personel/OnayDurum/BekleyenOnayPersonel';
import YoneticiOnay from './components/Mudur/YoneticiOnay';
import YetkiliOnayBekleyen from './components/Mudur/Yetkili/YetkiliOnayBekleyen';
import YetkiliOnayli from './components/Mudur/Yetkili/YetkiliOnayli';
import YetkiliOnaysiz from './components/Mudur/Yetkili/YetkiliOnaysiz';
import PersonelOnayBekleyen from './components/Mudur/Personel/PersonelOnayBekleyen';
import PersonelOnayli from './components/Mudur/Personel/PersonelOnayli';
import PersonelOnaysiz from './components/Mudur/Personel/PersonelOnaysiz';
import YetkiliBekleyenDurum from './components/yetkili/YetkiliBekleyenDurum'
import YetkiliOnayDurum from './components/yetkili/YetkiliOnayDurum'
import YetkiliOnaysızDurum from './components/yetkili/YetkiliOnaysızDurum'
import YetkiliPersonelOnaylama from './components/yetkili/sorumluPers/YetkiliPersonelOnaylama';

import YoneticiPersonelOnay from './components/Mudur/YoneticiPersonelOnay';
import YoneticiYetkiliOnay from './components/Mudur/YoneticiYetkiliOnay';

//ADMİN//
import Yetki from './components/Admin/Yetki/Yetki';
import Departman from './components/Admin/Departman/Departman';
import Cinsiyet from './components/Admin/Cinsiyet/Cinsiyet';

import Personel from './components/Admin/Personel/Personel';
import PersonelEkle from './components/Admin/Personel/PersonelEkle';
import PersonelGuncelle from './components/Admin/Personel/PersonelGuncelle';

import Sirket from './components/Admin/Sirket/Sirket';
import Sektor from './components/Admin/Sektor/Sektor'
import YetkiEkle from './components/Admin/Yetki/YetkiEkle';
import YetkiGuncelle from './components/Admin/Yetki/YetkiGuncelle';
import DepartmanEkle from './components/Admin/Departman/DepartmanEkle';
import DepartmanGuncelle from './components/Admin/Departman/DepartmanGuncelle';

//React-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YetkiliPersonelListesi from './components/Admin/YetkiliPersonel/YetkiliPersonelListesi';
import YetkiliPersonelEkle from './components/Admin/YetkiliPersonel/YetkiliPersonelEkle';
import YetkiliPersonelGuncelle from './components/Admin/YetkiliPersonel/YetkiliPersonelGuncelle';
import SideBar from './components/SideBar';
import PasifYetkili from './components/Mudur/PasifYetkili';
import PasifPersonel from './components/yetkili/PasifPersonel';

toast.configure()

const App = () => {
  const [personelID,setPersonelID] = useState('');
  const [personelAd,setPersonelAd] = useState('');
  const [personelResim,setPersonelResim] = useState('');
  const [personelCinsiyet,setPersonelCinsiyet] = useState('');
  const [personelSektorID,setPersonelSektorID] = useState('');
  const [personelSirketID,setPersonelSirketID] = useState('');
  const [personelDepartmanID,setPersonelDepartmanID] = useState('');
  const [personelTel,setPersonelTel] = useState('');
  const [personelEmail,setPersonelEmail] = useState('');
  const [personelPassword,setPersonelPassword] = useState('');
  const [personelStatuID,setPersonelStatuID] = useState('');
  const [yetkiliButce,setYetkiliButce] = useState('');
  const [durumID,setDurumID] = useState('');

  
  // const [user,setUser]=useState(false);
  // if (response.status !== 200) {
  //   console.log('Looks like there was a problem. Status Code: ' +
  //     response.status);
  //   return;
  // }
  // if(response.status===200){
  //   setUser(true)
  // }
  ///

  const [user,setUser] = useState('');

   useEffect( () => {
    (
      async () => {
      const response = await fetch(process.env.REACT_APP_API+'auth/user',{
          headers:{'Content-Type':'application/json'},
          credentials:'include'
      });
      const content = await response.json();
   
      setPersonelID(content.personelID);
      setPersonelAd(content.personelAd);
      setPersonelResim(process.env.REACT_APP_PHOTOPATH+content.personelResim);
      setPersonelCinsiyet(content.personelCinsiyet);
      setPersonelSektorID(content.sektorID);
      setPersonelSirketID(content.sirketID);
      setPersonelDepartmanID(content.departmanID);
      setPersonelTel(content.personelTel);
      setPersonelEmail(content.personelEmail);
      setPersonelPassword(content.personelPassword);
      setPersonelStatuID(content.statuID);
      setYetkiliButce(content.yetkiliButce);
      setDurumID(content.durumID);

      if(response.status === 200){
        setUser(true)
      }
    
      }

    )();

   });
   
   if(!user){
   return(
     <div className="row g-0" style={{marginLeft:"75px"}}>
       <div className="col-md-2"></div>
       <div className="col-md-9">
       <BrowserRouter>
      
         <Route exact path="/" component={() => <Login
         DurumID={durumID}
         
         />} />
     

     
       </BrowserRouter>
       </div>
     </div>
   )}else{
  return (
    <div>
    <BrowserRouter>
    <div className="row g-0">
      <div className="col-md-12">
      <Nav
       
PersonelID={personelID}
PersonelAd = {personelAd}
 PersonelEmail={personelEmail}   
statuID={personelStatuID}
PersonelResim={personelResim}
setPersonelEmail={setPersonelEmail}/>


      </div>
    </div>
<div className="row g-0" style={{marginTop:"70px",marginRight:"20px"}}>
<div className="col-md-2">
  
<SideBar PersonelID={personelID}
PersonelAd = {personelAd}
 PersonelEmail={personelEmail}   
statuID={personelStatuID}
PersonelResim={personelResim}
setPersonelEmail={setPersonelEmail}/>
</div>
  <div className="col-md-10" >

  <Route path="/home" exact component={() => <Home
 PersonelEmail={personelEmail}
 PersonelID={personelID}

/>} />

<Route exact path="/errorPage" component={ErrorPage} />
<Route exact path="/" component={ErrorPage} />
<Route path="/pasiftalepyetkili" component={() => <PasifPersonel 
  PersonelID={personelID}
  statuID={personelStatuID}
  PersonelAd = {personelAd}
  PersonelEmail={personelEmail} 
  PersonelTel={personelTel}
  PersonelPassword={personelPassword}
  PersonelDepartmanID={personelDepartmanID}
  PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  YetkiliButce={yetkiliButce}
  PersonelResim={personelResim}
  DurumID={durumID}

/>} />
<Route path="/pasiftalepyonetici" component={() => <PasifYetkili 
  PersonelID={personelID}
  statuID={personelStatuID}
  PersonelAd = {personelAd}
  PersonelEmail={personelEmail} 
  PersonelTel={personelTel}
  PersonelPassword={personelPassword}
  PersonelDepartmanID={personelDepartmanID}
  PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  YetkiliButce={yetkiliButce}
  PersonelResim={personelResim}
  DurumID={durumID}
  YetkiliButce={yetkiliButce}
/>} />
<Route path="/profil" component={() => <Profil 
  PersonelID={personelID}
  statuID={personelStatuID}
  PersonelAd = {personelAd}
  
  YetkiliButce={yetkiliButce}
  PersonelEmail={personelEmail} 
  PersonelTel={personelTel}
  PersonelPassword={personelPassword}
  PersonelDepartmanID={personelDepartmanID}
  PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  YetkiliButce={yetkiliButce}
  PersonelResim={personelResim}

/>} />





{/* Admin */}
<Route path="/statuListele" component={() => <Yetki/>}/>
<Route path="/statuEkle" component={() => <YetkiEkle/>}/>
<Route path="/statuGuncelle" component={() => <YetkiGuncelle/>}/>
<Route path="/cinsiyetListele" component={() => <Cinsiyet/>}/>

<Route path="/departmanListele" component={() => <Departman/>}/>
<Route path="/departmanEkle" component={() => <DepartmanEkle/>}/>
<Route path="/departmanGuncelle" component={() => <DepartmanGuncelle/>}/>


<Route path="/personelListele" component={() => <Personel/>}/>
<Route path="/personelEkle" component={() => <PersonelEkle/>}/>
<Route path="/personelGuncelle" component={() => <PersonelGuncelle/>}/>

<Route path="/sirketListele" component={() => <Sirket/>}/>
<Route path="/sektorListele" component={() => <Sektor/>}/>



<Route path="/yetkilipersonellistele" component={() => <YetkiliPersonelListesi/>} />
<Route path="/yetkilipersonelekle" component={() => <YetkiliPersonelEkle/>} />
<Route path="/yetkilipersonelguncelle" component={() => <YetkiliPersonelGuncelle/>} />
{/* Admin */}




{/* Personel */}
<Route path="/PersonelTalep" component={() => <PersonelTalep
  PersonelID={personelID}
  PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  PersonelDepartmanID={personelDepartmanID}
  PersonelStatuID={personelStatuID}
  PersonelEmail={personelEmail} 
  PersonelAd={personelAd}
  PersonelResim={personelResim}
  
/>}/>
<Route path="/PersonelTalepListesi" component={() => <PersonelTalepListesi
  PersonelAd={personelAd}
/>}/>
<Route path="/onaylıPersonel" component={() => <OnaylıPersonel
  PersonelAd={personelAd}
/>}/>
<Route path="/onaysızPersonel" component={() => <OnaysızPersonel
  PersonelAd={personelAd}
/>}/>
<Route path="/bekleyenOnayPersonel" component={() => <BekleyenOnayPersonel
  PersonelAd={personelAd}
/>}/>

{/* Personel */}


<Route path="/yetkiliBekleyenDurum" component={() => <YetkiliBekleyenDurum
  PersonelAd={personelAd}
/>}/>
<Route path="/yetkiliOnayDurum" component={() => <YetkiliOnayDurum
  PersonelAd={personelAd}
/>}/>
<Route path="/yetkiliOnaysızDurum" component={() => <YetkiliOnaysızDurum
  PersonelAd={personelAd}
/>}/>


<Route path="/YetkiliTalep" component={() => <YetkiliTalep
   PersonelID={personelID}
  PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  PersonelDepartmanID={personelDepartmanID}
  PersonelEmail={personelEmail} 
  PersonelStatuID={personelStatuID}
  PersonelResim={personelResim}
/>}/>

<Route path="/YetkiliTalepListesi" component={() => <YetkiliTalepListesi
  PersonelAd={personelAd}
  PersonelDepartmanID={personelDepartmanID}
/>}/>
<Route path="/sorumluPers" component={() => <SorumluPers
PersonelID={personelID}
  PersonelAd={personelAd}
  PersonelDepartmanID={personelDepartmanID}
  YetkiliButce={yetkiliButce}
/>}/>
<Route path="/yetkiliPersonelOnaylama" component={() => <YetkiliPersonelOnaylama
PersonelID={personelID}
  PersonelAd={personelAd}
  PersonelDepartmanID={personelDepartmanID}
  YetkiliButce={yetkiliButce}
  PersonelResim={personelResim}
/>}/>
<Route path="/onaylıpersoneldurum" component={() => <OnaylıPersonelDurum
PersonelID={personelID}
  PersonelAd={personelAd}
  PersonelDepartmanID={personelDepartmanID}
/>}/>
<Route path="/onaysızpersoneldurum" component={() => <OnaysızPersonelDurum
PersonelID={personelID}
  PersonelAd={personelAd}
  PersonelDepartmanID={personelDepartmanID}
/>}/>


{/* Yonetici */}
<Route path="/yoneticiOnay" component={() => <YoneticiOnay
PersonelID={personelID}
   PersonelAd={personelAd}
   PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  PersonelDepartmanID={personelDepartmanID}
/>} />


<Route path="/mudurYetkiliOnayli" component={() => <YetkiliOnayli 
PersonelID={personelID}/>}/>
<Route path="/mudurYetkiliOnaysiz" component={() => <YetkiliOnaysiz 
PersonelID={personelID} />}/>
<Route path="/mudurYetkiliOnayBekleyen" component={() => <YetkiliOnayBekleyen PersonelID={personelID} />}
/>

<Route path="/mudurPersonelOnayBekleyen" component={() => <PersonelOnayBekleyen 
PersonelID={personelID}/>}/>
<Route path="/mudurPersonelOnayli" component={() => <PersonelOnayli
PersonelID={personelID}/>}/>
<Route path="/mudurPersonelOnaysiz" component={() => <PersonelOnaysiz
PersonelID={personelID}/>}/>

<Route path="/yoneticiYetkiliOnay" component={() => <YoneticiYetkiliOnay 
PersonelID={personelID}
      PersonelAd={personelAd}
   PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  PersonelDepartmanID={personelDepartmanID}
  PersonelEmail={personelEmail}
  PersonelResim={personelResim}
/>} />
<Route path="/yoneticiPersonelOnay" component={() => <YoneticiPersonelOnay
PersonelID={personelID}
     PersonelAd={personelAd}
   PersonelSektorID={personelSektorID}
  PersonelSirketID={personelSirketID}
  PersonelDepartmanID={personelDepartmanID}
  PersonelEmail={personelEmail}
  PersonelResim={personelResim}
/>} />


{/* Yonetici */}


  </div>
</div>

      </BrowserRouter>
      
    </div>
  )}
}

export default App
