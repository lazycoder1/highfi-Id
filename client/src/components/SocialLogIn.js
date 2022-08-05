import { useContext, useEffect, useState } from 'react'
import { Box, Button, Grid, HStack, StackDivider, Text, useToast, VStack } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { Link } from 'react-router-dom'
import WagmiContext from '../contexts/wagmi/wagmiContext'

const onSuccess = response => console.log(response)
const onFailure = response => console.error(response)

const SocialLogIn = props => {
	const toast = useToast()
	const { address, user } = useContext(WagmiContext)

	const [twitterHandler, setTwitterHandler] = useState(undefined)
	const [discordHandler, setDiscordHandler] = useState(undefined)
	const [googleHandler, setGoogleHandler] = useState(undefined)

	const confirmedTwitter = twitterHandler !== undefined
	const confirmedDiscord = discordHandler !== undefined
	const confirmedGoogle = googleHandler !== undefined

	const handleTwitterConnect = () => {
		externalAuth({ title: 'Twitter OAuth', url: `/auth/twitter`, cb: confirmedTwitter })
	}
	const handleDiscordConnect = () => {
		externalAuth({ title: 'Discord OAuth', url: `/auth/discord`, cb: setDiscordHandler })
	}
	const handleGoogleConnect = () => {
		setGoogleHandler('login')
	}

	useEffect(() => {
		user?.socials?.forEach(s => {
			s.social_media === 'google' && setGoogleHandler(s.identifier)
			s.social_media === 'discord' && setDiscordHandler(s.identifier)
			s.social_media === 'twitter' && setTwitterHandler(s.identifier)
		})
	}, [user])

	const externalAuth = ({ title, url, cb }) => {
		const width = 500
		const height = 400
		const left = window.screenX + (window.outerWidth - width) / 2
		const top = window.screenY + (window.outerHeight - height) / 2.5
		const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`)
		window.addEventListener('message', e => {
			if (e?.data?.type === 'oauth_success') {
				console.log(e?.data?.user)
				cb(e?.data?.user)
				popup?.close()
			}
		})
		// popup.onComplete = data => {
		// 	console.log(data?.profile?.id)
		// 	cb(data?.profile?.id)
		// }
	}

	const minAddress = address.substr(0, 7) + '...' + address.substr(-7)

	return (
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<HStack justifySelf="flex-end">
					<Text>{minAddress}</Text>
					<ColorModeSwitcher />
				</HStack>
				<VStack spacing={8} align="center" divider={<StackDivider borderColor="gray.200" />}>
					<Text> Connect your social identity </Text>
					<VStack>
						<Text>1. Twitter</Text>
						{confirmedTwitter ? (
							<HStack>
								<Text size="md">{twitterHandler}</Text>
								<CheckIcon color="green.500" />
							</HStack>
						) : (
							<HStack>
								<Text>Not connected</Text>
								<Button colorScheme="teal" variant="outline" onClick={handleTwitterConnect}>
									Connect
								</Button>
							</HStack>
						)}
					</VStack>
					<VStack>
						<Text>2. Discord</Text>
						{confirmedDiscord ? (
							<HStack>
								<Text size="md">{discordHandler}</Text>
								<CheckIcon color="green.500" />
							</HStack>
						) : (
							<HStack>
								<Text>Not connected</Text>
								<Button colorScheme="teal" variant="outline" onClick={handleDiscordConnect}>
									Connect
								</Button>
							</HStack>
						)}
					</VStack>
					<VStack>
						<Text>3. Google</Text>
						{confirmedGoogle ? (
							<HStack>
								<Text size="md">{googleHandler}</Text>
								<CheckIcon color="green.500" />
							</HStack>
						) : (
							<HStack>
								<Text size="md">Not connected</Text>
								<Button colorScheme="teal" variant="outline" onClick={handleGoogleConnect}>
									Connect
								</Button>
							</HStack>
						)}
					</VStack>
					<Link to="/permissions">
						<Button colorScheme="teal">Create Highfi ID</Button>
					</Link>
				</VStack>
			</Grid>
		</Box>
	)
}

export default SocialLogIn
