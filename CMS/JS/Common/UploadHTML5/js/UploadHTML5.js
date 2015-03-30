// common variables
var iBytesUploaded = 0;
var iBytesTotal = 0;
var iPreviousBytesLoaded = 0;
var iMaxFilesize = 2048576; // 1MB
var oTimer = 0;
var sResultFileSize = '';
var ElementHTML_ReturnBackImageName ;
var oXHR = new window.XMLHttpRequest();




function secondsToTime(secs) { // we will use this function to convert seconds in normal time format
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (hr < 10) {hr = "0" + hr; }
    if (min < 10) {min = "0" + min;}
    if (sec < 10) {sec = "0" + sec;}
    if (hr) {hr = "00";}
    return hr + ':' + min + ':' + sec;
};

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

function fileSelected(indexUploadModule) {
 
    // hide different warnings
    document.getElementById('upload_response_' + indexUploadModule).style.display = 'none';
    document.getElementById('error_' + indexUploadModule).style.display = 'none';
    document.getElementById('error2_' + indexUploadModule).style.display = 'none';
    document.getElementById('abort_' + indexUploadModule).style.display = 'none';
    document.getElementById('warnsize_' + indexUploadModule).style.display = 'none';

    // get selected file element
    var oFile = document.getElementById("image_file_" + indexUploadModule).files[0];

    // filter for image files
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if (! rFilter.test(oFile.type)) {
        document.getElementById('error_' + indexUploadModule).style.display = 'block';
        return;
    }

    // little test for filesize
    if (oFile.size > iMaxFilesize) {
        document.getElementById('warnsize_' + indexUploadModule).style.display = 'block';
        return;
    }

    // get preview element
    var oImage = document.getElementById("preview_" + indexUploadModule);

    // prepare HTML5 FileReader
    var oReader = new FileReader();
        oReader.onload = function(e){

        // e.target.result contains the DataURL which we will use as a source of the image
        oImage.src = e.target.result;
       
        sResultFileSize = bytesToSize(oFile.size);
        
        document.getElementById('fileinfo_' + indexUploadModule).style.display = 'block';

        document.getElementById('filename_' + indexUploadModule).innerHTML = 'Name: ' + oFile.name.substr(0, 8);
        document.getElementById('filesize_' + indexUploadModule).innerHTML = 'Size: ' + sResultFileSize;
        document.getElementById('filetype_' + indexUploadModule).innerHTML = 'Type: ' + oFile.type;
        document.getElementById('filedim_' + indexUploadModule).innerHTML = 'Dimension: ' + oImage.naturalWidth + ' x ' + oImage.naturalHeight;


    };

    // read selected file as DataURL
        oReader.readAsDataURL(oFile);
        
}

function startUploading(indexUploadModule, idForm, TypeUpload, returnBackImageName, IsEncodeFileName, Width, Height, isCreateThumb, IsKeepRatio) {
    // cleanup all temp states

    iPreviousBytesLoaded = 0;
    document.getElementById('upload_response_' + indexUploadModule).style.display = 'none';
    document.getElementById('error_' + indexUploadModule).style.display = 'none';
    document.getElementById('error2_' + indexUploadModule).style.display = 'none';
    document.getElementById('abort_' + indexUploadModule).style.display = 'none';
    document.getElementById('warnsize_' + indexUploadModule).style.display = 'none';
    document.getElementById('progress_percent_' + indexUploadModule).innerHTML = '';

    ElementHTML_ReturnBackImageName = returnBackImageName;

    var oProgress = document.getElementById('progress_' + indexUploadModule);
    oProgress.style.display = 'block';
    oProgress.style.width = '0px';

    // get form data for POSTing
    //var vFD = document.getElementById('upload_form').getFormData(); // for FF3
    //alert(idForm);
    //alert(document.getElementById(idForm));

    var vFD = new FormData(document.getElementById(idForm)); 


    //####################################################################################
    // create XMLHttpRequest object, adding few event listeners, and POSTing our data

    oXHR = new window.XMLHttpRequest();

    oXHR.upload.addEventListener('progress', function (e) { uploadProgress(indexUploadModule,e) }, false);
    oXHR.addEventListener('load', function (e) { uploadFinish(indexUploadModule,e) }, false);
    oXHR.addEventListener('error', function (e) { uploadError(indexUploadModule,e) }, false);
    oXHR.addEventListener('abort', function (e) { uploadAbort(indexUploadModule,e) }, false);
    oXHR.open('POST', '../Action/ProcessUploadAction.ashx?TypeUpload=' + TypeUpload + "&IsEncodeFileName=" + IsEncodeFileName + "&Width=" + Width + "&Height=" + Height + "&isCreateThumb=" + isCreateThumb + "&IsKeepRatio" + IsKeepRatio);
    
    oXHR.send(vFD);
 
    oTimer = setInterval(doInnerUpdates(indexUploadModule), 3000);

}

