    getIpAddress();
    function getIpAddress(){
        fetch(`https://jsonip.com/`).then(res=>{
            return res.json();
        }).then(data=>{
            getInfo(data.ip)
        }).catch(err=>{
            console.log(`catch error ${err}`)

        })
    }

  function getInfo(ip){
     let ipAddress = ip;
     fetch(`https://ipinfo.io/${ipAddress}/?token=428f49e7eb7c7c`).then(res=>{
      return res.json();
     }).then(data=>{
         console.log(data);
         let arr=data.loc?.split(',')

        document.getElementById('ip').innerHTML=data.ip;
        document.getElementById('lat').innerHTML=`${arr[0]}`;
        document.getElementById('city').innerHTML=data.city;
        document.getElementById('organisation').innerHTML=data.org;
        document.getElementById('long').innerHTML=`${arr[1]}`;
        document.getElementById('region').innerHTML=data.region;
        document.getElementById('hostname').innerHTML=window.location.hostname;
        document.getElementById('timezone').innerHTML=data.timezone;
        document.getElementById('pincode').innerHTML=data.postal;
        showPinCode(data);
     })

 }

 let options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
  formatter = new Intl.DateTimeFormat([], options);

document.getElementById('date').innerHTML=(formatter.format(new Date()));

const pinCodeParent=document.getElementById('main-container')
let postadetails;

function showPinCode(result){
    let url=`https://api.postalpincode.in/pincode/${result.postal}`;
    fetch(url)
    .then(res=>res.json())
    .then(json=>{
        console.log("postinfo",json)
        postadetails=json[0].PostOffice;
        console.log("post office data",postadetails)
       document.getElementById('message').textContent=json[0].Message;
       
        json[0].PostOffice.forEach(Code=>{
            pinCodeParent.innerHTML+=`
            <div class="pcode">
            <p>Name: ${Code.Name}</p> 
            <p>Branch Type: ${Code.BranchType}</p> 
            <p>Delivery Status: ${Code.DeliveryStatus}</p> 
            <p>District: ${Code.District}</p> 
            <p>Division: ${Code.Division}</p> 
         </div>`
        })
    })
}
function filterData(value){
       
        let data= sessionStorage.getItem("data1")
         let pinnumbers=document.querySelectorAll('.pcode')
  for (i = 0; i < pinnumbers.length; i++) {
           if(value==""){
               pinnumbers[i].style.display = "block";
           }
           else if (postadetails[i].Name.includes(value)  || postadetails[i]?.BranchType?.toUpperCase().includes(value) ) {
            
          pinnumbers[i].style.display = "block";
    
        } else {
            pinnumbers[i].style.display = "none";
    
          }
         }
    
     }
