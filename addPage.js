const electron = require('electron')
const path = require('path')
const remote = electron.remote

var file;
var dir;

const closebutton = document.getElementById('closebtn')

closebutton.addEventListener('click', (event) => {
    var window = remote.getCurrentWindow()
    window.close()

  })

  
const {dialog} = require('electron').remote
const selectDirBtn = document.getElementById('select-directory')
const selectFileBtn = document.getElementById('select-file')


selectFileBtn.addEventListener('click', (event) => {
  file=dialog.showOpenDialog({properties: ['openFile']})
  document.getElementById('selected-file').innerHTML=file
})

selectDirBtn.addEventListener('click', (event) => {
  dir=dialog.showOpenDialog({properties: ['openDirectory']})
  document.getElementById('selected-directory').innerHTML=dir
})

const submit = document.getElementById('submit')

submit.addEventListener('click', (event) => {
  
  var child = require('child_process').execFile;
  var executablePath ='atten/addclass.py';

  document.getElementById('form').remove()
  document.getElementById('close').remove()

  var pa = document.createElement('p');
  pa.id='adding';
  pa.innerHTML="Adding Class";
  document.getElementById('body').appendChild(pa);
  
  child(executablePath,[file,dir], function(err, stdout) {
    if(err){
       alert(err);
       var ok = document.createElement('a');
       ok.id='ok';
       ok.innerHTML='Ok';
       document.getElementById('body').appendChild(ok);
       document.getElementById('adding').innerHTML="Error occured"
   
       const close2 = document.getElementById('ok')
   
       close2.addEventListener('click', (event) => {
       var window = remote.getCurrentWindow()
       window.close()
       
       })
       return;
    }

    var ok = document.createElement('a');
    ok.id='ok';
    ok.innerHTML='Ok';
    document.getElementById('body').appendChild(ok);
    document.getElementById('adding').innerHTML="Class Added"

    const close2 = document.getElementById('ok')

    close2.addEventListener('click', (event) => {
    var window = remote.getCurrentWindow()
    window.close()
    
    })

  });

})




