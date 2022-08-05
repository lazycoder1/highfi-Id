require('./utils/validate.env')

const express = require('express') //Line 1
const app = express() //Line 2
const port = process.env.PORT || 3000 //Line 3
const path = require('path')
const wagmiRouter = require('./routes/wagmi-authen-route')
const pasportRouter = require('./routes/passport-route')
const { authentication } = require('./middleware/auth.middleware')
const { errorMiddleware } = require('./middleware/error.middleware')
const session = require('express-session')

const compression = require('compression')
const cookieParser = require('cookie-parser')
const http = require('http')
const ethers = require('ethers')
const passport = require('passport')
const proxy = require('express-http-proxy')
const { renderFile } = require('ejs')
const DB = require('./database')
const { logger, stream } = require('./utils/logger')

const { NODE_ENV, PORT } = process.env
const env = NODE_ENV || 'development'

const corsWhitelist = ['http://localhost:3000']

const listen = () => {
	http.createServer(app).listen(port, () => {
		logger.info(`=================================`)
		logger.info(`======= ENV: ${env} =======`)
		logger.info(`🚀 App listening on the port ${port} `)
		logger.info(`=================================`)
	})
}

const connectToDatabase = () => {
	DB.sequelize.sync({ force: false })
}

const initializeMiddlewares = () => {
	const pj = require('./package.json')

	app.use((req, res, next) => {
		const origin = req.headers.origin
		if (corsWhitelist.indexOf(origin) > -1) {
			res.setHeader('Access-Control-Allow-Origin', origin)
		}
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept')
		res.setHeader('Access-Control-Allow-Credentials', 'true')
		pj?.version && res.setHeader('APP_VERSION', pj.version || '')
		next()
	})

	if (process.env.NODE_ENV === 'production') {
		app.set('trust proxy', 1) // trust first proxy
	}
	app.set('view engine', 'ejs')
	app.set('views', path.join(__dirname, 'views'))
	app.engine('html', renderFile)

	app.use(cookieParser())
	app.use(
		session({
			secret: process.env.APP_KEY || 'secret_keeeey',
			resave: false,
			saveUninitialized: true,
			cookie: { secure: false },
		})
	)
	app.use(compression())
	app.use(express.json({ limit: '50mb' }))
	// app.use(express.urlencoded({ limit: '50mb', extended: true }))
}

const initializePassport = () => {
	app.use(passport.initialize())
	app.use(passport.session())

	const DiscordStrategy = require('passport-discord')

	passport.use(
		new DiscordStrategy(
			{
				clientID: process.env.DISCORD_CLIENT_ID,
				clientSecret: process.env.DISCORD_CLIENT_SECRET,
				callbackURL: process.env.DISCORD_CALLBACK_URI,
				scope: ['identify', 'email', 'guilds', 'guilds.join'],
				passReqToCallback: true,
			},
			async function (req, accessToken, refreshToken, profile, cb) {
				const user = req.session?.user
				if (user) {
					let social = await DB.Social.findOne({ where: { user_id: user.id, social_media: 'discord' } })
					if (!social) {
						social = await DB.Social.create({ user_id: user.id, social_media: 'discord', identifier: profile.email, accessToken, refreshToken })
					} else {
						await DB.Social.update(
							{ identifier: profile.email, access_token: accessToken, refresh_token: refreshToken },
							{ where: { user_id: user.id, social_media: 'discord' } }
						)
						social.access_token = accessToken
						social.refresh_token = refreshToken
						social.identifier = profile.email
					}
					cb(null, social)
				} else {
					cb('Error')
				}
			}
		)
	)

	const TwitterStrategy = require('passport-twitter-oauth2.0')
	passport.use(
		new TwitterStrategy(
			{
				clientID: process.env.TWITTER_CONSUMER_KEY,
				clientSecret: process.env.TWITTER_CONSUMER_SECRET,
				callbackURL: 'http://localhost:3000/auth/twitter/callback',
				clientType: 'private', // "public" or "private"
				pkce: true, // required,
				state: true, // required
				passReqToCallback: true,
			},
			async function (req, accessToken, refreshToken, profile, cb) {
				const user = req.session?.user
				if (user) {
					let social = await DB.Social.findOne({ where: { user_id: user.id, social_media: 'twitter' } })
					if (!social) {
						social = await DB.Social.create({ user_id: user.id, social_media: 'twitter', identifier: profile.username, accessToken, refreshToken })
					} else {
						await DB.Social.update(
							{ identifier: profile.username, access_token: accessToken, refresh_token: refreshToken },
							{ where: { user_id: user.id, social_media: 'twitter' } }
						)
						social.access_token = accessToken
						social.refresh_token = refreshToken
						social.identifier = profile.username
					}
					cb(null, social)
				} else {
					cb('Error')
				}
			}
		)
	)

	passport.serializeUser(function (social, done) {
		done(null, social)
	})

	passport.deserializeUser(function (social, done) {
		done(null, social)
	})
}

const initializeRoutes = () => {
	// pasport oauth APIs
	app.use('/auth', pasportRouter)
	// Wagmi authentication APIs
	app.use('/wagmi', wagmiRouter)

	// app.use('/', proxy('http://localhost:3010'))

	app.use(express.static(path.join(__dirname, './client/build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
	})
}

const initializeErrorHandling = () => {
	app.use(errorMiddleware)
}

connectToDatabase()
initializeMiddlewares()
initializePassport()
initializeRoutes()
initializeErrorHandling()

listen()
