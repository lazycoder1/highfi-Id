// import { useState } from 'react';
import {
  Box,
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  StackDivider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom'

const Callbacks = (props) => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack
          spacing={8}
          align="center"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Text>Confirm your username: @twitter_handler</Text>
          <Link to="/">
          <Button colorScheme="teal" variant="outline">
            Confirm
          </Button>
          </Link>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Callbacks;
