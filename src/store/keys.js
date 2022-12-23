console.log(process.env, process.env.VUE_APP_ENV_EXISTS)
if(!process.env.VUE_APP_ENV_EXISTS) {
    throw new Error('Please set .env')
}

const DISCORD_WEBHOOK_LINK = process.env.VUE_APP_DISCORD_WEBHOOK_LINK
const FIREBASE_CONFIG_OBJECT = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG_OBJECT)

export {
    DISCORD_WEBHOOK_LINK,
    FIREBASE_CONFIG_OBJECT
}
