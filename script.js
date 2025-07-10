// Sample user data for bio pages
const users = {
  alice: {
    name: "Alice Smith",
    bio: { en: "Digital creator and artist", th: "นักสร้างสรรค์ดิจิทัลและศิลปิน" },
    links: [
      { img: "/assets/project1.jpg", head: "My Art Portfolio", desc: "View my latest artwork", url: "https://aliceportfolio.com" },
      { img: "/assets/shop.jpg", head: "Shop Prints", desc: "Buy my exclusive prints", url: "https://shop.alice.com" }
    ],
    socials: { instagram: "alice_art", twitter: "alice_smith", youtube: "@aliceart", tiktok: "@alicecreates" }
  },
  bob: {
    name: "Bob Johnson",
    bio: { en: "Tech enthusiast and blogger", th: "ผู้หลงไลเทคโนโลยีและบล็อกเกอร์" },
    links: [
      { img: "/assets/blog.jpg", head: "Tech Blog", desc: "Read my tech reviews", url: "https://bobtech.com" },
      { img: "/assets/course.jpg", head: "Coding Course", desc: "Learn to code with me", url: "https://bobcourse.com" }
    ],
    socials: { instagram: "bob_tech", twitter: "bob_johnson", youtube: "@bobtech", tiktok: "@bobtechie" }
  },
  clara: {
    name: "Clara Lee",
    bio: { en: "Food vlogger and chef", th: "วล็อกเกอร์อาหารและเชฟ" },
    links: [
      { img: "/assets/recipes.jpg", head: "Recipes", desc: "Try my delicious recipes", url: "https://claracooks.com" },
      { img: "/assets/vlog.jpg", head: "Food Vlogs", desc: "Watch my cooking videos", url: "https://youtube.com/@claracooks" }
    ],
    socials: { instagram: "clara_cooks", twitter: "clara_lee", youtube: "@claracooks", tiktok: "@clarachef" }
  },
  david: {
    name: "David Chen",
    bio: { en: "Fitness coach and motivator", th: "โค้ชฟิตเนสและนักจูงใจ" },
    links: [
      { img: "/assets/workout.jpg", head: "Workout Plans", desc: "Join my fitness program", url: "https://davidfit.com" },
      { img: "/assets/podcast.jpg", head: "Fitness Podcast", desc: "Listen to my tips", url: "https://davidpodcast.com" }
    ],
    socials: { instagram: "david_fit", twitter: "david_chen", youtube: "@davidfit", tiktok: "@davidcoach" }
  },
  emma: {
    name: "Emma Wong",
    bio: { en: "Travel blogger and photographer", th: "บล็อกเกอร์ท่องเที่ยวและช่างภาพ" },
    links: [
      { img: "/assets/travel.jpg", head: "Travel Blog", desc: "Explore my adventures", url: "https://emmatravels.com" },
      { img: "/assets/photos.jpg", head: "Photo Gallery", desc: "See my travel photos", url: "https://emmaphotos.com" }
    ],
    socials: { instagram: "emma_travels", twitter: "emma_wong", youtube: "@emmatravels", tiktok: "@emmatraveler" }
  }
};

// Language toggle
function switchLanguage(lang) {
  document.querySelectorAll('.en, .th').forEach(el => el.style.display = 'none');
  document.querySelectorAll(`.${lang}`).forEach(el => el.style.display = 'block');
}

// Generate random short code
function generateShortCode() {
  return Math.random().toString(36).substr(2, 6); // e.g., Dgkh56
}

// Handle URL shortening and QR code generation
async function generateShortLink() {
  const longUrl = document.getElementById('long-url').value;
  if (!longUrl) return alert('Please enter a valid URL');

  const shortCode = generateShortCode();
  const shortUrl = `https://shortlnk.in.th/${shortCode}`;
  const qrUrl = `https://shortlnk.in.th/qr/${shortCode}`;

  // Simulate saving to backend (links.json)
  const response = await fetch('/api/save-link', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shortCode, longUrl })
  });
  if (!response.ok) return alert('Error saving link');

  // Update UI
  const shortLink = document.getElementById('short-url');
  shortLink.href = shortUrl;
  shortLink.textContent = shortUrl;
  const qrLink = document.getElementById('qr-url');
  qrLink.href = qrUrl;
  qrLink.textContent = qrUrl;
  document.getElementById('result').style.display = 'block';

  // Generate QR code
  QRCode.toCanvas(document.getElementById('qrcode'), shortUrl, { width: 150 }, (err) => {
    if (err) console.error(err);
  });
}

// Handle bio page rendering
if (window.location.pathname.startsWith('/bio/')) {
  const username = window.location.pathname.split('/bio/')[1];
  const user = users[username] || users.alice;

  document.getElementById('username').textContent = user.name;
  document.getElementById('bio-text').textContent = user.bio.en;
  document.getElementById('bio-text-th').textContent = user.bio.th;
  document.getElementById('profile-pic').src = `/assets/profile-${username}.jpg`;
  document.querySelectorAll('#socials a').forEach(link => {
    const platform = link.href.split('/go/')[1];
    link.href = `/go/${platform}?username=${user.socials[platform]}`;
  });

  const linksSection = document.getElementById('links');
  user.links.forEach(link => {
    const btn = document.createElement('a');
    btn.className = 'link-btn';
    btn.href = link.url;
    btn.innerHTML = `<img src="${link.img}" alt="${link.head}" width="50"><div><h3>${link.head}</h3><p>${link.desc}</p></div>`;
    linksSection.appendChild(btn);
  });

  // Update SEO meta tags
  document.querySelector('meta[name="description"]').content = `Link-in-bio page for ${user.name} in English and Thai`;
  document.querySelector('meta[name="keywords"]').content = `link in bio, social media, ${user.name}, English, Thai`;
  document.querySelector('meta[property="og:title"]').content = `${user.name} - Link in Bio`;
  document.querySelector('meta[property="og:description"]').content = user.bio.en;
  document.querySelector('meta[property="og:image"]').content = `https://thail.ink/assets/profile-${username}.jpg`;
  document.querySelector('meta[property="og:url"]').content = `https://thail.ink/bio/${username}`;
  document.title = `${user.name} - Link in Bio`;
}
