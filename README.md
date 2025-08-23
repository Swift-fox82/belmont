# Belmont

## Introduction

Belmont is a **Discord anti-nuke bot** developed using **Node.js** and **Discord.js**. It is designed to protect your Discord server from malicious actions such as excessive role and channel creation or deletion. The bot monitors key server events and enforces configurable limits by automatically kicking offending users and reverting their actions. Its comprehensive logging and whitelist functionality help server owners control and monitor potentially dangerous activities on their servers.

## Features

- **Anti-Nuke Protection**  
  Belmont monitors events like **role/channel creation and deletion**. When configured limits are breached, it automatically takes action such as kicking the offending member and restoring changes.
  
- **Configurable Limits**  
  The bot offers commands to set limits on how many actions (e.g., role deletions or channel creations) a user can perform within a specified timeframe. Once a user exceeds the limit, punitive actions are enforced.
  
- **Whitelist Management**  
  Server owners can whitelist trusted users using commands so that they are exempt from anti-nuke actions. Commands include **/whitelist** and **/unwhitelist**.
  
- **Logging Functionality**  
  Administrators can designate dedicated channels for logging all the significant events. All anti-nuke actions generate detailed embeds that are posted to the logging channel.
  
- **Easy Command Handling**  
  Belmont leverages a streamlined command and event handling system to ensure that interactions with the bot are efficient and well-organized.

## Requirements

To run Belmont, ensure that you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **Quick.db** – for database support, based on [QuickDB](https://www.npmjs.com/package/quick.db)
- **Discord.js** – for interacting with the Discord API

## Installation

1. **Clone the repository:**  
   Open your terminal and execute:
   code:
   npm install
   ```bash
   git clone https://github.com/Swift-fox82/belmont.git
   cd belmont
   npm install
   ```

2. **Setup Environment:**  
   Create and configure your **config.json** file with your bot token, client ID, guild ID, and developer ID.
   
   Example config.json:
   ```json
   {
     "token": "YOUR_DISCORD_BOT_TOKEN",
     "clientId": "YOUR_CLIENT_ID",
     "guildId": "YOUR_SERVER_ID",
     "Dev": {
       "hyron": "YOUR_DEVELOPER_ID"
     }
   }
   ```

3. **Deploy Commands:**  
   Deploy your slash commands by running the deploy script:
   ```bash
   node deploy.js
   ```

## Usage

1. **Start the bot:**  
   Start your bot by executing:
   ```bash
   node index.js
   ```
   Upon successful login, the bot will display a message such as *"Bot is ready"* in your console.

2. **Commands:**  
   The bot supports several slash commands, including:
   
   - **/log** – Configure the log channel where anti-nuke alerts and event logs will be sent.
   - **/anti** – Enable or disable the anti-nuke system.
   - **/limit** – Set specific action limits for roles or channels (creation and deletion).
   - **/whitelist** – Add a user to the whitelist, exempting them from anti-nuke actions.
   - **/unwhitelist** – Remove a user from the whitelist.

3. **Event Handling:**  
   Belmont actively listens and responds to several server events such as:
   
   - **GuildRoleCreate & GuildRoleDelete:**  
     Detect suspicious role actions and enforce configured limits.
     
   - **ChannelCreate & ChannelDelete:**  
     Monitor channel activities and automatically respond if limits are exceeded.

## Configuration

Belmont uses a simple JSON configuration structure via **config.json**. This file contains all the necessary credentials and IDs required for the bot to run. Key configurable parameters include:

| Parameter          | Description                        |
| ------------------ | ---------------------------------- |
| token              | Your Discord bot token             |
| clientId           | Application (bot) client ID        |
| guildId            | Server (guild) ID                  |
| Dev.hyron          | Developer ID, used for privileged commands |

Additionally, the bot employs a key-value database (Quick.db) to store server-specific settings such as:

- **Log Channel ID** – The channel to receive logs.
- **Action Limits** – Number of allowed actions before triggering anti-nuke measures.
- **Whitelist Status** – Tracks users exempt from anti-nuke protections.
- **Anti-Nuke Toggle** – Enables/disables the anti-nuke system.

## Contributing

Contributions are welcome! To contribute to Belmont:

1. **Fork the repository** and create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
2. **Implement your changes,** ensuring that you adhere to the existing code style and project structure.

3. **Test your changes** locally to verify functionality.

4. **Submit a pull request** detailing your changes and the intended improvements.

Please follow these guidelines to ensure a smooth contribution process. Community involvement and code reviews help keep the project robust and secure.

---

Belmont is built with a focus on security and efficient server management. Its robust anti-nuke mechanisms and flexible command structure make it a reliable addition to any Discord server seeking extra protection against malicious activities. Happy securing!
