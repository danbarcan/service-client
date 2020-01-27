import React from 'react';
import { Icon } from 'antd';

export function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + year;
}

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}


export function CustomIcon(props) {
  return (
    <div className="icon">
      <h3>{props.title}</h3>
      <div className="icon-single">
        <Icon type={props.icon}></Icon>
      </div>
      <p> {props.description} </p>
    </div>
  )
}

export function ContainerArrow(props) {
  return (
    <div className="arrow-container">
      <h6>{props.title}</h6>
      <p>{props.description}</p>
    </div>
  )
}

export function EngineIcon() {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M2244.1,3938.8v-306.3h765.8h765.8v-153.1v-153.2h-493.9c-381,0-518.8-5.7-606.9-28.7c-356.1-93.8-654.7-411.6-721.7-767.7l-21.1-116.8l-116.8-21c-356.1-67-673.9-365.7-767.7-721.7c-23-91.9-28.7-241.2-28.7-760V263.2H865.8H712.6v765.8v765.8H406.3H100V-43.1V-1881h306.3h306.3v765.8v765.8h153.1h153.2v-800.2c0-656.6,5.7-819.4,28.7-913.2c88.1-338.9,369.5-620.3,708.3-708.3c76.6-19.1,202.9-28.7,392.5-28.7H2426l612.6-612.6l612.6-612.6h1780.4c1958.4,0,1889.5-3.8,2117.3,116.8c141.7,76.6,321.6,256.5,398.2,398.2c97.6,183.8,116.8,296.7,116.8,675.8c0,386.7,11.5,411.6,105.3,229.7c68.9-132.1,254.6-319.7,384.8-390.5c434.6-235.5,976.3-70.8,1229.1,371.4c122.5,212.5,120.6,193.3,114.9,1711.5l-5.7,1376.5l-44,109.1c-95.7,237.4-325.4,465.2-555.2,551.3c-137.8,51.7-344.6,68.9-486.3,40.2c-252.7-53.6-516.9-254.6-637.5-484.4c-93.8-181.9-105.3-157-105.3,229.7c0,379.1-19.2,492-116.8,675.8c-76.6,141.7-256.5,321.6-398.2,398.2C7351.8,2089.5,7265.6,2101,6720,2101h-493.9v187.6c0,107.2-13.4,235.5-28.7,300.6c-88,336.9-371.4,620.3-708.3,708.3c-88.1,23-225.9,28.7-606.9,28.7h-493.9v153.2v153.1h765.8h765.8v306.3v306.3H4082H2244.1V3938.8z M5479.5,2679.2c126.3-61.3,134-101.5,134-677.7v-513.1h819.4c739,0,823.2-3.8,884.5-34.5c130.2-65.1,134-86.1,134-830.9V-43.1H8062h610.7l7.7,248.9c5.7,241.2,7.6,248.9,59.3,300.6c49.8,51.7,61.3,53.6,243.1,53.6s193.3-1.9,243.1-53.6l53.6-51.7l5.7-1388c5.7-1531.5,9.6-1468.4-114.9-1533.4c-44-23-99.6-28.7-218.2-23c-145.5,5.7-164.6,11.5-212.5,59.3c-51.7,51.7-53.6,59.4-59.3,300.6l-7.7,248.9H8062h-610.7v-664.3c0-746.6-3.8-767.7-134-832.8c-63.2-32.5-185.7-34.5-1742.1-34.5H3900.1l-612.6,612.6l-612.6,612.6h-421.2c-476.7,0-528.4,11.5-587.7,134c-32.5,63.2-34.5,191.4-34.5,1857c0,1665.5,1.9,1793.8,34.5,1857c59.3,118.7,116.8,134,526.5,134h358v359.9c0,407.8,15.3,465.2,134,524.6c61.3,32.5,168.5,34.5,1397.5,34.5C5311,2713.6,5418.2,2711.7,5479.5,2679.2z" /></g></g>
    </svg>
  )
}

export function RequestDetails(props) {
  return (
    <div>
      <h2> Cerere de la <span>{props.name}</span></h2>
      {props.categories.map(category => (<p > Categorie:  <span className="categorie-reparatie">{category.description}</span> </p>))}
      <p><span className="text">Masina</span> <Icon type="car"></Icon>  {props.car}  </p>
      <p><span className="text">Motor</span> <Icon component={EngineIcon}></Icon>{props.engine}</p>
      <p><span className="text">Combustibil</span> <Icon type="filter"></Icon> {props.fuel}</p>
      <p><span className="text">Problema</span> <Icon type="tool"></Icon><span key={props.id}>{props.problem}</span></p>
    </div>
  )
}

