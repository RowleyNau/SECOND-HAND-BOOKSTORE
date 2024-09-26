from PIL import Image
from pytesseract import pytesseract
import cv2
from PIL import Image
import os
import os.path
import sys
import array as arr


def RemovingSideFiles(files):
    for i in files:
        if os.path.exists(i):
            os.remove(i)




def ReadingText(photo, id):
    filesDelete = []

    path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    pytesseract.tesseract_cmd = path_to_tesseract
    img = cv2.imread(photo)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
    cv2.imwrite('threshold_image'+id+'.jpg',thresh1)
    filesDelete.append('threshold_image'+id+'.jpg')

    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (12, 12))
    dilation = cv2.dilate(thresh1, rect_kernel, iterations = 3)
    cv2.imwrite('dilation_image'+id+'.jpg',dilation)
    filesDelete.append('dilation_image'+id+'.jpg')

    contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    im2 = img.copy()

    crop_number=0
    text=''
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)

        # Рисуем ограничительную рамку на текстовой области
        rect = cv2.rectangle(im2, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Обрезаем область ограничительной рамки
        cropped = im2[y:y + h, x:x + w]

        cv2.imwrite("crop"+str(crop_number)+id+".jpeg",cropped)
        filesDelete.append("crop"+str(crop_number)+id+".jpeg")
        crop_number+=1

        cv2.imwrite('rectanglebox'+id+'.jpg',rect)
        filesDelete.append('rectanglebox'+id+'.jpg')
        
        # открываем текстовый файл
        # file = open("text_output2.txt", "a")

        # Использование tesseract на обрезанной области изображения для получения текста 
        
        text = text + pytesseract.image_to_string(cropped, lang='rus')


    RemovingSideFiles(filesDelete)
    return(text)

        # file.write(text)
        # file.write("\n")

        # # Закрываем файл
        # file.close


def ChangePhotoType(photo, name):
    # im1 = Image.open(photo)
    # 
    name=name+'.png'
    photo.save(name)
    return (name)

def TextWithPhoto(photo, id):
    filesDelete = []
    im1 = Image.open(photo)
    # print (im1.format)
    if (im1.format!='PNG'):
        print(im1.format)
        name = os.path.splitext(os.path.basename(photo))[0]
        filesDelete.append(photo)
        photo=ChangePhotoType(im1, name)
        filesDelete.append(photo)
    text = ReadingText(photo, id)

    RemovingSideFiles(filesDelete)
    return(text)

# TextWithPhoto('2884094.png')
    # with open("text_output2.txt", "a") as file:
    #     # Используем Tesseract на обрезанной области изображения для получения текста
    #     text = pytesseract.image_to_string(cropped, lang="rus")

    #     # Добавляем текст в файл
    #     file.write(text)
    #     file.write("\n")
   
   