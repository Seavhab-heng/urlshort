function switchLanguage(lang) {
  document.querySelectorAll('.en, .th').forEach(el => el.style.display = 'none');
  document.querySelectorAll(`.${lang}`).forEach(el => el.style.display = 'block');
  document.getElementById('title').textContent = lang === 'en' ? 'Your Name' : 'ชื่อของคุณ';
  document.getElementById('subtitle').innerHTML = `Connect with me in <span onclick="switchLanguage('en')">English</span> | <span onclick="switchLanguage('th')">ไทย</span>`;
}
QRCode.toCanvas(document.getElementById('qrcode'), 'https://yourdomain.vercel.app', { width: 150 }, (err) => {
  if (err) console.error(err);
});
