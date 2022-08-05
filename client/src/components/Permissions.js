// import { useState } from 'react';
import {
	Box,
	Grid,
	VStack,
	StackDivider,
	useToast,
	TableContainer,
	Table,
	Tr,
	Th,
	Td,
	Tbody,
	Thead,
	Switch,
	Heading,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CheckIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { Link } from 'react-router-dom'

const onSuccess = response => console.log(response)
const onFailure = response => console.error(response)

const SocialLogIn = props => {
	const toast = useToast()

	return (
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<ColorModeSwitcher justifySelf="flex-end" />
				<VStack spacing={2} align="center" divider={<StackDivider borderColor="gray.200" />}>
					<Heading> Highfi ID linked to </Heading>
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Organization</Th>
									<Th>Status</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>Aave</Td>
									<Td>
										<Switch size="lg" colorScheme="teal" isChecked />
									</Td>
								</Tr>
								<Tr>
									<Td>Uniswap</Td>
									<Td>
										<Switch size="lg" colorScheme="teal" />
									</Td>
								</Tr>
								<Tr>
									<Td>Devfolio</Td>
									<Td>
										<Switch size="lg" colorScheme="teal" />
									</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</VStack>
			</Grid>
		</Box>
	)
}

export default SocialLogIn
