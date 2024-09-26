from urllib.parse import urlparse
from bs4 import BeautifulSoup, SoupStrainer
import requests
import array as arr 
import re
import numpy as np
from itertools import groupby

# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as ec
# from selenium.webdriver.common.by import By

# chrome_options = Options()

# from selenium import webdriver


ISBN='9785001312352'
name='Тревожные люди'
# name='Солярис'
chr={
    "Название": [],
    "Автор": [],
    "Издательство": [],
    "Год издания": [],
    "ISBN": [],
    "Жанр": [],
    "Переплет": [],
    "Количество страниц": [],
    "Масса": [],
    "Размер": [],
    "Возрастное ограничение": []
  } 

def searchLabirint(a, chr, typeName):
  url = 'https://www.labirint.ru/search/'+a+'/?stype=0'
  nameClass="product-card__name"
  url1=searchAll(urlForParser(url), nameClass, 'a')
  if url1==False:
    return (chr)

      
  urlBook=urlForParser('https://www.labirint.ru'+url1.get('href'))

  # url = 'https://book24.ru/search/?q='+a
  # nameClass="product-card__name"
  # searchAll(urlForParser(url), nameClass, 'a')
  ccc=urlForParser(url).find_all('a', nameClass)
  if len(ccc)>=5:
    ccc=ccc[:4]
  # print(len(ccc))

  chrElements={
    "Название": [{'id': "product-title"},'div'],
    "Автор": ["authors",'div'],
    "Издательство": ["publisher",'div'],
    "Год издания": ["publisher",'div'],
    "ISBN": ["isbn",'div'],
    "Жанр": [{'id': "thermometer-books"},'div'],
    "Переплет": False,
    "Количество страниц": ["pages2",'div'],
    "Масса": ["weight",'div'],
    "Размер": ["dimensions",'div'],
    "Возрастное ограничение": [{'id': "age_dopusk"},'div']
  } 

  for i in ccc:
    
    urlIdBook=i.get('href')
    nameIdBook=i.text
    if (existence(a, nameIdBook) and typeName) or typeName!=True: 
      urlBook=urlForParser('https://www.labirint.ru'+urlIdBook)

      # автор и издательство. С ссылками одного класса
      auPub=["Автор","Издательство"]
      for j in auPub:
        urlBook2=searchAll(urlBook, chrElements[j][0], chrElements[j][1])
        chr[j].append(urlBook2.find('a', "analytics-click-js").text)

      # ISBN, стр, масса, возрастное ограничение, размер, год. Только числа
      ISBNPWAS =["Количество страниц","ISBN","Масса","Возрастное ограничение","Размер","Год издания"]
      for j in ISBNPWAS:
        urlBook2=searchAll(urlBook, chrElements[j][0], chrElements[j][1]).text
        urlBook2=urlBook2.replace('-',"")    
        urlBook2=urlBook2.replace('x'," ")
        urlBook2=urlBook2.replace('+'," ") 
        if(j=="Размер"):
          chr[j].append(re.findall(r'\d*\.\d+|\d+[+]?', urlBook2))
        else:
          chr[j].append(re.findall(r'\d*\.\d+|\d+[+]?', urlBook2)[0])
      
      # Название книги
      nameBook="Название"
      b=searchAll(urlBook, chrElements[nameBook][0], chrElements[nameBook][1]).find_next('h1',class_=[]).get_text(strip=True)
      chr[nameBook].append(re.sub(r'^.*?:\s*', '', b))
      
      # Жанр
      genre="Жанр"
      b=searchAll(urlBook, chrElements[genre][0], chrElements[genre][1]).find_all_next('span', {'itemprop': "title"})[1:len(b)-1]
      c=[]
      for j in b:
        c=j.text
      chr[genre].append(c)
  return(chr)

