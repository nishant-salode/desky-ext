// setTimeout(() => {
//   for (i = 0; i < 204; i++)
//   {
//       setTimeout(function() {
//         $(".number").css("text-shadow", + i +"px 1px 1px #000000ba");  
//         //1px ​1px 4px blu
//       }, i*50);
//   }  
// }, 3000);


document.getElementById("username").innerHTML = localStorage.getItem("firstname");
localStorage.setItem("quoteOfDay","Efforts Today, Fruits Tomorrow");
document.getElementById("quoteOfDay").innerHTML = localStorage.getItem("quoteOfDay");
if(!!!localStorage.getItem("firstname")){
  var userName = prompt("Please enter your name", "");

if (userName != null) {
  localStorage.setItem("firstname", userName)
  document.getElementById("username").innerHTML = localStorage.getItem("firstname");
  }
}
if(!!!localStorage.getItem("alternate-time-zone")){
  localStorage.setItem("alternate-time-zone",Intl.DateTimeFormat().resolvedOptions().timeZone);
}


// moment(new Date(),"MM-DD-YYYY");
// document.getElementById("username").innerHTML=(moment.utc(new Date()).local().format("hh:mm"));

// var d = new Date();
// var myTimezone = "America/Toronto";
// var myDatetimeFormat= "YYYY-MM-DD hh:mm:ss a z";
// var myDatetimeString = moment(d).tz(myTimezone).format(myDatetimeFormat);
// console.log("latest"+myDatetimeString)
/*
 * <-- - - - Make TO DO List draggable
 *
 * 
 * */

const drag_list = function() {
   
  var remove = document.querySelector('.draggable');
  
  function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    // console.log(this.className)
    e.dataTransfer.setData('class', this.className);
    //
    e.dataTransfer.setData('inner_span_id', this.firstElementChild.id);
  };
  
  function dragEnter(e) {
    this.classList.add('over');
  }
  
  function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }
  
  function dragDrop(e) {
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      dragSrcEl.firstElementChild.id = this.firstElementChild.id
      this.innerHTML = e.dataTransfer.getData('text/html');
      dragSrcEl.className = this.className;
      this.className  = e.dataTransfer.getData('class');
      dragSrcEl.firstElementChild.id = this.firstElementChild.id;
      e.dataTransfer.getData('inner_span_id');
    }
    return false;
  }
  
  function dragEnd(e) {
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
      item.classList.remove('over');
    });
    this.style.opacity = '1';
  }
  
  function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
  }
  
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    addEventsDragAndDrop(item);
  });
  
   }
  
/*
*
* 
* - - --> */

/*
* * https://openweathermap.org/img/wn/04n@2x.png | For weather image
* *
*/
function getWeather() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //let x = this.responseText.substr(this.responseText.indexOf("(")+1,this.responseText.lastIndexOf(")")-4);

      
      let x = this.responseText;
      document.getElementById("weather").innerHTML = x;
      // console.log(x)
      // let y =x.substr(this.responseText.indexOf("("),this.responseText.length);
      // let z = y.json();
     
      // console.log(y,z)

    }
  };
  xhttp.open("GET", "https://openweathermap.org/data/2.5/find?callback=jQuery19107122760202432386_1589644774950&q=Pune&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1589644774952", true);
  xhttp.send();
}
// getWeather();
/**<--- - - JSON formatiing for localstorage */

/**
 * Initiate with getting all the items of the list and assigning it a new DOM *
 * New DOM must have event assigned for status change + delete itself + edit itself*
 * STATES of TODO - ACTIVE | COMPLETED | DELETED *
 * *
 *  * */
