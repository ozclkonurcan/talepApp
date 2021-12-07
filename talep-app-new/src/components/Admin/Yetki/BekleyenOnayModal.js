import Button from '@restart/ui/esm/Button'
import React, { useState } from 'react'
import { Alert, Card, Form } from 'react-bootstrap'

const BekleyenOnayModal = ({editTalepDurum}) => {

    const statuList = editTalepDurum;
    const id = statuList.statuID;
   
    const [statuAd,setStatuAd] = useState(statuList.statuAd);



    function updateDurum(){
        let durum = {statuAd,id};
        fetch(`${process.env.REACT_APP_API}statu/${id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(durum)
        }).then(result => {
            result.json().then(resp => {
                console.warn(resp)
            })
        })
    }


  
//Güncelleme işlemi sırasında 3 radio btn olacak ve 1 2 0 numaralarnı seçme şansı verecek 
// 0 olan bekleme 1 onay 2 red olacak submit yaptığımız zaman
//seçilen radio btn ye göre işlem görecek 0 olan var sayılan olarak gelecek
    return (
        <Form>
            <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={statuAd}
                onChange={(e)=>setStatuAd(e.target.value)}
                required
                 />
            </Form.Group>
         
            <Button className="btn btn-success mt-3" type="submit" onClick={updateDurum} >İşlemi tamamla</Button>

          </Form>
    )
}

export default BekleyenOnayModal
