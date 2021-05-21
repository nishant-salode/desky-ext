document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('btn-capture');
    var updateBtn = document.getElementById("update-btn");
    // onClick's logic below:
    btn.addEventListener('click', function(event) {
        console.log(event.target.nodeName)
        const isButton = event.target.nodeName === 'IMG' ||  event.target.nodeName === 'BUTTON';
        if (!isButton) {
            // console.log("Not a button");
            return;
        }
        else{
            let btnSelection = event.target.name;
            
            //setting code
            if(btnSelection == "settings"){
                if($("#detailForm").css('display') == "block" || $("#detailForm").css('display') == "inline-block"){
                    $(".hid").each(function(){
                        $(this).slideUp("faster");
                    });
                }
                else{
                    $(".hid").each(function(){
                        $(this).slideDown(200);
                    });
    
                }
        // (document.getElementById("detailForm").style.display == "none") ? $("#detailForm").slideDown("slow")  : $("#detailForm").slideUp("slow");
            
            document.getElementById("firstname").value = localStorage.getItem("firstname");
            }
            else if(btnSelection == "home"){
                alert("Fill me up with stuffs!");
            }

        }

    });

    //Update username
    updateBtn.addEventListener('click', function(event) {
        firstname = document.getElementById("firstname").value;
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response){
                
                // document.getElementById("username").innerHTML = localStorage.getItem("firstname");
            });
        });
        $(".hid").each(function(){
            $(this).slideUp("faster");
        });
        localStorage.setItem("firstname",firstname);
        // document.getElementById("username").innerHTML = localStorage.getItem("firstname");
    });
});


//send message to content js to update Username on new tab

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response){
//         alert(response);
//         // document.getElementById("username").innerHTML = localStorage.getItem("firstname");
//     });
// });