const _alert = function(alert_Msg){
alert(alert_Msg)
};
const initiate_toDoList_DOM = function(id, description, status){
  
  let li = document.createElement("li");
   li.setAttribute("draggable","true")
   li.className = "draggable";
    //check for COMPLETE status to strike text
    if(status == "COMPLETED"){
      li.className += " checked" ;
    }

    let t = document.createTextNode(description);
    li.appendChild(t);
    document.getElementById("myUL2").appendChild(li);
      
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close2";
    span.id = id;
   
    span.appendChild(txt);
    li.appendChild(span);
    //add edit icon start
    let faIcon = document.createElement("I");
    faIcon.className = "fa fa-edit float-right mt-1 mr-3";
    li.appendChild(faIcon);
    //add edit icon end
    
    
    // for (i = 0; i < close.length; i++) {
    //   close[i].onclick = function() {
    //     let div = this.parentElement;
    //     div.style.display = "none";
    //   }
    // }



}         
                
const fetch_local_create_DOM = function(){
  //Check for empty todo list
  
    if(localStorage.getItem("tempJSON") == "") return;
 
  //Fetch todo list assign DOM
  let localStorageTodoList = localStorage.getItem("tempJSON");
  
  if (localStorage.getItem("tempJSON") != null) {
    JSON.parse(localStorageTodoList).forEach(function(storageToDoItem){
      // let newDOM = document.createElement("SPAN");
      // newDOM.id ="JSONobject";
      // newDOM.textContent=storageToDoItem.todo_Desc;
      // document.getElementById("username").append(newDOM);
      // alert( storageToDoItem);
    
      //Assign DOM to each todo list item with status != deleted
      if(storageToDoItem.todo_Status != "DELETED"){
       
        initiate_toDoList_DOM(storageToDoItem.todo_Id,storageToDoItem.todo_Desc,storageToDoItem.todo_Status);
      }
      
        });
  }
 
}

const assign_Remove_Button = function(){
  // Click on a close button to hide the current list item
let close = document.getElementsByClassName("close2");
let i;

for (i = 0; i < close.length; i++) {
  
  //Shouldn't the code be breaking if working on new tabs while adding new item/s?
  
  close[i].onclick = function(event) {
    let get_toDoList_LocalStorage = JSON.parse(localStorage.getItem("tempJSON"));
      get_toDoList_LocalStorage.forEach(function(item){
        if(item.todo_Id == event.target.id){
          //Update item status to DELETE
          item.todo_Status = "DELETED";
        }
          
// delete get_toDoList_LocalStorage;
console.log(get_toDoList_LocalStorage)
});
      localStorage.setItem("tempJSON",JSON.stringify(get_toDoList_LocalStorage));
      let list_DOM = this.parentElement;
      list_DOM.remove();
  }
  
  
}
}

let addnewElemntBtn = document.getElementById('addNewElement2');
//IMPLEMENT same for when user press enter on myInput2 
addnewElemntBtn.addEventListener('click', function() {
    
  // function handle_Empty_List() {
   
  //   return;
  // }
  let inputValue = document.getElementById("myInput2").value;
  if(inputValue == "" || inputValue == " " || inputValue == "  " )
  {
    _alert("List can not be empty");
return;
}
  // initiate_toDoList_DOM(new Date().getTime(),inputValue,"ACTIVE")
  let newItem = {
    "todo_Id": new Date().getTime(),
    "todo_Desc": inputValue,
    "todo_Status": "ACTIVE",
    "todo_timestamp": new Date()
  };
  let x= [];
  if(localStorage.getItem("tempJSON") != null){
     x = JSON.parse(localStorage.getItem("tempJSON"));
    x.push(newItem);
    alert("1")
  }
  else{
    x.push(newItem);
    alert("2")
  }
  
console.log(x)
  localStorage.setItem("tempJSON",JSON.stringify(x));
  
var todo_List_DOM=document.getElementById("myUL2");
todo_List_DOM.innerHTML="";
  fetch_local_create_DOM();
  assign_Remove_Button();
  document.getElementById("myInput2").value = "";
});


               
        

/**JSON formatiing for localstorage - - -->*/

