import face_recognition
import xlrd
import sys
import pickle
import os
from shutil import copyfile


userhome = os.path.expanduser('~') + "\Documents\AttendanceManager\data"

if not os.path.isdir(userhome):
    os.makedirs(userhome)


loc=str(sys.argv[1])                          #path to xlsx file
picfolder=str(sys.argv[2])                    # path to photos folder

fileName = os.path.basename(loc)
f=fileName.split('.')[0]
userhome = userhome + '/' + f + ".data"

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)
sheet.cell_value(0, 0)

known_face_encodings = []

for i in range(1,sheet.nrows):
    imname=sheet.cell_value(i,0)
    impath=picfolder + '/' + imname+".jpg"
    im=face_recognition.load_image_file(impath)
    face_enc=face_recognition.face_encodings(im)[0]
    known_face_encodings.append(face_enc)

with open(userhome,'wb') as filehandle:
    pickle.dump(known_face_encodings,filehandle)

filehandle.close()

records=os.path.expanduser('~') + "\Documents\AttendanceManager\Records"

if not os.path.isdir(records):
    os.makedirs(records)


fileName = records + '/' + fileName

copyfile(loc,fileName)

if os.path.exists(os.path.expanduser('~') + "\Documents\AttendanceManager\list.txt"):
    classes=[]

    with open(os.path.expanduser('~') + "\Documents\AttendanceManager\list.txt",'rt') as listfile:
        listcontents = listfile.readlines()
    
    for line in listcontents:
        current=line[:-1]
        classes.append(current)
    
    listfile.close()

    for c in classes:
        if c==f:
            classes.remove(c)
    
    classes.append(f)

    with open(os.path.expanduser('~') + "\Documents\AttendanceManager\list.txt",'wt') as listwrite:
        listwrite.writelines("%s\n" % line for line in classes)
    
    listwrite.close()

else:
    classes=[]
    classes.append(f)
    with open(os.path.expanduser('~') + "\Documents\AttendanceManager\list.txt",'wt') as listwrite:
        listwrite.writelines("%s\n" % line for line in classes)
    
    listwrite.close()
    

print("Class Added")
