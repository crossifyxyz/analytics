import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

function range(start: number, end: number | string) {
  let foo = []
  for (let i = start; i <= Number(end); i++) {
    foo.push(i)
  }
  return foo
}

export default function Pagination({
  perPage,
  total,
  page,
  setPage,
  setPerPage,
}: {
  perPage: number
  total: number
  page: number
  setPage: (page: number) => any
  setPerPage: (page: number) => any
}) {
  const pageRange = range(1, Math.round(total / perPage) || 1)
  return (
    <HStack spacing={2}>
      <Box>
        <Menu>
          <MenuButton size={'sm'} as={Button} rightIcon={<ChevronDownIcon />}>
            {perPage}
          </MenuButton>
          <MenuList minW={'max-content'}>
            <MenuItem onClick={() => setPerPage(50)}>50</MenuItem>
            <MenuItem onClick={() => setPerPage(25)}>25</MenuItem>
            <MenuItem onClick={() => setPerPage(10)}>10</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Button
        size={'sm'}
        isDisabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        -
      </Button>
      {pageRange.map((i) => (
        <Button
          key={i}
          size={'sm'}
          colorScheme={page === i ? 'blue' : 'gray'}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>
      ))}
      <Button
        isDisabled={pageRange.length <= 1}
        size={'sm'}
        onClick={() => setPage(page + 1)}
      >
        +
      </Button>
    </HStack>
  )
}
