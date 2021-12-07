import React, { useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../assets/style/style.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alertify from 'alertifyjs';
import Swal from 'sweetalert2'
import '../assets/style/style.css';
const SideBar = (props) => {

  
let Navbars;
//Personel Yetkili
if(props.statuID === 2){
  Navbars = (


<aside id="sidebar" class="sidebar" style={{width:"230px"}}>


<ul class="sidebar-nav" id="sidebar-nav">

  {/* <li class="nav-item">
  <Link to="/profil" className="nav-link collapsed">
          <i class="bi bi-grid"></i>
          <span>Home</span>
          </Link>
      </li> */}

  <li class="nav-item">
  <Link to="/yetkiliTalep" className="nav-link collapsed">
      <i class="bi bi-grid"></i>
      <span>
     Yetkili Talep
      </span>
      </Link>
  </li>
  <li class="nav-item">
  <Link to="/yetkiliPersonelOnaylama" className="nav-link collapsed">
      <i class="bi bi-grid"></i>
      <span>
     Personel Onay
      </span>
      </Link>
  </li>


  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#yetkili-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Yetkili</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="yetkili-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/yetkiliBekleyenDurum" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onay Bekleyen
              </span>
              </Link>
          </li>
          <li>
          <Link to="/yetkiliOnayDurum" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onaylanmış
              </span>
              </Link>
          </li>
          <li>
          <Link to="/yetkiliOnaysızDurum" className="nav-link text-black collapsed">
              <i class="bi bi-circle"></i><span className=" text-decoration-none">
              
              Onaylanmamış
              </span>
              </Link>
          </li>
       
       
        </ul>
      </li>
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Personel</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/sorumluPers" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Personel
              </span>
              </Link>
          </li>
          <li>
          <Link to="/onaylıpersoneldurum" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onaylanmış
              </span>
              </Link>
          </li>
          <li>
          <Link to="/onaysızpersoneldurum" className="nav-link text-black collapsed">
              <i class="bi bi-circle"></i><span className=" text-decoration-none">
              
              Onaylanmamış
              </span>
              </Link>
          </li>
       
       
        </ul>
      </li>
    

  <li class="nav-heading">Pages</li>

  <li class="nav-item">
  <Link to="/pasiftalepyetkili" className="nav-link text-black collapsed">
      <i class="bi bi-person"></i>
      <span>Pasif Talepler</span>
   </Link>
  </li>
  <li class="nav-item">
  <Link to="/profil" className="nav-link text-black collapsed">
      <i class="bi bi-person"></i>
      <span>Profile</span>
   </Link>
  </li>
</ul>

</aside>

  )
}
//Personel Yetkili
//////////////////
//Personel Yönetici
else if(props.statuID === 3){
  Navbars = (

    <aside id="sidebar" class="sidebar" style={{width:"230px"}}>
<ul class="sidebar-nav" id="sidebar-nav">

  {/* <li class="nav-item">
  <Link to="/profil" className="nav-link collapsed">
          <i class="bi bi-grid"></i>
          <span>Home</span>
          </Link>
      </li> */}

  
  <li class="nav-item">
  <Link to="/yoneticiOnay" className="nav-link collapsed">
      <i class="ri-survey-line"></i>
      <span>
      Personel Listesi
      </span>
      </Link>
  </li>
  <li class="nav-item">
  <Link to="/yoneticiYetkiliOnay" className="nav-link collapsed">
      <i class="bi bi-person"></i>
      <span>
      Yetkili Onay
      </span>
      </Link>
  </li>
  <li class="nav-item">
  <Link to="/yoneticiPersonelOnay" className="nav-link collapsed">
      <i class="ri-team-line"></i>
      <span>
      Personel Onay
      </span>
      </Link>
  </li>
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#Yetkili-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Yetkili</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="Yetkili-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
        <li>
          <Link to="/mudurYetkiliOnayBekleyen" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onay bekleyen talep
              </span>
              </Link>
          </li>
          <li>
          <Link to="/mudurYetkiliOnayli" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onaylanmış talep
              </span>
              </Link>
          </li>
          <li>
          <Link to="/mudurYetkiliOnaysiz" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onaylanmamış talep
              </span>
              </Link>
          </li>
        
       
       
        </ul>
      </li>
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#Personel-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Personel</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="Personel-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/mudurPersonelOnayBekleyen" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onay bekleyen talep
              </span>
              </Link>
          </li>
          <li>
          <Link to="/mudurPersonelOnayli" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onaylanmış talep
              </span>
              </Link>
          </li>
          <li>
          <Link to="/mudurPersonelOnaysiz" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onaylanmamış talep
              </span>
              </Link>
          </li>
         
       
       
        </ul>
      </li>
    

  <li class="nav-heading">Pages</li>

<li class="nav-item">
  <Link to="/pasiftalepyonetici" className="nav-link text-black collapsed">
      <i class="bi bi-person"></i>
      <span>Pasif Talepler</span>
   </Link>
  </li>
  <li class="nav-item">
  <Link to="/profil" className="nav-link text-black collapsed">
      <i class="bi bi-person"></i>
      <span>Profile</span>
   </Link>
  </li>
</ul>

</aside>


  )
}
//Personel Yönetici
///////////////////
//Personel yetkisiz
else if(props.statuID === 1){
  Navbars = (
<aside id="sidebar" class="sidebar " style={{width:"230px"}}>

<ul class="sidebar-nav" id="sidebar-nav">

  {/* <li class="nav-item">
  <Link to="/profil" className="nav-link collapsed">
          <i class="bi bi-grid"></i>
          <span>Home</span>
          </Link>
      </li> */}

  <li class="nav-item">
  <Link to="/personelTalep" className="nav-link collapsed">
      <i class="ri-contacts-fill"></i>
      <span>
      Personel
      </span>
      </Link>
  </li>
  <li class="nav-item">
  <Link to="/personeltaleplistesi" className="nav-link collapsed" >
      <i class="ri-file-list-line"></i>
      <span>
     Talep Listesi
      </span>
      </Link>
  </li>

  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Personel</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/bekleyenOnayPersonel" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Personel
              </span>
              </Link>
          </li>
          <li>
          <Link to="/onaylıPersonel" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Onaylanmış
              </span>
              </Link>
          </li>
          <li>
          <Link to="/OnaysızPersonel" className="nav-link text-black collapsed">
              <i class="bi bi-circle"></i><span className=" text-decoration-none">
              
              Onaylanmamış
              </span>
              </Link>
          </li>
       
       
        </ul>
      </li>
    

  <li class="nav-heading">Pages</li>

  <li class="nav-item">
  <Link to="/profil" className="nav-link text-black collapsed">
      <i class="bi bi-person"></i>
      <span>Profile</span>
   </Link>
  </li>
</ul>

</aside>

  
  )
//Admin bölümü
}else if(props.statuID === 4){
  Navbars = (
<aside id="sidebar" class="sidebar" style={{width:"230px"}}>

<ul class="sidebar-nav" id="sidebar-nav">

  {/* <li class="nav-item">
  <Link to="/profil" className="nav-link collapsed">
          <i class="bi bi-grid"></i>
          <span>Home</span>
          </Link>
      </li> */}



  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#statu-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Statu</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="statu-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/statuListele" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Statu Listele
              </span>
              </Link>
          </li>
          <li>
          <Link to="/statuEkle" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Statu Ekle
              </span>
              </Link>
          </li>
      
          <li>
          <Link to="/statuGuncelle" className="nav-link text-black collapsed">
              <i class="bi bi-circle"></i><span className=" text-decoration-none">
              
              Statu Güncelle
              </span>
              </Link>
          </li>
       
       
        </ul>
      </li>
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#persyetki-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Yetkilendirme</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="persyetki-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/yetkilipersonellistele" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
             Yetkili Personel Listesi
              </span>
              </Link>
          </li>
          <li>
          <Link to="/yetkilipersonelekle" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Yetkili Personel Ekle
              </span>
              </Link>
          </li>
      
          {/* <li>
          <Link to="/yetkilipersonelguncelle" className="nav-link text-black collapsed">
              <i class="bi bi-circle"></i><span className=" text-decoration-none">
              
              Yetkili Personel Güncelle
              </span>
              </Link>
          </li> */}
       
       
        </ul>
      </li>
  {/* <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#cinsiyet-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Cinsiyet</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="cinsiyet-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/cinsiyetListele" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Cinsiyet Listele
              </span>
              </Link>
          </li>
    
       
       
        </ul>
      </li> */}
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#personel-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Personel</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="personel-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/personelListele" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Personel Listele
              </span>
              </Link>
          </li>
          <li>
          <Link to="/personelEkle" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Personel Ekle
              </span>
              </Link>
          </li>
  
          <li>
          <Link to="/personelGuncelle" className="nav-link text-black collapsed">
              <i class="bi bi-circle"></i><span className=" text-decoration-none">
              
              Personel Güncelle
              </span>
              </Link>
          </li>
       
       
        </ul>
      </li>
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#departman-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Departman</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="departman-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/departmanListele" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Departman Listele
              </span>
              </Link>
          </li>
          <li>
          <Link to="/departmanEkle" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Departman Ekle
              </span>
              </Link>
          </li>
       
          <li>
          <Link to="/departmanGuncelle" className="nav-link text-black collapsed">
              <i class="bi bi-circle"></i><span className=" text-decoration-none">
              
              Departman Güncelle
              </span>
              </Link>
          </li>
       
       
        </ul>
      </li>
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#sirket-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Şirket</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="sirket-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/sirketListele" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Şirket Listele
              </span>
              </Link>
          </li>
       
       
       
        </ul>
      </li>
  <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#sektor-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Sektör</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="sektor-nav" class="nav-content collapse text-decoration-none " data-bs-parent="#sidebar-nav">
          <li>
          <Link to="/sektorListele" className="nav-link text-black text-decoration-none collapsed">
              <i class="bi bi-circle"></i><span>
              Sektör Listele
              </span>
              </Link>
          </li>
      
       
       
        </ul>
      </li>
    

  <li class="nav-heading">Pages</li>

  <li class="nav-item">
  <Link to="/profil" className="nav-link text-black collapsed">
      <i class="bi bi-person"></i>
      <span>Profile</span>
   </Link>
  </li>
</ul>

</aside>

  
  )
}
//Admin bölümü
//////////////




    return (
        <>
        {Navbars}
        </>
    
    )
}

export default SideBar
