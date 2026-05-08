const waNumber = "6281515521739";
const price = 15000;
let cart = [];
let userEmail = "";

// 1. Daftar Nama Bunga Estetik untuk variasi
const flowerNames = [
    "Tulip Purple Cloud", "Rose Soft Cotton", "Lavender Misty", "Sunlight Bloom", 
    "White Edelweiss", "Jasmine Pearl", "Peach Peony", "Blue Hydrangea", 
    "Pink Sakura", "Daisy Dream", "Lily of the Valley", "Orchid Lilac",
    "Baby Breath White", "Carnation Soft Pink", "Gardenia Cream", "Iris Cold Blue",
    "Magnolia Petal", "Dahlia Peach", "Tulip Pink Candy", "Mawar Senja",
    "Lavender Field", "Sunflower Mini", "White Rose Bouquet", "Violet Dream",
    "Aster Pastel", "Camelia Soft", "Lotus Serenity", "Tulip White Snow",
    "Cherry Blossom", "Peony Royal Lilac"
];

// 2. Generate 30 Produk dengan ekstensi .jpg
const products = [];
for (let i = 1; i <= 30; i++) {
    products.push({
        id: i,
        name: flowerNames[i-1], // Mengambil nama dari daftar di atas
        img: `img/bunga${i}.jpg`, // Menghubungkan ke file jpg: bunga1.jpg, bunga2.jpg, dst.
        price: price
    });
}

// 3. Fungsi Navigasi Halaman
function showPage(pageId) {
    if (!userEmail) return;
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    window.scrollTo(0, 0);
}

// 4. Fungsi Login (Wajib Gmail)
document.getElementById('login-btn').addEventListener('click', () => {
    const email = prompt("Masukkan email Gmail Anda:");
    if (email && email.includes("@gmail.com")) {
        userEmail = email;
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('navbar').classList.remove('hidden');
        showPage('home');
    } else {
        alert("Mohon gunakan akun Gmail untuk masuk ✨");
    }
});

// 5. Render Katalog ke dalam Grid
function renderKatalog() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ""; // Bersihkan grid sebelum render
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "product-card shadow-sm";
        card.innerHTML = `
            <div class="img-box">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x500/f3f0ff/9d81d1?text=Foto+Bunga'">
            </div>
            <h3 class="text-xl font-bold text-purple-900 mb-1">${p.name}</h3>
            <p class="text-purple-400 font-bold mb-4 font-fancy text-2xl">Rp 15.000</p>
            <button onclick="addToCart('${p.name}')" class="btn-primary w-full py-3 rounded-full text-sm font-bold uppercase tracking-tighter">
                Tambah ke Keranjang 🧺
            </button>
        `;
        grid.appendChild(card);
    });
}

// 6. Logika Keranjang
function addToCart(name) {
    cart.push(name);
    const cartEl = document.getElementById('floating-cart');
    cartEl.classList.remove('translate-x-[150%]');
    document.getElementById('cart-count').innerText = `${cart.length} Bunga terpilih`;
}

// 7. Checkout WhatsApp
document.getElementById('checkout-btn').addEventListener('click', () => {
    const total = cart.length * price;
    const list = cart.map((item, i) => `${i + 1}. ${item}`).join('%0A');
    const msg = `Halo Hishshah Flowers! 🌷%0A%0A` +
                `Saya ingin memesan bucket bunga:%0A${list}%0A%0A` +
                `*Total Harga:* Rp ${total.toLocaleString('id-ID')}%0A` +
                `*Email Pembeli:* ${userEmail}%0A%0A` +
                `Tolong disiapkan yang paling cantik ya! ✨`;
    
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
});

// 8. Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload();
});

// Jalankan fungsi render
renderKatalog();