def searchBook24(a, chr, typeName):
  url = 'https://book24.ru/search/?q='+a
  nameClass="product-card__name"
  # searchAll(urlForParser(url), nameClass, 'a')
  ccc=urlForParser(url).find_all('a', nameClass)

  if len(ccc)>=5:
    ccc=ccc[:5]
  
  chrElements={
    "Название": [ "product-detail-page__title", 'h1'],
    "Автор": ["authors",'div'],
    "Издательство": ["publisher",'div'],
    "Год издания": ["publisher",'div'],
    "ISBN": ["isbn",'div'],
    "Жанр": [{'id': "thermometer-books"},'div'],
    "Переплет": [],
    "Количество страниц": ["pages2",'div'],
    "Масса": ["weight",'div'],
    "Размер": ["dimensions",'div'],
    "Возрастное ограничение": [{'id': "age_dopusk"},'div']
  }
  for i in ccc:
    # print(ccc[i])
    urlIdBook=i.get('href')
    nameIdBook=i.text
  
    
  # print(searchAll(urlBook, "product-detail-page__title", 'h1'))
  # print('https://book24.ru'+searchAll(urlForParser(url), nameClass, 'a').get('href'))

     
    if (existence(a, nameIdBook) and typeName) or typeName!=True: 
      urlBook=urlForParser('https://book24.ru'+urlIdBook)
    # Название книги
      nameBook="Название"
      b=searchAll(urlBook, chrElements[nameBook][0], chrElements[nameBook][1]).text
      chr[nameBook].append(re.sub(r'^.*?:\s*|^\s+|\s+$', '', b))

    # Остальные характеристики 
      chrBook=["Автор","Издательство","Год издания","ISBN","Раздел","Размер","Переплет","Количество страниц","Возрастное ограничение"]
      urlBook2=urlBook.find_all('div', "product-characteristic__item")
      for i in urlBook2:
        urlChrName=searchAll(i, "product-characteristic__label", 'span').text.replace(': ',"")
        urlChrName=re.sub(r'^\s+|\s+$', '', urlChrName)
        # print (urlChrName)
        for j in chrBook:
          if urlChrName==j:
            ch=searchAll(i, 'product-characteristic__value', 'dd').text
            # print(type(chr[j]), j)
            chr[j].append(re.sub(r'^\s+|\s+$|-|[+]', '', ch))
            
            # print(chr[j])
            break
          elif urlChrName=='Вес':
            ch=searchAll(i, 'product-characteristic__value', 'dd').text
            # m=re.findall(r'\d*\.\d+|\d+[+]?', chr['Масса'])
            chr['Масса'].append(kilogramsToGrams(re.findall(r'\d*\.\d+|\d+[+]?', ch)))
            break
          elif urlChrName=='Раздел':
            ch=searchAll(i, 'product-characteristic__value', 'dd').text
            # m=re.findall(r'\d*\.\d+|\d+[+]?', chr['Масса'])
            chr['Жанр'].append(ch)
            break
          elif urlChrName=='Формат':
            ch=searchAll(i, 'product-characteristic__value', 'dd').text
            ch=re.sub(r'^\s+|\s+$', '', ch)
            chr['Размер'].append(re.findall(r'\d*\.\d+|\d+[+]?', ch))
            # print(chr['Размер'])
            break
  return(chr) 

def existence(name, webName):
  # webName = re.sub(r'^.*?:\n', '', webName)
  name = name.split()
  # print(name)
  for i in name:
    if False==(i.lower() in webName.lower()):
      return False
  return True

def kilogramsToGrams(a):
  a=float(a[0])
  a=int(a*1000)
  return str(a)
  
def searchAll(url, nameClass, element):
  temp = url.find(element, nameClass)
  # print(soup)
  # print(temp.get('href'))
  if temp:
    return temp
  else:
    return False
  
def urlForParser(url):
  url = requests.get(url)   
  soup = BeautifulSoup(url.text,'html.parser')
  return soup

def removeTheSame(chr1):
  # for i in len(chr1['Название']):
  #   print(i)

  for key, value in chr1.items():
    # print("{0}: {1}".format(key,value))
    # value=set(value)
    # print(type(value))
    if key!="Размер" and len(value)!=0:
    #   print ("что-то пусто")
    # elif :
      # chr1[key]=set(value)
      chr1[key]= [el for el, _ in groupby(chr1[key])]
  return chr1
    

def testForResult(chr):
  flg=False
  for key, value in chr.items():
    if len(value)!=0:
      flg=True
  return flg

# print(chr1)

    # a=set(value)
    # b=list(a)
    # print (b)
    # 
    #   print (i)
    # print("{0}: {1}".format(key,value))


def AllSearch(a, typeName):
  chr={
    "Название": [],
    "Автор": [],
    "Издательство": [],
    "Год издания": [],
    "ISBN": [],
    "Жанр": [],
    "Переплет": [],
    "Количество страниц": [],
    "Масса": [],
    "Размер": [],
    "Возрастное ограничение": []
  } 
  chr=searchBook24(a, chr, typeName)
  chr=searchLabirint(a, chr, typeName)
  #Проверка на наличие результата
  if testForResult(chr):
  #Проверка на одинаковые результаты
    chr=removeTheSame(chr)
    print (chr)
    return(chr)
  else:
    return (False)

# searchBook24(name,chr, True)
# searchBook24(ISBN,chr, False)
# searchBook24("рпраопраропап",chr, True)
# searchLabirint(ISBN,chr, False)

# print(AllSearch('9785001312352', False))
# for key, value in chr.items():
#   print("{0}: {1}".format(key,value))
# url = 'https://www.labirint.ru'+str(temp.get('href'))
# res = requests.get(url)
# soup = BeautifulSoup(res.text,'html.parser')
# temp = soup.find('div', "articul")
# s=temp.text
# print(s.replace("ID товара: ",""))
# print(existence("Тревожные люди","Тревожный мозг. Как успокоить мысли, исцелить разум и"))