function doInnerUpdates(indexUploadModule) { // we will use this function to display upload speed
    var iCB = iBytesUploaded;
    var iDiff = iCB - iPreviousBytesLoaded;

    // if nothing new loaded - exit
    if (iDiff == 0)
        return;

    iPreviousBytesLoaded = iCB;
    iDiff = iDiff * 2;
    var iBytesRem = iBytesTotal - iPreviousBytesLoaded;
    var secondsRemaining = iBytesRem / iDiff;

    // update speed info
    var iSpeed = iDiff.toString() + 'B/s';
    if (iDiff > 1024 * 1024) {
        iSpeed = (Math.round(iDiff * 100/(1024*1024))/100).toString() + 'MB/s';
    } else if (iDiff > 1024) {
        iSpeed =  (Math.round(iDiff * 100/1024)/100).toString() + 'KB/s';
    }

    document.getElementById('speed_' + indexUploadModule).innerHTML = iSpeed;
    document.getElementById('remaining_' + indexUploadModule).innerHTML = '| ' + secondsToTime(secondsRemaining);
}

function uploadProgress(indexUploadModule,e) { // upload process in progress
    
    if (e.lengthComputable) {
        iBytesUploaded = e.loaded;
        iBytesTotal = e.total;
        var iPercentComplete = Math.round(e.loaded * 100 / e.total);
        var iBytesTransfered = bytesToSize(iBytesUploaded);
        
        document.getElementById('progress_percent_' + indexUploadModule).innerHTML = iPercentComplete.toString() + '%';
        document.getElementById('progress_' + indexUploadModule).style.width = iPercentComplete.toString() + '%'; //148 : để đủ độ dài mong muốn của thanh progress bar
        document.getElementById('b_transfered_' + indexUploadModule).innerHTML = iBytesTransfered;
        if (iPercentComplete == 100) {
            var oUploadResponse = document.getElementById('upload_response_' + indexUploadModule);
            oUploadResponse.innerHTML = '<h1>Please wait...processing</h1>';
            oUploadResponse.style.display = 'block';
        }
    } else {
        document.getElementById('progress_' + indexUploadModule).innerHTML = 'unable to compute';
    }
}
function GetFileName(path) {

    return path.substring(path.lastIndexOf('\\') + 1);
}
function uploadFinish(indexUploadModule,e) { // upload successfully finished
   
    var oUploadResponse = document.getElementById('upload_response_' + indexUploadModule);
    
    oUploadResponse.style.display = 'block';
    //oUploadResponse.style.display = 'none';
    //oUploadResponse.innerHTML = e.target.responseText;
    oUploadResponse.innerHTML = e;
    var retJsonObj = JSON.parse(oXHR.responseText);
    
    //var retJsonObj = e;

    if (retJsonObj.Status == 'Success') {

        document.getElementById(ElementHTML_ReturnBackImageName).value = GetFileName(retJsonObj.File);
      
    }

    document.getElementById('progress_percent_' + indexUploadModule).innerHTML = '100%';
    document.getElementById('progress_' + indexUploadModule).style.width = '100%';
    document.getElementById('filesize_' + indexUploadModule).innerHTML = sResultFileSize;
    document.getElementById('remaining_' + indexUploadModule).innerHTML = '| 00:00:00';
    
    clearInterval(oTimer);
}

function uploadError(indexUploadModule,e) { // upload error
    alert(1);
    document.getElementById('error2_' + indexUploadModule).style.display = 'block';
    clearInterval(oTimer);
}  

function uploadAbort(indexUploadModule,e) { // upload abort
    document.getElementById('abort_' + indexUploadModule).style.display = 'block';
    clearInterval(oTimer);
}