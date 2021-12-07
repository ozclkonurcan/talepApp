import React,{useState,useEffect} from 'react';
import axios from 'axios';
import SearchOnaysız from '../SearchTable/SearchOnaysız';
//import Pagination from '../Pagination/Pagination';

import Pagination from '@mui/material/Pagination';
import { Stack } from 'react-bootstrap';
import { TextField } from '@mui/material';

const OnaysızPersonel = (props) => {

    
    // const [talepID,setTalepID] = useState('');
    // const [personelID,setPersonelID] = useState('');
    // const [talepAd,setTalepAd] = useState('');
    // const [talepAciklamasi,setTalepAciklamasi] = useState('');
    // const [talepMiktar,setTalepMiktar] = useState('');
    // const [talepTahminiDeger,setTalepTahminiDeger] = useState('');
    /////////////////////////////////////////////
    
    //const [redirect,setRedirect] = useState(false);
    const [talepList, setTalepList] = useState([]);

    const [q,setQ] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(8);


    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/talep/')
    //         .then((response) => {
    //             setTalepList(response.data);
    //         })
    // },[])

    const fetchUrl = process.env.REACT_APP_API+"talep/"
    useEffect(() => {
      async function fetchData() {
        const data = await axios.get(fetchUrl)
        setTalepList(data.data)
        return data
      }
      fetchData()
    }, [fetchUrl])


    const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployee= talepList.slice(indexOfFirstEmployee, indexOfLastEmployee);


const totalPagesNum = Math.ceil(talepList.filter(tal => {
   return tal.personelID === props.PersonelAd && tal.talepDurum===2
}).length / employeesPerPage);



 //Search filter
 function search(){
     
    return(
        talepList.filter(row => (row.talepAd.toLowerCase().indexOf(q) > - 1 ||
        row.talepAd.toUpperCase().indexOf(q) > - 1 ||
        row.talepAciklamasi.toLowerCase().indexOf(q) > - 1 ||
        row.talepAciklamasi.toUpperCase().indexOf(q) > - 1 
        ))
    )
}
const [startDate,setStartDate] = useState('')
const [endDate,setEndDate] = useState('')
    return (
        <div>

<div class="card p-1">
        <div class="card-body profile-card pt-4 d-flex flex-column align-items-center"  style={{height:"80vh"}}>
      



<div className="container">
<h5 class="card-title">Personel Onaylanmamış Talep Formları</h5>
<div className="row g-0 justify-content-center">

<div className="col-md-12">
<div className="row g-0 mt-3">

<div className="col-md-8">
               
<Stack>
<TextField id="filled-basic" label="Arama..." variant="filled" onChange={(e) => setQ(e.target.value)} />
</Stack>   
                {/* <input type="text" value={q} onChange={(e) => setQ(e.target.value)} className="search form-control" placeholder="Arama..." /> */}
                </div>
                <div className="col-md-2">
                <TextField type="date" className="float-end"   id="outlined-basic" variant="filled" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-2">
                <TextField type="date" className="float-end" id="outlined-basic"  variant="filled" onChange={(e) => setEndDate(e.target.value)} />
                </div>


</div>

{/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
<table className="table mt-1 table-bordered">
  <thead className="table-light">
      <tr>
           <th>Talep Ad</th>
          <th>Talep Açıklaması</th>
          <th>Talep Durum</th>
          <th>Onaylamayan</th>
          <th>İşlem Tarih</th>
      </tr>
  </thead>
  <tbody>
  {/* {
      talepList && talepList.length > 0 ?
      talepList.filter(talp => {
          return talp.personelID === props.PersonelAd && talp.talepDurum === 2
      }).map(tal => 
      <tr key={tal.talepID}>
      <td>{tal.personelID}</td>
          <td>{tal.talepAd}</td>
          <td>{(tal.talepDurum == 2) ? <span class="badge rounded-pill bg-danger">Onaylanmadı</span> 
          : (tal.talepDurum == 1) ? <span class="badge rounded-pill bg-success">Onaylandı</span> 
          : <span class="badge rounded-pill bg-secondary">Onay bekleniyor</span>}</td>
      </tr>
         
      
      )
      :"Yükleniyor"
      } */}
      
      <SearchOnaysız startDate={startDate} endDate={endDate} talepList={search(talepList)} indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelAd={props.PersonelAd} />
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
      variant="outlined" color="error"
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

export default OnaysızPersonel;
