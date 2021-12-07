import React,{useEffect,useState} from 'react'
import axios from 'axios'
import alertify from 'alertifyjs';
const Profil = (props) => {



    const [perList, setPerList] = useState([]);
 

    const [personelAd,setPersonelAd] = useState(props.PersonelAd);
    const [personelEmail,setPersonelEmail] = useState(props.PersonelEmail);
    const [personelTel,setPersonelTel] = useState(props.PersonelTel);
    const [personelPassword,setPersonelPassword] = useState(props.PersonelPassword);
    const [departman,setDepartman] = useState(perList.departmanID);
    const [statu,setStatu] = useState(perList.statuID);
    const [durum,setDurum] = useState(perList.durumID);
    const [departmanID,setDepartmanID] = useState(props.PersonelDepartmanID);
    const [sektorID,setSektorID] = useState(props.PersonelSektorID);
    const [sirketID,setSirketID] = useState(props.PersonelSirketID);
    const [statuID,setStatuID] = useState(props.statuID);
    const [yetkiliButce,setYetkiliButce] = useState(props.YetkiliButce);
    const [personelResim,setPersonelResim] = useState(props.PersonelResim);



    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'personel/'+props.PersonelID)
            .then((response) => {
                setPerList(response.data);
                response.status===200? console.log("giriş yapıldı") : alert("None")
            })
    },[])




    
    function updateDurum(e){
      let durum = {personelAd,personelResim,personelEmail,personelTel,personelPassword,departmanID,sektorID,sirketID,statuID,yetkiliButce};
      fetch(`${process.env.REACT_APP_API}personel/${props.PersonelID}`,{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify(durum)
      }).then(result => {
        result.status===200 ? 
		alertify.success('Güncelleştirme işlemi başarılı') :
		alertify.error('Güncelleştirme Hatası')
          result.json().then(resp => {
              console.warn(resp)
              
          })
     
        })
  }


     
const handleFileSelected = (e) => {
  const formData = new FormData();
  setPersonelResim(e.target.files[0].name)
  formData.append(
      "myFile",
      e.target.files[0],
      e.target.files[0].name
  );
  fetch(process.env.REACT_APP_API+'personel/SaveFile',{
      method:'POST',
      body:formData
  })
  .then(resp => resp.json())
 
}



    return (
        <div>
            {/* <table>
            <tr key={perList.personelID}></tr>
            <tr>{perList.personelAd}</tr>
            <tr>{perList.personelEmail}</tr>
            <tr>{perList.departmanID}</tr>
            <tr>{props.statuID}</tr>
     </table> */}



<div class="pagetitle">
  <h1>Profile</h1>
</div>

<section class="section profile" key={perList.personelID}>
  <div class="row">
    <div class="col-md-4">

      <div class="card">
        <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

          <img src={props.PersonelResim}  alt="Profile" class="rounded-circle"/>
          <h2>{perList.personelAd}</h2>
          <h3>{perList.personelEmail}</h3>
      
        </div>
      </div>

    </div>

    <div class="col-md-8">

      <div class="card">
        <div class="card-body pt-3"  style={{height:"75vh"}}>
      
          <ul class="nav nav-tabs nav-tabs-bordered">

            <li class="nav-item">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Profil</button>
            </li>

            <li class="nav-item">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Profil Düzenle</button>
            </li>

           

            <li class="nav-item">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Şifre Değiştir</button>
            </li>

          </ul>
          <div class="tab-content pt-2">

            <div class="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 class="card-title">Profil Detay</h5>

              <div class="row">
                <div class="col-lg-3 col-md-4 label ">Ad</div>
                <div class="col-lg-9 col-md-8">{perList.personelAd}</div>
              </div>

             

              <div class="row">
                <div class="col-lg-3 col-md-4 label">Sektor</div>
                <div class="col-lg-9 col-md-8">{perList.sektorID}</div>
              </div>
              <div class="row">
                <div class="col-lg-3 col-md-4 label">Şirket</div>
                <div class="col-lg-9 col-md-8">{perList.sirketID}</div>
              </div>
              <div class="row">
                <div class="col-lg-3 col-md-4 label">Departman</div>
                <div class="col-lg-9 col-md-8">{perList.departmanID}</div>
              </div>


              <div class="row">
                <div class="col-lg-3 col-md-4 label">Telefon</div>
                <div class="col-lg-9 col-md-8" >{perList.personelTel}</div>
              </div>

              <div class="row">
                <div class="col-lg-3 col-md-4 label">Email</div>
                <div class="col-lg-9 col-md-8">{perList.personelEmail}</div>
              </div>

            </div>

            <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

         
              <form>
                <div class="row mb-3">
                  <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profil Resmi</label>
                  <div class="col-md-8 col-lg-9">
                    <img src={personelResim} alt="Profile"/>
                    <div class="pt-2">
                    <input type="file"  onChange={handleFileSelected}  accept="image/*" name="file" className=" btn btn-primary btn-sm"/>
                   </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Ad</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="fullName" type="text" class="form-control" id="fullName" placeholder={props.PersonelAd} value={personelAd} onChange={(e)=> setPersonelAd(e.target.value)}/>
                  </div>
                </div>

          

            

                <div class="row mb-3">
                  <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Telefon</label>
                  <div class="col-md-8 col-lg-9">
                  <div class="input-group mb-3">
                  <span class="input-group-text">+90</span>
                    <input name="phone" type="text" id="Phone" class="form-control"  placeholder={props.PersonelTel} value={personelTel}
                     onChange={(e)=> setPersonelTel(e.target.value)}/>
          </div>
                  {/* <input value={perList} onChange={(e) => setStatu(e.target.value) } hidden/>
                  <input value={departman} onChange={(e) => setDepartman(e.target.value) } hidden/>
                  <input value={durum} onChange={(e) => setDurum(e.target.value) } hidden/> */}
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="email" type="email" placeholder={props.PersonelEmail} class="form-control" id="Email" value={personelEmail} onChange={(e)=> setPersonelEmail(e.target.value)} />
                
                  </div>
                </div>
                      <input placeholder={props.PersonelDepartmanID}  value={departmanID} onChange={(e)=> setDepartmanID(e.target.value)} hidden/>
                      <input placeholder={props.PersonelSirketID}  value={sirketID} onChange={(e)=> setSirketID(e.target.value)} hidden/>
                      <input placeholder={props.PersonelSektorID}  value={sektorID} onChange={(e)=> setSektorID(e.target.value)} hidden/>
                      <input placeholder={props.YetkiliButce}  value={yetkiliButce} onChange={(e)=> setYetkiliButce(e.target.value)} hidden />
                      <input placeholder={props.PersonelStatuID}  value={statuID} onChange={(e)=> setStatuID(e.target.value)} hidden />

                <div class="text-center">
                  <button type="submit" class="btn btn-primary" onClick={updateDurum} >GÜncelle</button>
                </div>
              </form>
            </div>

            

            <div class="tab-pane fade pt-3" id="profile-change-password">
             
              <form>

                <div class="row mb-3">
                  <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Şimdiki Şifre</label>
                  <div class="col-md-8 col-lg-9">
                  
                    <input name="password" type="text" disabled class="form-control" id="currentPassword" value={personelPassword}/>
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">Yeni Şifre</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="newpassword" type="password" class="form-control" id="newPassword" value={personelPassword} onChange={(e)=>setPersonelPassword(e.target.value)}/>
                  </div>
                </div>

             
                <div class="text-center">
                  <button type="submit" class="btn btn-primary" onClick={updateDurum}>Şifre Değiştir</button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</section>



       
        </div>
        
    )
}

export default Profil


