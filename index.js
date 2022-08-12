const { default: unauxmd, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const makeWASocket = require("@adiwajshing/baileys").default
const { exec, spawn, execSync } = require("child_process")
const pino = require('pino')
const  { Boom } = require('@hapi/boom')
const fs = require('fs')
const figlet = require('figlet')
const qrcode = require("qrcode-terminal")
const { delay, useSingleFileAuthState } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./session.json`)
function unauxmd() {
  let sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ["UNAUX-MD", "Opera", "30.0.0"]
  })
 
  sock.ev.on("connection.update", async (s) => {
      console.log("Connecting......")
      console.log(figlet.textSync('UNAUX -MD', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}))
    const { connection} = s
    if (connection == "open") {
      await delay(1000 * 10)
      const session = fs.readFileSync('./session.json')
      await sock.sendMessage(sock.user.id, { document: session, mimetype: 'application/json', fileName: `session.json`}) ;
      process.exit(0)
    }
const buffer = fs.readFileSync("./session.json");
const stenc = buffer.toString('base64');
      await sock.sendMessage(sock.user.id, { text: `${stenc}` });
  if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `SESSION="${stenc}"`);
        }
  fs.writeFile('./session.json',SESSION , function (err) {
  if (err) return console.log(err);
  console.log('suceed > session poggress');
  const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`unaux bot : Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("unaux bot : Connection closed, Reconnecting...."); unauxmd(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("unaux bot : Connection Lost from Server, Reconnecting..."); unauxmd (); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("unaux bot : Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`unaux bot : Device Logged Out, Please Delete Session And Scan Again.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("unaux bot : Restart Required, Restarting..."); unauxmd(); }
            else if (reason === DisconnectReason.timedOut) { console.log("unaux bot : Connection TimedOut, Reconnecting..."); unauxmd(); }
            else { console.log(`unaux bot : Unknown DisconnectReason: ${reason}|${connection}`) }
        }
        console.log('Unauxbot...', update)
    })
});
  sock.ev.on('creds.update', saveState)
  sock.ev.on('messages.upsert', (message) => { 
        require('./plugin/main.js')(sock, message)
})
}
unauxmd()
