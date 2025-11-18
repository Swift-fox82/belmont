# 🛡 Belmont — Advanced Anti‑Raid Discord Bot

![Node.js](https://img.shields.io/badge/Node.js-14+-green?logo=node.js)
![Discord.js](https://img.shields.io/badge/Discord.js-latest-blue?logo=discord)
![License](https://img.shields.io/badge/License-Open--Source-lightgrey)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 🎯 Introduction

Belmont is a highly efficient and customizable **Discord anti‑raid bot** built using **Node.js** and **Discord.js**. It protects your server against malicious activities such as mass role/channels deletion, unauthorized bans, and more. Designed with security in mind, Belmont offers fully customizable limits, real‑time logging, slash command support, and whitelist features.

---

## 🚀 Key Features

| Feature | Description |
|--------|-------------|
| 🔒 Anti‑Raid System | Detects and reacts to harmful actions automatically. |
| ⚙️ Custom Action Limits | Define how many actions are allowed before intervention. |
| 🧑‍💻 Whitelist Management | Exempt trusted users from restriction system. |
| 📡 Activity Logging | Sends suspicious action reports to a specific channel. |
| 💬 Slash Commands | Modern Discord interaction using `/commands`. |
| 🔌 Lightweight Setup | Easy to install and configure. |

---

## 🧩 Requirements

- **Node.js v14+**
- **Discord.js**
- **quick.db**

---

## 📦 Installation

```bash
git clone https://github.com/Swift-fox82/belmont.git
cd belmont
npm install
```

---

## ⚙️ Configuration (`config.json`)

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "clientID": "YOUR_APPLICATION_CLIENT_ID",
  "guildID": "YOUR_GUILD_ID",
  "dev": {
    "hyron": "YOUR_DEVELOPER_ID"
  }
}
```

---

## 🔌 Deploy Commands

```bash
node deploy.js
```

---

## 🟢 Start the Bot

```bash
node index.js
```

---

## 📙 Available Slash Commands

| Command | Description |
|---------|-------------|
| `/log` | Set logging channel |
| `/anti` | Enable/disable anti‑raid system |
| `/limit` | Set action threshold |
| `/whitelist` | Add a user to whitelist |
| `/unwhitelist` | Remove a user from whitelist |

---

## 🔎 Event Monitoring

- `GuildRoleCreate`, `GuildRoleDelete`
- `ChannelCreate`, `ChannelDelete`

Once the defined limit is crossed, Belmont automatically initiates protective actions.

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature-name
```

---

## 🌍 Multilingual Support

You can add a two‑language setup like:

```md
## 🌐 English | 🇮🇷 فارسی
[Click here for English](#english-version)
[برای مشاهده فارسی کلیک کنید](#نسخه-فارسی)
```

---

## 🛡 Belmont Philosophy

> “Your server’s first line of defense — fast, lightweight, and reliable.”

---

## 📜 License

Open‑source — feel free to use and improve.

---

## ⭐ Support

If you find this project helpful, please ⭐ star the repository.

---

## 📞 Contact

For support, open an **Issue** or contact the developer.

---

**Made with ❤️ by Swift-fox82**
