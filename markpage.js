const os = require('os')
var fs = require('fs');

var p = os.homedir() + "/Documents/AttendanceManager/list.txt";


var array = fs.readFileSync(p).toString().split("\n");

var i;
var l = document.getElementById("list");

for(i=0; i<array.length-1; i++)
{
    var x = document.createElement('li');
    x.tabIndex = i;
    x.innerHTML = array[i];
    l.appendChild(x);

}

var fn = null; var f = null;

l.addEventListener('click',(event) => {
    var target = event.target || event.srcElement;
    fn=target.innerHTML;
    var arr = fn.split("\n");
    f = arr[0];
})

const mark = document.getElementById('mark');

mark.addEventListener('click', (event) => {

    var child = require('child_process').exec;
    var executablePath ='python atten/mark.py' + ' ' + f;

    if(f==null)
    {
        alert("Please select a class");
        return;
    }

    alert("Press q to close the camera")

    child(executablePath, function(err, stdout) {
        
        if(err){
           alert(err);
           return;
        }
     
        alert("Attendence Marked")
        f=null;
    });

  })

