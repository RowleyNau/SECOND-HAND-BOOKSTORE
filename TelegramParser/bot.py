import telebot;
from telebot import types
from Search import AllSearch
from ReadingTextFromPhotos.ReadingText import TextWithPhoto
import time
import os
bot = telebot.TeleBot('6411164734:AAHWpgXswRj_k61xCOoLMo1r4uSIWJfsCuw')


@bot.message_handler(commands=['start'])
def welcome(message):
    #клавиатура
    # markup=types.ReplyKeyboardMarkup(resize_keyboard=True)
    # basicBut=types.KeyboardButton(text="Добавить книгу")
    # basicBut1=types.KeyboardButton(text="Считать текст с фото")
    # markup.add(basicBut, basicBut1)
    bot.send_message(message.chat.id, "Здравствуйте, {0.first_name}!".format(message.from_user, bot.get_me()),parse_mode='html')
    basicFun(message)

def basicFun(message):
    markup=types.ReplyKeyboardMarkup(resize_keyboard=True)
    basicBut=types.KeyboardButton(text="Добавить книгу")
    basicBut1=types.KeyboardButton(text="Считать текст с фото")
    markup.add(basicBut, basicBut1)
    bot.send_message(message.chat.id, "Что Вы хотите сделать?", reply_markup=markup)

@bot.message_handler(content_types=['text'])
def get_text_messages(message):
    if message.text =='Добавить книгу':

        markup=types.ReplyKeyboardMarkup(resize_keyboard=True)
        markup.add(types.KeyboardButton(text="Ввести самостоятельно"),
              types.KeyboardButton(text="Поиск по ISBN"),
              types.KeyboardButton(text="Поиск по названию"))
        bot.send_message(message.chat.id, "Выберите, как хотите добавить книгу", reply_markup=markup)
        bot.register_next_step_handler(message, setBookChoice)
        # setBook(message)
    elif message.text =='Считать текст с фото':
        a = telebot.types.ReplyKeyboardRemove()
        bot.send_message(message.chat.id, "Отправьте фото", reply_markup=a)
        bot.register_next_step_handler(message, SearchTextOnPhotoBase)
    else:
        bot.send_message(message.chat.id, 'Я не знаю что ответить')

def RemovingSideFiles(files):
    for i in files:
        if os.path.exists(i):
            os.remove(i)

@bot.message_handler(content_types=['photo'])
def SearchTextOnPhotoBase(message):
    filesDelete = []
    file_info = bot.get_file(message.photo[len(message.photo) - 1].file_id)
    downloaded_file = bot.download_file(file_info.file_path)
    src = './ReadingTextFromPhotos/photo/photo' + message.photo[1].file_id+ '.png'
    with open(src, 'wb') as new_file:
        new_file.write(downloaded_file)
        filesDelete.append(new_file.name)
    
    text=TextWithPhoto(src, message.photo[1].file_id)
    RemovingSideFiles(filesDelete)

    bot.reply_to(message, text)
    basicFun(message)



def setBookChoice(message):
    a = message.text
    if a =="Поиск по ISBN":
        NoBut = telebot.types.ReplyKeyboardRemove()
        bot.send_message(message.chat.id, "Введите ISBN", reply_markup=NoBut)
        bot.register_next_step_handler(message, setBookForSearch, False)
    if a =="Поиск по названию":
        NoBut = telebot.types.ReplyKeyboardRemove()
        bot.send_message(message.chat.id, "Введите название", reply_markup=NoBut)
        bot.register_next_step_handler(message, setBookForSearch, True)
    elif a =="Ввести самостоятельно":
        NoBut = telebot.types.ReplyKeyboardRemove()
        bot.send_message(message.chat.id, "Эх, не цените труд, хотя работа правда странная и немного бесполезная...)", reply_markup=NoBut)
        listChrtSearch={}
        startInput(message, listChrtSearch)

