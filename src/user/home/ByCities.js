import React, { Component } from "react";
import {Rate} from 'antd';

const data =[
  {name: 'Service A/S Bucuresti',cereri:512, review: 5, description:'Service foarte bun care isi face treaba foarte bine', categories:['ambreiaj',' directie']},
  {name: 'Service 2 ',cereri:321, review: 3, description:'Service grozav care se misca foarte repede', categories:['directie']},
  {name: 'Service A/S Bucuresti',cereri:3, review: 5, description:'Service foarte bun care isi face treaba foarte bine', categories:['frana',' motor',' lumini']},
]
class ByCities extends Component {

 

  render() {
    return (
     <div ClassName="cities-container">
       <h2> Service-uri de top din Bucuresti </h2>
        {data.map((obj)=>
          <div className="cities-container__services">
            {/* <Img src={obj.img}></Img>   */}
            <h2>{obj.name}</h2>  <p className="categorie-reparatie">{obj.categories}</p>
            <p>{obj.cereri} cereri completate</p>
            <Rate disabled value={obj.review} ></Rate>{obj.review}/5
            <p>{obj.description}</p>
          </div>
        )}
     </div>
    )
  }
}

export default ByCities;
