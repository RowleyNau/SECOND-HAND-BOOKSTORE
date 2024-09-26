$('#upload').on('click', function() {
    var file_data = $('#file_id').prop('files')[0];  //Берем  Файл
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    alert(form_data);  //Выводим инфо по файлам которые будут отправлены на сервер              
    $.ajax({
      url: 'ajax/save-photo.php', 
      dataType: 'text', 
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,                         
      type: 'post',
      success: function(php_script_response){
        alert(php_script_response); //  Выводим ответ от сервера
      }
    });
  });