def startInput(message, listChrtSearch):
    listChrtQuestion={
        "Название":{
            "Вопрос": ["Введите название книги"],
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Автор": {
            "Вопрос": ["Введите имя автора (полностью ФИО)"],
            "Список в БД": True, 
            "Вывод списка из БД": False,              
            "Множество": True,
            "Ручной ввод": True},
        "Жанр": {
            "Вопрос": ["Введите жанр"],
            "Список в БД": True, 
            "Вывод списка из БД": False,              
            "Множество": True,
            "Ручной ввод": True},
        "Категория": {
            "Вопрос": ["Введите категорию"],
            "Список в БД": True, 
            "Вывод списка из БД": False,              
            "Множество": True,
            "Ручной ввод": True},
        "Издательство": {
            "Вопрос": ["Введите издательство"],
            "Список в БД": True, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Год издания": {
            "Вопрос": ["Введите год издания"],
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Город": {
            "Вопрос": ["Введите город"],
            "Список в БД": True, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Количество страниц": {
            "Вопрос": ["Введите количество страниц"],
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        # "Переплет": {
        #     "Вопрос": ["Выберите переплет"],
        #     "Список в БД": True, 
        #     "Вывод списка из БД": True,              
        #     "Множество": False,
        #     "Ручной ввод": False},
        "Цена": {
            "Вопрос": ["Введите цену"],
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "OZON": {
            "Вопрос": ["Введите ссылку на данный товар на OZON"], 
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Вконтакте": {
            "Вопрос": ["Введите ссылку на данный товар на Вконтакте"], 
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Instagram": {
            "Вопрос": ["Введите ссылку на данный товар на Instagram"],
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        # "Состояние": {
        #     "Вопрос": ["Выберите состояние книги"], 
        #     "Список в БД": True, 
        #     "Вывод списка из БД": True,              
        #     "Множество": False,
        #     "Ручной ввод":  False}, 
        "ISBN": {
            "Вопрос": ["Введите ISBN"], 
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Тираж": {
            "Вопрос": ["Введите тираж книги"], 
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Вес":  {
            "Вопрос": ["Введите вес книги в граммах"],
            "Список в БД": False, 
            "Вывод списка из БД": False,             
            "Множество": False, 
            "Ручной ввод": True},
        "Размер": {
            "Вопрос": ["Введите параметры книги через пробел (длина, ширина и высота)"], 
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},        
        "Местоположение": {
            "Вопрос": ["Выберите местоположение книги"],
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},

        "Возрастное ограничение": {
            "Вопрос": ["Выберите возростное ограничение"],
            "Список в БД": True, 
            "Вывод списка из БД": True,              
            "Множество": False,
            "Ручной ввод": False},

        "Особенности": {
            "Вопрос": ["Введите особенности книги"],
            "Список в БД": False, 
            "Вывод списка из БД": False,             
            "Множество": False, 
            "Ручной ввод": True},
        "Примечяания": {
            "Вопрос": ["Введите примечания"],
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Дата поступления": {
            "Вопрос": ["Введите дату поступления"], 
            "Список в БД": False, 
            "Вывод списка из БД": False,              
            "Множество": False,
            "Ручной ввод": True},
        "Фото":  {
            "Вопрос":["Отправьте фото"],
            "Список в БД": False, 
            "Вывод списка из БД": False,             
            "Множество": True,
            "Ручной ввод": True}
    }
    arrChrt = list(listChrtQuestion.keys())
    listChrtBD={}
    for i in arrChrt:
        listChrtBD[i] = []
    ChoosingChrt(message, listChrtBD, listChrtSearch, listChrtQuestion, False, arrChrt)


@bot.message_handler(content_types=['text'])
def setBookForSearch(message,type):

    if message.content_type=='text':
        text=message.text    
    bot.send_message(message.chat.id, "Дайте мне пару секунд на поиск")
    # NewBookСhoice
    listChrtSearch=AllSearch(text, type)
    if listChrtSearch!=False:
        # bot.send_message(message.chat.id, f"здесь {NewBookСhoice['Название'][0]}")
        bot.send_message(message.chat.id, "Найдена некоторая информация")
    else:
        bot.send_message(message.chat.id, "Ничего нет не найдено")
        # listChrtSearch={}
    # listChrtBD={}
    # for key, value in chr.listChrtBD():
    #     chr[key]=[]
    # bot.send_message(message.chat.id, listChrtQuestion["Название"]["Вопрос"])
    
    startInput(message, listChrtSearch)

# @bot.callback_query_handler(func=lambda call: call.data)
def CheckChrt( message, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt):
    flgcheck = True

    if listChrtQuestion[arrChrt[StepChrt]]["Список в БД"] == True and listChrtQuestion[arrChrt[StepChrt]]["Ручной ввод"] == False:
        print ('Проверка на соответвие сообщения и списка бд и типу (размер и вес должны быть числами)')
    if (flgcheck):
        SaveInList(message.text, listChrtBD, arrChrt[StepChrt])
        if listChrtQuestion[arrChrt[StepChrt]]["Множество"]:
            butQ=types.ReplyKeyboardMarkup()
            butQ.add(types.KeyboardButton('Следующая характеристика'),types.KeyboardButton('Добавить'))
            bot.send_message(message.chat.id, "Добавить еще один значение?", reply_markup=butQ)
            bot.register_next_step_handler(message, CheckNextChrt, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt)
        else:
        #     bot.send_message(message.chat.id, listChrtQuestion[arrChrt[StepChrt]]["Вопрос"], reply_markup=butChrt)
            StepChrt=StepChrt+1
            # bot.register_next_step_handler(message, ChoosingChrt, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt)
            ChoosingChrt(message, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt)
        
    else:
        NoBut = telebot.types.ReplyKeyboardRemove()
        bot.send_message(message.chat.id, "Некорректный ввод. ", reply_markup=NoBut)
        bot.register_next_step_handler(message, ChoosingChrt, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt)


def CheckNextChrt(message, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt):
    choice=message.text
    if choice=='Следующая характеристика':
        StepChrt=StepChrt+1
    ChoosingChrt(message, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt)

def SaveInList(text, listChrtBD, Chrt):
    listChrtBD[Chrt].append(text)
    print ('Сохранено в словарь')

def SaveInBD(message, listChrtBD):
    NoBut = telebot.types.ReplyKeyboardRemove()
    if message.text == 'Сохранить':
        bot.send_message(message.chat.id, 'Сохранено в бд', reply_markup=NoBut)
        basicFun(message)
    elif message.text == 'Редактировать':
        bot.send_message(message.chat.id, 'Пока в разработке :(. Давайте начнём всё сначала', reply_markup=NoBut) 
        basicFun(message)
    if message.text == 'Отмена':
        bot.send_message(message.chat.id, 'Ничего не сохранено', reply_markup=NoBut)
        basicFun(message)


def ChoosingChrt(message, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt):

    # Chrt=message
    if (StepChrt == False):
            StepChrt=0
    if StepChrt==len(arrChrt):
        textChrt=''
        for key in listChrtBD:
            textChrt=textChrt+key+": "+listChrtBD[key][0]+"\n"
        NoBut = telebot.types.ReplyKeyboardRemove()
        bot.send_message(message.chat.id, textChrt, reply_markup=NoBut)
        butChoise = types.ReplyKeyboardMarkup(row_width=3)
        butChoise.add(types.KeyboardButton('Сохранить'), types.KeyboardButton('Редактировать'),types.InlineKeyboardButton('Отмена'))
        bot.send_message(message.chat.id, "Сохранить данные в бд?", reply_markup=butChoise)
        bot.register_next_step_handler(message, SaveInBD, listChrtBD)
    else:
        flgNone=True
        butChrt = types.ReplyKeyboardMarkup()
        if listChrtSearch!=False:
            if  arrChrt[StepChrt] in listChrtSearch:
                for i in listChrtSearch[arrChrt[StepChrt]]:
                    if(not isinstance(i, list)):
                        butChrt.add(types.KeyboardButton(i))
                    else:
                        txt=''
                        for j in i:
                            txt=txt+j+" "
                        butChrt.add(types.KeyboardButton(txt))
                    flgNone=False    
                    

        if  listChrtQuestion[arrChrt[StepChrt]]["Список в БД"] == True:
            print('из бд и добавил в кнопочки')

            # flgNone=False
        
        if flgNone:
            NoBut = telebot.types.ReplyKeyboardRemove()
            bot.send_message(message.chat.id, listChrtQuestion[arrChrt[StepChrt]]["Вопрос"],reply_markup=NoBut)
        else:
            bot.send_message(message.chat.id, listChrtQuestion[arrChrt[StepChrt]]["Вопрос"],reply_markup=butChrt)

        bot.register_next_step_handler(message, CheckChrt, listChrtBD, listChrtSearch, listChrtQuestion, StepChrt, arrChrt)

bot.polling(none_stop=True, interval=0)