// fetchCompleteList()
//Get Correct time per second
function updateClock() {
    let now = new Date(); // current date as per browser timezone (user timezone)
    
    
        timeHr = now.getHours() == 0? 12:now.getHours() < 10? "0"+now.getHours():now.getHours() ; 
        timeMin = (now.getMinutes() < 10)?  "0"+now.getMinutes() : now.getMinutes();
        timeAmPm = (now.getHours() <= 12)?"AM":"PM";
        
        //1208AM
        /* *
         * Set wallpaper as per time
         * 4am - 8pm Light BG wallpaper
			   * 8pm - 4am Dark BG wallpaper
         * */
        let tag_BODY = document.getElementsByTagName("BODY")[0];
                
        if(timeHr >= 4 && timeHr <= 12 && timeAmPm === "AM" || timeHr >= 1 && timeHr <= 7 && timeAmPm === "PM"){
          //Morning time
          tag_BODY.style.background="url('./images/background/3.jpg')";
        }
        else{
          //Dark times
          tag_BODY.style.background="url('./images/background/2.jpg')";
        }
         tag_BODY.style.backgroundRepeat ="no-repeat";
         tag_BODY.style.backgroundSize="cover";
         tag_BODY.style.backgroundPosition="center";
        //  background: url('./images/background/2.jpg');

    let default_DatetimeFormat_hour= "hh";
    let default_DatetimeFormat_minutes= "mm";
    let default_DatetimeFormat_AmPm= "A";
    let default_DatetimeFormat_Date= "DD/MM";
    let default_DatetimeFormat_zoneName= "z";
    
    let default_timeHr = moment(now).format(default_DatetimeFormat_hour);
    let default_timeMin = moment(now).format(default_DatetimeFormat_minutes);
    let default_timeAmPm = moment(now).format(default_DatetimeFormat_AmPm);
    let default_date = moment(now).format(default_DatetimeFormat_Date);
    let default_zoneName = moment(now).tz(moment.tz.guess()).format(default_DatetimeFormat_zoneName);
   console.log( moment(now).tz(moment.tz.guess()).format(default_DatetimeFormat_zoneName))
    // var sone =  moment.tz.guess();
    // var timezone = moment(now).tz(sone).zoneAbbr("i") 
    // console.log(timezone);
    // console.log(moment.tz.names());
    // console.log(moment(now),moment(now).tz(now).zoneAbbr("i"))
    ///\((.*)\)/.exec(new Date().toString())[1]
    document.getElementById('datetimeHr').innerHTML = [default_timeHr];
    document.getElementById('datetimeMin').innerHTML = [default_timeMin];
    document.getElementById('datetimeAmPm').innerHTML = [default_timeAmPm];
    document.getElementById('legend-IST-before').innerHTML = [default_date];
    document.getElementById('legend-IST-after').innerHTML = [default_zoneName];

    let EST_Timezone = localStorage.getItem("alternate-time-zone") || "America/New_York";
    let EST_DatetimeFormat_hour= "hh";
    let EST_DatetimeFormat_minutes= "mm";
    let EST_DatetimeFormat_AmPm= "A";
    let EST_DatetimeFormat_Date= "DD/MM";
    let EST_DatetimeFormat_zoneName= "z";

    let EST_timeHr = moment(now).tz(EST_Timezone).format(EST_DatetimeFormat_hour);
    let EST_timeMin = moment(now).tz(EST_Timezone).format(EST_DatetimeFormat_minutes);
    let EST_timeAmPm = moment(now).tz(EST_Timezone).format(EST_DatetimeFormat_AmPm);
    let EST_date = moment(now).tz(EST_Timezone).format(EST_DatetimeFormat_Date);
    let EST_zoneName = moment(now).tz(EST_Timezone).format(EST_DatetimeFormat_zoneName);
// console.log( moment(now).tz(EST_Timezone).format(EST_DatetimeFormat_zoneName))
    EST_timeHr == 0? EST_timeHr = 12: EST_timeHr;
    document.getElementById('EST_datetimeHr').innerHTML = [EST_timeHr];
    document.getElementById('EST_datetimeMin').innerHTML = [EST_timeMin];
    document.getElementById('EST_datetimeAmPm').innerHTML = [EST_timeAmPm];
    document.getElementById('legend-EST-before').innerHTML = [EST_date];
    document.getElementById('legend-EST-after').innerHTML = [EST_zoneName];
    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); // initial call

