// import { useState } from 'react';
import { Box, Grid, VStack, HStack, Heading, Text, Button, StackDivider, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react';

const Organization = props => {
    const [quests, setQuests] = useState([
        {name:"follow us on twitter", reward: '+50 xp', status: false},
        {name:"retweet - ", reward: '+75 xp', status: false}
    ])

    const handleStateChange = (idx) => {
        const newQuestsObj = [...quests]
        newQuestsObj[idx].status = true;
        setQuests(newQuestsObj);
    }

	return (
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<VStack spacing={8} align="center" divider={<StackDivider borderColor="gray.200" />}>
					<Heading>Devfolio Quests</Heading>
					<TableContainer>
						<Table size="sm">
							<Thead>
								<Tr>
									<Th>Quest</Th>
									<Th>Reward</Th>
									<Th>Status</Th>
								</Tr>
							</Thead>
							<Tbody>
                            {quests.map((quest, index) => (
                                <Tr>
                                <Td>{quest.name}</Td>
                                <Td>{quest.reward}</Td>
                                <Td >{quest.status ? <CheckIcon color="green.500" /> : <Button onClick={() => handleStateChange(index)}>Confirm</Button>}</Td>
                            </Tr>
                            ))}
							</Tbody>
							<Tfoot>
								<Tr>
									<Th>To convert</Th>
									<Th>into</Th>
									<Th isNumeric>multiply by</Th>
								</Tr>
							</Tfoot>
						</Table>
					</TableContainer>
					
				</VStack>
			</Grid>
		</Box>
	)
}

export default Organization
