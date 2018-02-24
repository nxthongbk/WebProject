var myParking = [ 
    { 
        "ID": 'P00', 
        "name": "HUTECH", 
        "latLng": {'lat': 10.8022498, 'lng': 106.7146623}, 
        "descirption": "", 
        "address": "475 A Điện Biên Phủ, Phường 25, Quận Bình Thạnh", 
        "total": 48, 
        "available" : 0 
    }, 
    { 
        "ID": 'P01', 
        "name": "Le Tai Ky", 
        "latLng": {'lat': 10.8070963, 'lng': 106.7166226}, 
        "descirption": "", 
        "address": "", 
        "total": 20, 
        "available" : 0 
    }, 
    { 
        "ID": 'P02', 
        "name": "Charm Suite Saigon Hotel", 
        "latLng": {'lat': 10.8001213, 'lng': 106.7213495}, 
        "descirption": "", 
        "address": "330 Ung Văn Khiêm, Phường 25, Bình Thạnh", 
        "total": 100, 
        "available" : 0 
    }, 
    { 
        "ID": 'P03', 
        "name": "Thao Dien Pearl", 
        "latLng": {'lat': 10.80152, 'lng': 106.7293403}, 
        "descirption": "", 
        "address": "12 Quốc Hương, Thảo Điền, Quận 2", 
        "total": 200, 
        "available" : 0 
    }, 
    { 
        "ID": 'P04', 
        "name": "Dinh Doc Lap", 
        "latLng": {'lat': 10.777894, 'lng': 106.697012}, 
        "descirption": "", 
        "address": "", 
        "total": 16, 
        "available" : 0 
    }, 
    { 
        "ID": 'P05', 
        "name": "Đại học Văn Lang", 
        "latLng": {'lat': 10.8109419, 'lng': 106.6966851}, 
        "descirption": "", 
        "address": "233 Phan Văn Trị, phường 11, Bình Thạnh", 
        "total": 16, 
        "available" : 0 
    }, 
    { 
        "ID": 'P06', 
        "name": "Co.opmart Rạch Miễu", 
        "latLng": {'lat': 10.7989737, 'lng': 106.6847903}, 
        "descirption": "", 
        "address": "48 Hoa Sứ, phường 7, Phú Nhuận", 
        "total": 30, 
        "available" : 0 
    }, 
    { 
        "ID": 'P07', 
        "name": "Bênh Viên Ung Bướu", 
        "latLng": {'lat': 10.8070218, 'lng': 106.6910504}, 
        "descirption": "", 
        "address": "5/ Nơ Trang Long, phường 7, Bình Thạnh", 
        "total": 16, 
        "available" : 0 
    } 
]; 
 
var index; 
var numbParking = myParking.length; 
 
var  channelID = '270768'; 
var  write_API_Key = '340LZZIBFTWH6CBN'; 
var  read_API_Keys = 'TI6JXFG7XTXLQ249'; 
 
var thisData = [0,0,0,0,0,0,0,0]; 
/* Function read data from thingspeak server*/ 
function getData(){ 
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', "https://api.thingspeak.com/channels/270768/feeds.json?api_key=TI6JXFG7XTXLQ249&results=1", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
 
    function processRequest(e) { 
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var response = JSON.parse(xhr.responseText); 
            //document.getElementById("data").innerHTML = response.feeds[0].field1; 
            /*store data to variable thisData*/ 
            thisData = [response.feeds[0].field1,response.feeds[0].field2,response.feeds[0].field3,response.feeds[0].field4, 
                            response.feeds[0].field5,response.feeds[0].field6,response.feeds[0].field7,response.feeds[0].field8]; 
            var out=0; 
            var j = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768]; 
            for (index=0; index<myParking.length; index++){ 
                //myParking[index].available = thisData[index]; 
                out=0; 
                var i; 
                for (i=0;i<16;i++){ 
                    if(((thisData[index]&j[i])>>i)==0){ 
                        out = out+1; 
                    } 
                } 
                myParking[index].available = String(out); 
            } 
        } 
         
    } 
} 
/* END:  Function read data from thingspeak server */ 