//Update Name on new tab from localstorage by icon i.e. popup js
let text = "hello";
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        document.getElementById("username").innerHTML = localStorage.getItem("firstname");
        switch(message.type) {
            case "getText":
                sendResponse(text);
            break;
        }
    }
);


fetch_local_create_DOM();
assign_Remove_Button();
// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('UL');
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log(event.target.classList.value)
    console.log(event.target.firstElementChild.id);
    event.target.classList.toggle('checked');
    // if( event.target.classList.value == "checked" ){
      let get_toDoList_LocalStorage = JSON.parse(localStorage.getItem("tempJSON"));
      get_toDoList_LocalStorage.forEach(function(item){
        if(item.todo_Id == event.target.firstElementChild.id){
          //Update item status to COMPLETED or ACTIVE
          if ( (" " + event.target.classList.value + " ").replace(/[\n\t]/g, " ").indexOf(" checked ") > -1 ) {
            item.todo_Status = "COMPLETED";
          }
          // if( event.target.classList.value == "checked" ){
          //   item.todo_Status = "ACTIVE";
          // }
          else{
            item.todo_Status = "ACTIVE";
          }
          
        }
      });
      console.log(get_toDoList_LocalStorage)
    localStorage.setItem("tempJSON",JSON.stringify(get_toDoList_LocalStorage))
    // }
}
}, false);

/*
*
* Analog Clock with hour, minutes and seconds hands
*
*/  
  setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
  const currentDate = new Date()
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}
$(document).ready(function(){
  setTimeout(() => {
    document.getElementById("clock").style.height="100%";  
    setTimeout(() =>{
      document.getElementById("clock").style.position="initial";  
    },1100)
    
  }, 400);
})


setClock();
/*
*
*/


/*
 *
 *Code to fetch favicon of a website 
 * 
 */
// addNewBookmark()
let bookMarkButton = document.getElementById('addBookmark');
let urlInputElement = document.getElementById('bookmark-link');
let urlInputArrow = document.getElementById('arrow-left');

/**<--- - - JSON formatiing for localstorage */




/**JSON formatiing for localstorage - - -->*/


bookMarkButton.addEventListener('click', function(ev) {
  console.log(urlInputElement.style.width)
  if(urlInputElement.style.width != "950px")
  {
    // urlInputArrow.style.display = "block";
    urlInputArrow.style.opacity = "1";
    urlInputElement.style.width = "950px";
    urlInputElement.style.padding = "10px 10px 10px 30px";
    
  }
  else
  {
    hideUrlInput();
    // urlInputArrow.style.display = "none";
  
  }
  
  getFavicon(document.getElementById('bookmark-link').value);
}, false);
function hideUrlInput(){
  urlInputArrow.style.opacity = "0";
  urlInputElement.style.width = "0px";
  urlInputElement.style.padding = "0px";
}
let getFavicon = function(bookmarklink){
  //current website favicon
  // let favicon = undefined;
  // let nodeList = document.getElementsByTagName("link");
  // for (let i = 0; i < nodeList.length; i++)
  // {
  //     if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
  //     {
  //         favicon = nodeList[i].getAttribute("href");
  //     }
  // }
  // return favicon;        
  fetchFaviconUrl = "https://s2.googleusercontent.com/s2/favicons?domain="+bookmarklink;
  // https://tools.iabtechlab.com/dashboard
  $.get(fetchFaviconUrl, function(data, status){
    console.log(data)
    // alert("Data: " + data + "\nStatus: " + status);
  });
}

