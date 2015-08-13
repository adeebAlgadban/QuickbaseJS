$.getScript("https://kidkraft.quickbase.com/db/biq5vi3bi?a=dbpage&pageID=8", function(){ //QBAPI CUSTOM UTILITY
	(function(){
		  var querystring=document.location.search,
		  URL=document.location.href,
		  tableid = getTableID(URL), 
		  recid = getRecID(URL);

		 if (/dlta=mog/.test(querystring)) {
		  //GRID EDIT PAGE ==========================================

		 } else if(/a=er/.test(querystring)) {
		  //EDIT RECORD PAGE ========================================
			var tblFields = new QBAPI("https://kidkraft.quickbase.com", "bjqzbtqdp", "dwnt9wipc3cvfcg6nvd3ba97ps4"),
			tblChangeLog = new QBAPI("https://kidkraft.quickbase.com", "bjqzbve6j", "dwnt9wipc3cvfcg6nvd3ba97ps4"),
			tbAuditList = new QBAPI("https://kidkraft.quickbase.com", "bjq352r5r", "dwnt9wipc3cvfcg6nvd3ba97ps4")
			var fields_rs = tblFields.ExecuteQuery("3.7");
			var fields_arr = [],
			beforeChange = {};
			
			tblFields.setQueryString("{10.EX.'"+tableid +"'}");
			for(var fieldsIndexed in fields_rs){
				fields_arr.push({
					recid: fields_rs[fieldsIndexed]['3'].value,
					fid: fields_rs[fieldsIndexed]['7'].value
				});
			}
			for (var i=0; i<fields_arr.length; i++){
				beforeChange[fields_arr[i].fid] = $("#_fid_"+fields_arr[i].fid).val();
			}

			DoSave = (function(fn){//Override Quicbase Save Function
				return function(){
						var changed= {};

					for (var i=0; i<fields_arr.length; i++){
						var newValue = $("#_fid_"+fields_arr[i].fid).val(),
						oldValue = beforeChange[fields_arr[i].fid];
						if(newValue !== oldValue){
							var _list = "&_fid_6=" +fields_arr[i].recid ;
							_list +="&_fid_9=" + oldValue;
							_list +="&_fid_10=" + newValue;
							_list +="&_fid_15=" + recid;

							var changeLogResult = tblChangeLog.addRecord(_list);
							var changeLog_rid = changeLogResult.rid;
							var auditListResult = tbAuditList.addRecord("&_fid_21="+recid+"&_fid_9=" +changeLog_rid);

							console.log(JSON.stringify(changeLogResult));
						}
					}
					var result=fn.apply(fn, arguments); //resume save command
						return result;
				}
			})(DoSave);
			
		//end Edit page block	
		 } else if (/GenNewRecord/.test(querystring)) {
		  //ADD RECORD PAGE ========================================
		 } else if(/a=dr/.test(querystring)) {
		  //DISPLAY RECORD PAGE

		 } else if(/a=q/.test(querystring)) {
		  //REPORT PAGE ========================================
		 } else {
		  //OTHER PAGE ========================================
		 }
	})(); //end anonymous function

//UTILS=================================================

	function getRecID(str){
		var list = str.split("&");
		var recArr = list[1].split("=");
		if(recArr[0]=='r'){
			rid = ob32decode(recArr[1]);
		}else{
			rid = recArr[1];
		}
		return rid;
	}
	function getTableID(fullURL){
		var splitURL = fullURL.split("/");
		var splitURL2 = splitURL[4].split("?");
		return splitURL2[0];
	}
	function ob32decode(ob32) {
 		var ob32Characters = "abcdefghijkmnpqrstuvwxyz23456789";
	 	var decode = 0;
 		var place = 1;
 		for (var counter = ob32.length -1; counter >= 0; counter--) {   
			var oneChar = ob32.charAt(counter);
  			var oneDigit = ob32Characters.indexOf(oneChar);
  			decode += (oneDigit * place);
			place = place*32;
 		}
 		return decode;
	}
	function ob32encode(strDecimal) {
 		var ob32Characters = "abcdefghijkmnpqrstuvwxyz23456789";
 		var decimal = parseInt(strDecimal);
 		var ob32 = "";
 		while (decimal > 0) {
  			var remainder = decimal % 32;
  			remainder = ob32Characters.substr(remainder,1);
  			ob32 = remainder.concat(ob32);
  			decimal = Math.floor(decimal/32);
 		}
 		return ob32;
	}
});//end getscript
