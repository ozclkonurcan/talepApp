import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
const YetkiliTalepListesi = (props) => {

    const [talepList, setTalepList] = useState([]);
 

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'talep/')
            .then((response) => {
                setTalepList(response.data);
            })
    },[])

    return (
        <div>
                      <div class="nav-scroller bg-body shadow-sm" style={{marginTop:"-25px"}}>
  <nav class="nav nav-underline" aria-label="Secondary navigation">
  <Link to="/sorumluPers" className="nav-link active">Personel</Link>
    {/* <a class="nav-link" href="#">
      Friends
      <span class="badge bg-light text-dark rounded-pill align-text-bottom">27</span>
    </a>
    <a class="nav-link" href="#">Explore</a> */}
   
  </nav>

   
        
        </div>
        <div className="container">
        <div className="row g-0 justify-content-center">
            <div className="col-md-12">
            <table className="table">
                <thead>
                    <tr>
                        <th>Talep Ad</th>
                        <th>Talep Açıklaması</th>
                        <th>Talep Miktarı</th>
                        <th>Talep Durum</th>
                    </tr>
                </thead>
                <tbody>
                {talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(talp => {
                    return talp.personelID == props.PersonelAd
                }).map(tal => 
                    <tr key={tal.talepID}>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        <td>{tal.talepMiktar}</td>
                        <td>{(tal.talepDurum == 2) ? <span class="badge rounded-pill bg-danger">Onaylanmadı</span> 
                        : (tal.talepDurum == 1) ? <span class="badge rounded-pill bg-success">Onaylandı</span> 
                        : <span class="badge rounded-pill bg-secondary">Onay bekleniyor</span>}</td>

                    </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
    )
}

export default YetkiliTalepListesi
