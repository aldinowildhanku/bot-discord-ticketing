# 🎫 Discord Ticket Bot (Advanced)

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![npm](https://img.shields.io/badge/npm-9%2B-red)
![License](https://img.shields.io/badge/license-MIT-blue)

Bot Discord Ticket System modern dengan fitur lengkap seperti:
Modern Discord Ticket System bot with advanced features.

---

## 🇮🇩 Bahasa Indonesia

### 🚀 Fitur

* ✅ Ticket via Button (tanpa prefix)
* ✅ Dropdown kategori (Support, Billing, Bug)
* ✅ Channel private (user + admin)
* ✅ Auto nomor ticket (`ticket-0001`)
* ✅ Claim ticket oleh admin
* ✅ Transcript otomatis (.txt)
* ✅ Kirim transcript ke email (SMTP)
* ✅ Log ke channel admin
* ✅ Anti double ticket
* ✅ Database MySQL (persistent)

---

### 📁 Struktur Project

```bash id="id_struct"
discord-ticket-bot/
├── index.js
├── .env
├── config/
├── commands/
├── handlers/
├── services/
└── utils/
```

---

### 📦 Instalasi

```bash id="id_install"
git clone https://github.com/aldinowildhanku/bot-discord-ticketing.git
cd discord-ticket-bot
npm install
```

---

### ⚙️ Konfigurasi (.env)

```env id="id_env"
# Discord
TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_SERVER_ID

ADMIN_ROLE_ID=ROLE_ADMIN_ID
CATEGORY_ID=CATEGORY_TICKET_ID
LOG_CHANNEL_ID=LOG_CHANNEL_ID

# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=discord_ticket

# SMTP
SMTP_HOST=mail.domain.com
SMTP_PORT=587
SMTP_USER=noreply@domain.com
SMTP_PASS=password
SMTP_FROM="Support Ticket <noreply@domain.com>"
```

---

### 🗄️ Setup Database

```sql id="id_db"
CREATE DATABASE discord_ticket;

USE discord_ticket;

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    channel_id VARCHAR(50),
    ticket_number VARCHAR(10),
    category VARCHAR(50),
    email VARCHAR(100),
    claimed_by VARCHAR(50),
    status ENUM('open','closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### ▶️ Menjalankan Bot

```bash id="id_run"
node index.js
```

---

### 🎮 Cara Penggunaan

#### 1. Buat Panel Ticket (Admin)

```
/ticketpanel
```

#### 2. User

* Pilih kategori
* Klik tombol
* Isi email
* Ticket otomatis dibuat

#### 3. Admin

```
/closeticket nomor:0001
```

---

### 📧 Sistem Email

Saat ticket ditutup:

* Transcript dibuat otomatis
* Dikirim ke email user via SMTP

---

### ⚠️ Troubleshooting

* ❌ Interaction Failed → gunakan `deferReply()`
* ❌ Email timeout → gunakan port 587
* ❌ Channel tidak private → cek permissionOverwrites

---

---

## 🇺🇸 English Version

### 🚀 Features

* ✅ Ticket via Button (no prefix)
* ✅ Category dropdown (Support, Billing, Bug)
* ✅ Private channel (user + admin)
* ✅ Auto ticket numbering (`ticket-0001`)
* ✅ Admin claim system
* ✅ Auto transcript (.txt)
* ✅ Send transcript via email (SMTP)
* ✅ Logging to admin channel
* ✅ Anti double ticket
* ✅ MySQL database (persistent)

---

### 📦 Installation

```bash id="en_install"
git clone https://github.com/aldinowildhanku/bot-discord-ticketing.git
cd discord-ticket-bot
npm install
```

---

### ⚙️ Configuration

```env id="en_env"
TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_SERVER_ID

ADMIN_ROLE_ID=ROLE_ADMIN_ID
CATEGORY_ID=CATEGORY_TICKET_ID
LOG_CHANNEL_ID=LOG_CHANNEL_ID

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=discord_ticket

SMTP_HOST=mail.domain.com
SMTP_PORT=587
SMTP_USER=noreply@domain.com
SMTP_PASS=password
SMTP_FROM="Support Ticket <noreply@domain.com>"
```

---

### ▶️ Run Bot

```bash id="en_run"
node index.js
```

---

### 🎮 Usage

#### 1. Create Ticket Panel (Admin)

```
/ticketpanel
```

#### 2. User Flow

* Select category
* Click button
* Enter email
* Ticket channel created automatically

#### 3. Admin

```
/closeticket nomor:0001
```

---

### 📧 Email System

When ticket is closed:

* Transcript is generated
* Sent to user email via SMTP

---

### ⚠️ Troubleshooting

* ❌ Interaction Failed → use `deferReply()`
* ❌ Email timeout → use port 587
* ❌ Channel not private → check permissions

---

## 🤝 Contributing

Pull requests are welcome 👍

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Developed by Aldino Wildhan 🚀
