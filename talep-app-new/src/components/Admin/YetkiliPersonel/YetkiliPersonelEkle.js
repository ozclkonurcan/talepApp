import React,{useState,useEffect} from 'react';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import SearchModalOnay from './Search/YetkiliPersSearchModalGuncelle'
import { Alert } from 'react-bootstrap';
import Pagination from '../../personel/Pagination/Pagination';

const YetkiliPersonelEkle = (props) => {

    const [talepID,setTalepID] = useState('');
    const [personelID,setPersonelID] = useState('');
    const [talepAd,setTalepAd] = useState('');
    const [talepAciklamasi,setTalepAciklamasi] = useState('');
    const [talepMiktar,setTalepMiktar] = useState('');
    const [talepTahminiDeger,setTalepTahminiDeger] = useState('');
    const [talepDurum,setTalepDurum] = useState('');


    /////////////////////////////////////////////
    
    const [redirect,setRedirect] = useState(false);
    const [personelList, setPersonelList] = useState([]);

    const [onayList,setOnayList] = useState([]);


    ///////////////// * Modal ayar * ////////////////////
    const [modalShow,setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalOpen = () => setModalShow(true);

    const [q,setQ] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(5);

   

// const submit = async (e) => {
//     e.preventDefault();

//     let data ={talepID,personelID,talepAd,talepAciklamasi,talepMiktar,talepTahminiDeger}
//     await fetch('http://localhost:5000/api/talep',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json',
//             'Accept':'application/json'
//         },
//         body:JSON.stringify(data)
//     })
//     .then((result) => {
//         //console.war(result);
//         result.json().then((resp) => {
//                 console.log(resp);
//         })
//     });
//     setRedirect(true);
// }

useEffect((e) => {
    axios.get(process.env.REACT_APP_API+'personel/')
        .then((response) => {
            setPersonelList(response.data);
        })
},[])

if(redirect){

    return <Redirect to="/home"/>;
}


 
 
const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployee= personelList.slice(indexOfFirstEmployee, indexOfLastEmployee);


const totalPagesNum = Math.ceil(personelList.filter(per => {
    return per.statuID !== "Personel"
}).length / employeesPerPage);



 //Search filter
 function search(){
     
    return(
        personelList.filter(row => row.personelAd.toLowerCase().indexOf(q) > - 1)
    )
}



    return (
        <div>
                      
        <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Personel Yetkilendirme Sayfası</h5>
        <div className="container">

        <div className="row g-0 justify-content-center">
            <div className="col-md-12">
            <div className="row g-0 mt-3">
         
            <div className="col-md-12">
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)} className="search form-control" placeholder="Arama..." />
                </div>
            </div>
           
            {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
            <table className="table mt-1 table-bordered">
                <thead className="table-light">
                    <tr>
                    
                       <th>Personel ID</th>
                       <th>Personel Ad</th>
                       <th>Cinsiyet</th>
                       <th>Sektor</th>
                       <th>Şirket</th>
                       <th>Departman</th>
                       <th>Telefon</th>
                       <th>Email</th>
                       <th>Yetki</th>
                       
                       <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody >
               
                    <SearchModalOnay personelList={search(personelList)} indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelAd={props.PersonelAd} />
                   <div className="row d-flex justify-content-center">
                       <div className="col-md-12 float-end">
                       <Pagination pages={totalPagesNum} PersonelAd={props.PersonelAd} setCurrentPage={setCurrentPage} />
                       </div>
                   </div>
                </tbody>
                
            </table>

            
    
            </div>
        </div> </div>
        </div> </div>


{/* Modal olacak güncelleme içi */}
{/* <div className="row g-0 justify-content-center">
<div className="col-md-4">
<form onSubmit={submit}>
            <input className="form-control mt-3" value={personelID} onChange={(e)=>{setPersonelID(e.target.value)}} name="personelID" disabled hidden />
            <input className="form-control mt-3" value={sektorID} onChange={(e)=>{setSektorID(e.target.value)}} name="sektorID" disabled hidden  />
            <input className="form-control mt-3" value={sirketID} onChange={(e)=>{setSirketID(e.target.value)}} name="sirketID" disabled hidden />
            <input className="form-control mt-3" value={departmanID} onChange={(e)=>{setDepartmanID(e.target.value)}} name="departmanID" disabled hidden />
            <input className="form-control mt-3" placeholder="Talep Adı" value={talepAd} onChange={(e)=>{setTalepAd(e.target.value)}}  name="talepAd" />
            <textarea className="form-control mt-3" placeholder="Talep Açıklaması"  value={talepAciklamasi} onChange={(e)=>{setTalepAciklamasi(e.target.value)}} name="talepAciklamasi" />
            <input className="form-control mt-3" placeholder="Talep Miktarı"  value={talepMiktar} onChange={(e)=>{setTalepMiktar(e.target.value)}} name="talepMiktar" />
            <input className="form-control mt-3" placeholder="Talep Tahmini Fiyatı"  value={talepTahminiDeger} onChange={(e)=>{setTalepTahminiDeger(e.target.value)}} name="talepTahminiDeger" />
            <button  className="w-100 btn btn-lg btn-primary mt-3" type="submit">Kayıt et</button>
        </form>
</div>
</div> */}
       
    </div>
    )
}

export default YetkiliPersonelEkle
