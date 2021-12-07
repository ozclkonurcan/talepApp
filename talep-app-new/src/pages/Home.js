import React from 'react'
 const Home = (props) => {

var date = new Date(),
dates = date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours()+":"+date.getMinutes();
    
  return (
    
    <div>
    <h1>ID = {props.PersonelID}</h1>
    {props.PersonelEmail ? "Hi " + props.PersonelEmail : "Hataylı giriş" }

    <div className="row g-0">
      <div className="col-md-3">Profil Resmi</div>
      <div className="col-md-9">Profil Bilgiler</div>
    </div>
    
    <input type="datetime-local"/>

<input value={dates} disabled />




  </div>
  )
}
export default Home;