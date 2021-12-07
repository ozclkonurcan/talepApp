
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import SearchPersonelTalepList from './Search/YetkiliPersSearch';
//import Pagination from './Pagination/Pagination';
import { TextField } from '@mui/material';

//MUI
import Pagination from '@mui/material/Pagination';

import Stack from '@mui/material/Stack';




const YetkiliPersonelListesi = (props) => {

    
   

    const [posts,setPosts] = useState([]);
    const [yetkiliList, setYetkiliList] = useState([]);
    const [q,setQ] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(7);

    

    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')


    const [departmanList, setDepartmanList] = useState([]);
    const [sirketList, setSirketList] = useState([]);
    const [sektorList, setSektorList] = useState([]);
    const [sektorID,setSektorID] = useState('');
    const [sirketID,setSirketID] = useState('');
    const [departmanID,setDepartmanID] = useState('');
   
  
    const [perList,setPerList] = useState([])
    const [personelID,setPersonelID]=useState('')
   

    


    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'personel')
            .then((response) => {
                setPerList(response.data);
            })
    },[])
  
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

    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/talep/')
    //         .then((response) => {
    //             setTalepList(response.data);
    //         })
    // },[])

    const fetchUrl = process.env.REACT_APP_API+"yetkili/"
    useEffect(() => {
      async function fetchData() {
        const data = await axios.get(fetchUrl)
        setYetkiliList(data.data)
        return data
      }
      fetchData()
    }, [fetchUrl])



const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployee= yetkiliList.slice(indexOfFirstEmployee, indexOfLastEmployee);


const totalPagesNum = Math.ceil(yetkiliList.length / employeesPerPage);


 //Search filter
 function search(){
     
    return(
        yetkiliList.filter(row => (row.personelAd.toLowerCase().indexOf(q) > - 1 ||
        row.sektorID.toLowerCase().indexOf(q) > - 1 ||
        row.sirketID.toLowerCase().indexOf(q) > - 1 ||
        row.departmanID.toLowerCase().indexOf(q) > - 1 ||
        row.statuID.toLowerCase().indexOf(q) > - 1 

        
        ))
    )

}


    return (
        <div>
         <div class="card p-1">
        <div class="card-body"  style={{height:"80vh"}}>
        <h5 class="card-title">Personel Yetki Listesi</h5>
             
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
                  <select id="inputState" class="form-select" onChange={(e) => (setPersonelID(e.target.value))}>
                    <option selected>Personel Seç</option>
                    {perList.filter(deps => {
                    return departmanID === deps.departmanID && sirketID === deps.sirketID && sektorID === deps.sektorID && deps.statuID !== "Personel"
                }).map(sek => 
                    <option key={sek.personelID} value={sek.personelAd}>{sek.personelAd}</option>
                    )}
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
<th>Sektor ID</th>
<th>Şirket ID</th>
<th>Departman ID</th>
<th>Statu ID</th>
<th>Yetki Kaldır</th>
</tr>
                </thead>
                <tbody>
               
                {/* {
                    talepList && talepList.length > 0 ?
                    
                    talepList.filter(talp => {
                    return talp.personelID == props.PersonelAd 
                }).map(tal => 
                
                    <tr key={tal.talepID} talepList={search(talepList)}>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        <td>{tal.talepMiktar}</td>
                        <td>{(tal.talepDurum == 2) ? <span class="badge rounded-pill bg-danger">Onaylanmadı</span> 
                        : (tal.talepDurum == 1) ? <span class="badge rounded-pill bg-success">Onaylandı</span> 
                        : <span class="badge rounded-pill bg-secondary">Onay bekleniyor</span>}</td>
                    </tr>
                       
                    
                    )
                    :"Yükleniyor"
                    } */}

                    
                    <SearchPersonelTalepList startDate={startDate} endDate={endDate} personelID={personelID} yetkiliList={search(yetkiliList)} indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelAd={props.PersonelAd} />
                   <div className="row d-flex justify-content-center">
                       <div className="col-md-12 float-end">
                       {/* <Pagination pages={totalPagesNum} PersonelAd={props.PersonelAd} setCurrentPage={setCurrentPage} /> */}
                       </div>
                   </div>
                </tbody>
                
            </table>
    
            </div>
        </div>
        </div>
        </div>

        <Stack spacing={2}>
      <Pagination count={totalPagesNum}
      variant="outlined" color="primary"
    PersonelAd={props.PersonelAd}
    //defaultPage={setCurrentPage}
    defaultPage={1}
    onChange={(event,value) => setCurrentPage(value)}
    YetkiliButce={props.YetkiliButce}
    showFirstButton={true}
    showLastButton={true}
    sx={{ mx: "auto" }}
       />
</Stack>
        </div>
        </div>
    )
}

export default YetkiliPersonelListesi
