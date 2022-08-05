const { WAConnection, MessageType } = require('@adiwajshing/baileys').default
const makeWASocket = require("@adiwajshing/baileys").default
const { exec, spawn, execSync } = require("child_process")
const pino = require('pino')
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
const st = buffer.toString();
      await sock.sendMessage(sock.user.id, { text: `${st}` });
  if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `SESSION="${st}"`);
        }
  fs.writeFile('./session.json',SESSION , function (err) {
  if (err) return console.log(err);
  console.log('suceed > session poggress');
});
      connection === "close"  ) {
      unauxmd()
    }
  })
  sock.ev.on('creds.update', saveState)
  sock.ev.on('messages.upsert', (message) => { 
        require('./plugin/main.js')(sock, message)
})
}
unauxmd()