/*
*
*/

/*
*
* Clear all
* function to re initiate the UI 
*
* Click outside and ESC button press
*/

$(document).click(function(e) 
{
  console.log(bookMarkButton)
  console.log(e.target)

    // if the target of the click isn't the container nor a descendant of the container
    if (bookMarkButton != e.target && urlInputArrow != e.target && urlInputElement != e.target) 
    {
      hideUrlInput();
    }
});
$(document).on('keydown', function(event) {
  if (event.key == "Escape") {
    hideUrlInput();
  }
});

/* Work on how to order the list using local storage */
drag_list();



var time_zone_list = moment.tz.names();
var time_zone_dropdown = document.getElementById("time-zone-list");
time_zone_list.forEach(time_zone => {
  let time_zone_li = document.createElement("OPTION");
  // let txt = document.createTextNode("\u00D7");
  time_zone_li.className = "time-zone-item";
  time_zone_li.id = time_zone;
  time_zone_li.innerHTML = time_zone;
  time_zone_dropdown.append(time_zone_li)


});
$(document).ready(function () {
  $('select').selectize({
      sortField: 'text'
  });
});


let applyTimeZoneBtn = document.getElementById('time-zone-select-btn');
//IMPLEMENT same for when user press enter on myInput2 
applyTimeZoneBtn.addEventListener('click', function(event) {
  console.log(document.getElementById("time-zone-list").firstElementChild.innerHTML);
  
  localStorage.setItem("alternate-time-zone",document.getElementById("time-zone-list").firstElementChild.innerHTML)
  if(document.getElementById("time-zone-list").firstElementChild.innerHTML == ""){
    _alert("Alternate Timezone set to - default (EDT/EST)");
  }
  else{
    // _alert("Alternate Timezone set to - "+localStorage.getItem("alternate-time-zone"));
    VanillaToasts.create({
      // title: "Alternate Timezone set to",
      text: "Alternate Timezone set to \n" + localStorage.getItem("alternate-time-zone"),
      type: "success",
      // icon: "https://s0.2mdn.net/5406241/BRAND-4132_BAU-Confluence-6_Banner-Ads_728x90.jpg",
      timeout: 2200
    });
  }
  
// alert();
});


/**COVID19 */
let covid_img = document.getElementById("covid-19-tool");
covid_img.addEventListener('click', function(event) {
let covid_container = document.getElementById("covid-19-container");
(covid_container.style.display=="none") ? covid_container.style.display="block" : covid_container.style.display="none";

});

let fetchCovid19IndiaUrl = "https://api.covid19india.org/data.json";
$.get(fetchCovid19IndiaUrl, function(data, status){
  //cases_time_series statewise tested
  console.log(data.statewise)
  let stateWiseData = data.statewise;
  let covidContainer = document.getElementById("covid-19");
  // covidContainer.appendChild("TBODY");

  stateWiseData.forEach(function(singleStateData){
    trElm = document.createElement("TR");
    
    tdElm1 = document.createElement("TD");
    tdElm1.innerHTML=singleStateData.state;
    tdElm2 = document.createElement("TD");
    tdElm2.innerHTML=singleStateData.active;
    tdElm3 = document.createElement("TD");
    tdElm3.innerHTML=singleStateData.confirmed;
    tdElm4 = document.createElement("TD");
    tdElm4.innerHTML=singleStateData.deaths;
    tdElm5 = document.createElement("TD");
    tdElm5.innerHTML=singleStateData.recovered;
    
    trElm.appendChild(tdElm1);
    trElm.appendChild(tdElm2);
    trElm.appendChild(tdElm3);
    trElm.appendChild(tdElm4);
    trElm.appendChild(tdElm5);


    covidContainer.appendChild(trElm);
// console.log(singleStateData.state)
  })
  // alert("Data: " + data + "\nStatus: " + status);
});