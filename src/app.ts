import {create, Whatsapp, Message} from "venom-bot"
import { initWhatsappBot } from "./whatsapp-manager"

create({
  session: "whatsapp-shop"
}).then(initWhatsappBot).catch(console.log)
