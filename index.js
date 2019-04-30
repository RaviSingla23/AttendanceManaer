const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const {shell} = require('electron')
const os = require('os')
var fs = require('fs')


const addbutton = document.getElementById('addbutton')

addbutton.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, 'addPage.html')
  let win = new BrowserWindow({ frame: false,transparent: true, width: 450, height: 350, webPreferences: {nodeIntegration: true} })

  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

const show = document.getElementById('showbutton')
show.addEventListener('click', (event) => {
  var p = os.homedir() + "/Documents/AttendanceManager/Records/";
  if(fs.existsSync(p))
  {
    shell.showItemInFolder(p + "a")
  }

  else
  {
    alert("No Records");
  }
  
})