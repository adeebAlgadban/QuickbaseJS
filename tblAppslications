var techServiceList=[], appDependencyDBID="bqhgjchnh",appId= $("#applicationId").text(), existingDependecyList=$("#existingDependecyId").text().replace(/\s+/g, '').split(";");
var consumedInterfaceList=[], appConsumedInterfacesDBID="bqhgrmqzr", existingConsumedInterfacesList=$("#existingConsumedInterfaceId").text().replace(/\s+/g, '').split(";");
var deleteIcon = "https://images.quickbase.com/si/16/202-delete.png", 
    warningIcon = "https://images.quickbase.com/si/16/204-warning.png";	

debugger;
//Logic for submitting infor to dependecny tables
if (typeof (DoSave) === "function") {//if DoSave exists 
    
    DoSave = (function(fn){//Override DoDave behavior
        debugger;
            return function(){
            //logic goes here
            if(techServiceList.length>0){
                var clist = "8.6"; //app ID, techService ID
                var csv = "";
                for(var index=0; index < techServiceList.length; index++){
                    csv = csv + appId + "," +techServiceList[index] +"\n";
                }

                importRecords(csv,clist, appDependencyDBID);
            }
            if(consumedInterfaceList.length>0){//submit Consumed Interfaces
                var clist = "6.10"; //app ID, ConsumedInterface ID
                var csv = "";
                for(var index=0; index < consumedInterfaceList.length; index++){
                    csv = csv + appId + "," +consumedInterfaceList[index] +"\n";
                }

                importRecords(csv,clist, appConsumedInterfacesDBID);
            }

            return fn.apply(fn, arguments);

            }
        })(DoSave);
}//end if (DoSave)

function addTechService(techServiceId, techServiceName, dbid){
	debugger;

	var htmlRow = "<span style='font-size=105%'><div"+ " id='techServiceId_" + techServiceId +"'>" ;
		htmlRow +="<b><a href='#'><img src='"+ deleteIcon +"'" + " onClick='removeSelection(\"techServiceId_" + techServiceId+ "\""+","+techServiceId+ "); return false;'" +"></a>" ;
		htmlRow += techServiceName;
		htmlRow += "</div></span><br>";


	if (appDependencyDBID === 0 || typeof appDependencyDBID === "undefined"){
		alert("Application ID is Null. Please contact system administrator!");
		return;
	}

	if (techServiceId === 0 || typeof techServiceId === "undefined"){
		//alert("A technology service selection is required!");
		
         $('<div id="childError" style="color:red"><p><b><img src="'+ warningIcon +
         '">Select a Technology Service in the Search Box</p></div>').appendTo('#addTechServiceError').fadeIn(2000);
		setTimeout(function (){
						$("#childError").fadeOut("slow","linear").empty();
						//$("#childError").empty();
					},5000);
		return;
	}	

	if((techServiceList.length === 0 || techServiceList.indexOf(techServiceId) === -1) && existingDependecyList.indexOf(techServiceId.toString())===-1 ) {

		techServiceList.push(techServiceId);

		$("#addTechServiceList").append(htmlRow);
		
	}else{
		if ( $('#addTechServiceError').children().length ===  0 ) {
            $('<div id="childError2" style="color:red"><p><b><img src="' + warningIcon +	
            '">This Technology Service is already selected!</p></div>').appendTo('#addTechServiceError').fadeIn(2000);
		}
		setTimeout(function (){
						$("#childError2").fadeOut("slow","linear").empty();
					},5000);
		return;
	}
}

function addConsumedInterface(consumedInterfaceId, consumedInterfaceName,regulatory){
	var htmlRow = "<span style='font-size=105%'><div"+ " id='consumedServiceId_" + consumedInterfaceId +"'>" ;
		htmlRow +="<b><a href='#'><img src='"+ deleteIcon +"'" + " onClick='removeSelection(\"consumedInterfaceId_" + consumedInterfaceId+ "\""+","+consumedInterfaceId+","+ consumedInterfaceList+"); return false;'" +"></a>" ;
		htmlRow += consumedInterfaceName+" - " + regulatory;
        htmlRow += "</div></span><br>";
        
	if (consumedServiceId === 0 || typeof consumedServiceId === "undefined"){
		
		 $('<div id="childError" style="color:red"><p><b><img src="' + warningIcon + '">Select a Technology Service in the Search Box</p></div>').appendTo('#addConsumedInterfaceError').fadeIn(2000);
		setTimeout(function (){
						$("#childError").fadeOut("slow","linear").empty();
						//$("#childError").empty();
					},5000);
		return;
	}	

	if((consumedInterfaceList.length === 0 || consumedInterfaceList.indexOf(consumedServiceId) === -1) && existingConsumedInterfacesList.indexOf(consumedServiceId.toString())===-1 ) {

		consumedInterfaceList.push({"id": consumedServiceId, "regulatory": regulatory});

		$("#addConsumedInterfaceList").append(htmlRow);
		
	}else{
		if ( $('#addConsumedInterfaceError').children().length ===  0 ) {
            $('<div id="childError2" style="color:red"><p><b><img src="'+ warningIcon +
            '">This Technology Service is already selected!</p></div>').appendTo('#addConsumedServiceError').fadeIn(2000);
		}
		setTimeout(function (){
						$("#childError2").fadeOut("slow","linear").empty();
					},5000);
		return;
	}
}


//resuable
function removeSelection(divid, elementId, arrList){
	arrList = arrayRemove(arrList, elementId); //remove from list
	$("#" + divid).remove();
}




//utility functions
//-----------------
function arrayRemove(arr, value) {
	 return arr.filter(function(ele){ return ele != value; });
}



function importRecords(csv, clist, target) {
    debugger;
     	var request = "",  url = "https://southwest.quickbase.com/db/" + target + '?act=API_ImportFromCSV'; 
      	request += "<qdbapi>" ;
      	request += "<records_csv>" + "<![CDATA[";
     	request += csv;
     	request += "]]>" + "</records_csv>" ;
      	request += "<clist>" + clist + "</clist>";
      	request += "</qdbapi>";
      	var xmlhttp= '';
    
      	if (window.XMLHttpRequest){
        		xmlhttp = new XMLHttpRequest();
      	}
      	else{ 
        	// code for IE5 and IE6
        		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      	}
    
    	xmlhttp.open("POST", url, false);
    	xmlhttp.setRequestHeader("content-type","text/xml");
    	xmlhttp.send(request);
    	var result = {};

    	result.errorcode = $(xmlhttp.response).find('errcode').text();
    	result.errortext = $(xmlhttp.response).find('errtext').text();
       	result.numrecsinput = $(xmlhttp.response).find('num_recs_input').text(); 

    	if( $(xmlhttp.response).find('num_recs_added')){
      		result.numrecsadded = $(xmlhttp.response).find('num_recs_added').text();
      			$(xmlhttp.response).find("rid").each(function(){
        			result.records +="update_id: " + $(this).attr('update_id') +  " rid: " + $(this).text() + '\n';
      		});

    	}
}

