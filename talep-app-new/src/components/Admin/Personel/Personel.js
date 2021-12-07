import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import PersonelSearch from './Search/PersonelSearch';
import Pagination from '../../personel/Pagination/Pagination';
import { TextField } from '@mui/material';

const Personel = (props) => {

    const [personelList, setPersonelList] = useState([]);
 

    const [q,setQ] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(15);
    

    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')



    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'personel')
            .then((response) => {
                setPersonelList(response.data);
            })
    },[])

    
    const [departmanList, setDepartmanList] = useState([]);
    const [sirketList, setSirketList] = useState([]);
    const [sektorList, setSektorList] = useState([]);
    const [sektorID,setSektorID] = useState('');
    const [sirketID,setSirketID] = useState('');
    const [departmanID,setDepartmanID] = useState('');
   
    const [durumID,setDurumID] = useState('')
  
  

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'departman')
            .then((response) => {
                setDepartmanList(response.data);
            })
    },[])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'sektor')
            .then((response) => {
                setSektorList(response.data);
            })
    },[])
    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'sirket')
            .then((response) => {
                setSirketList(response.data);
            })
    },[])

    


    

const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployee= personelList.slice(indexOfFirstEmployee, indexOfLastEmployee);


const totalPagesNum = Math.ceil(personelList.length / employeesPerPage);



 //Search filter
 function search(){
     
    return(
        personelList.filter(row => (
            row.personelAd.toLowerCase().indexOf(q) > - 1 ||
            row.personelTel.toString().indexOf(q) > - 1 ||
            row.personelEmail.toLowerCase().indexOf(q) > - 1 ||
            row.statuID.toLowerCase().indexOf(q) > - 1 ||
            row.cinsiyetID.toLowerCase().indexOf(q) > - 1 ||
            row.sektorID.toLowerCase().indexOf(q) > - 1 ||
            row.sirketID.toLowerCase().indexOf(q) > - 1 ||
            row.departmanID.toLowerCase().indexOf(q) > - 1 ||
            row.durumID.toString().toLowerCase().indexOf(q) > - 1
            ))
    )
}


    return (
        <div>
          <div class="card">
            <div class="card-body"  style={{height:"100%"}}>
              <h5 class="card-title">Personeller</h5>
       <div className="container">
      
       <div className="row g-0 justify-content-center">
           <div className="col-md-12">
           <div className="row g-0 mt-3">
                <div class="col-md-3">
                  <select id="inputState" class="form-select" onChange={(e) => (setSektorID(e.target.value))}>
                    <option selected>Sektör Seç</option>
                    {sektorList.map(sek => 
                    <option key={sek.sektorID} value={sek.sektorAd}>{sek.sektorAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-3">
                  <select id="inputState" class="form-select" onChange={(e) => (setSirketID(e.target.value))}>
                    <option selected>Şirket Seç</option>
                    {sirketList.filter(sir => {
                      return sektorID===sir.sektorID
                    }).map(sir => 
                    <option key={sir.sirketID} value={sir.sirketAd} >{sir.sirketAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-3">
                  <select id="inputState" class="form-select" onChange={(e) => (setDepartmanID(e.target.value))}>
                    <option selected>Departman Seç</option>
                    {departmanList.filter(deps => {
                    return sirketID === deps.sirketID
                }).map(sek => 
                    <option key={sek.departmanID} value={sek.departmanAd}>{sek.departmanAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-3">
                  <select id="inputState" class="form-select" onChange={(e) => (setDurumID(e.target.value))}>
                    <option selected>Durum Seç</option>
                  
                    <option  value="Aktif">Aktif</option>
                    <option  value="Pasif">Pasif</option>
               
                  </select>
                </div>
                </div>
           <div className="row g-0 mt-3">
           <div className="col-md-8">
           <TextField id="standard-basic" className="search form-control" placeholder="Arama..." label="Arama..." variant="outlined" value={q} onChange={(e) => setQ(e.target.value.toLowerCase())} />
           </div>
       <div className="col-md-2">
                <TextField type="date" className="float-end"   id="outlined-basic" variant="outlined" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-2">
                <TextField type="date" className="float-end" id="outlined-basic"  variant="outlined" onChange={(e) => setEndDate(e.target.value)} />
                </div>
               
           </div>
          
           {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
           <table className="table mt-1 table-bordered">
               <thead className="table-light">
                   <tr>
                       <th>Personel Ad</th>
                       <th>Sektor</th>
                       <th>Şirket</th>
                       <th>Departman</th>
                       <th>Telefon</th>
                       <th>Email</th>
                       <th>Yetki</th>
                       <th>Durum</th>
                       <th>Şifre Gönder</th>
                       <th>Aktif/Pasif</th>
                   </tr>
               </thead>
               <tbody>
              
               <PersonelSearch personelList={search(personelList)} DurumID={durumID} SektorID={sektorID} SirketID={sirketID} DepartmanID={departmanID} startDate={startDate} endDate={endDate}  indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelAd={props.PersonelAd} />
                   <div className="row d-flex justify-content-center">
                       <div className="col-md-12 float-end">
                       <Pagination pages={totalPagesNum} PersonelAd={props.PersonelAd} setCurrentPage={setCurrentPage} />
                       </div>
                   </div>
              
               </tbody>
               
           </table>
   
           </div>
       </div>
       </div>
       </div>
       </div>
       </div>
    )
}

export default Personel
