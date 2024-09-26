import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';
import io from 'socket.io-client';
import style from './ClientChat.css';
import {BiSolidCameraPlus } from "react-icons/bi";
import {IoClose } from "react-icons/io5";
import CloseButton from '../allButtons/closeButton/CloseButton';
import { getAllMessages, sendMessage, createChatIfNotExists } from '../../http/chatApi';
// const socket = io('http://localhost:5000');

const ClientChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(null);

    useEffect(() => {
      const initializeChat = async () => {
          // try {
          //     const chat = await createChatIfNotExists(); 
          //     console.log(chat)// Предполагается, что createChatIfNotExists возвращает объект чата с полем id
          //     setChatId(chat.id); // Установка chatId из объекта чата
          //     const initialMessages = await getAllMessages(chat.id);
          //     setMessages(initialMessages);

          //     socket.emit('joinChat', chat.id);

          //     socket.on('receiveMessage', (message) => {
          //         setMessages((prevMessages) => [...prevMessages, message]);
          //     }
          //   );
          // } catch (error) {
          //     console.error('Error initializing chat:', error);
          // }
      };

      initializeChat();

      return () => {
          // socket.off('receiveMessage');
      };
  }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
      // if (newMessage.trim()) {
      //     try {
      //         await sendMessage(chatId, newMessage); // Отправка сообщения с указанным chatId
      //         setNewMessage('');
      //     } catch (error) {
      //         console.error('Error sending message:', error);
      //     }
      // }
  };

    return (
        <>
            <div className="ChatIcon" onClick={handleToggle}>
                <FaComments size={24} />
            </div>
            <div className={isOpen ? 'ChatContainer' : 'ChatContainerFalse'}>
                <div className="ChatHeader">
                    <span>чат BookBox</span>
                    <button onClick={handleToggle}><CloseButton/></button>
                </div>
                <div className="ChatMessages">
                    {messages.map((msg, index) => (
                        <div key={index}>{msg.text}</div>
                    ))}
                </div>
                <div className="ChatInputContainer">
                    <input
                        type="text"
                        className="ChatInput"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Введите сообщение..."
                    />
                    <button className="SendButton" onClick={handleSendMessage}>
                        отправить
                    </button>
                </div>
            </div>
        </>
    );
};

export default ClientChat;