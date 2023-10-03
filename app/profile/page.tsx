'use client'

import {
  PUT_USER_NAME,
  PUT_USER_PHONE,
  PUT_USER_SURNAME,
  handleSignout,
  putUserField,
} from '@/lib'
import { setAuth, useAppSelector } from '@/lib/store'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  IconButton,
  Input,
  Stack,
  useEditableControls,
} from '@chakra-ui/react'
import isEmpty from 'is-empty'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Profile() {
  const dispatch = useDispatch()
  const auth = useAppSelector((state) => state.auth)

  const { id, role } = auth
  const [state, setState] = useState({
    email: auth.email,
    name: auth.name,
    surname: auth.surname,
    phone: auth.phone,
  })
  const { email, name, surname, phone } = state

  return (
    <>
      <Button
        ml={'5vw'}
        mr={'auto'}
        colorScheme={'orange'}
        size={'xs'}
        w={'max-content'}
        onClick={() => {
          handleSignout(dispatch)
        }}
      >
        Logout
      </Button>
      <Stack justify={'start'}>
        <Stack>
          <Text fontSize={'xs'}>E-mail</Text>
          <Text>{email}</Text>
        </Stack>
        <Divider />
        <Editable
          onSubmit={() =>
            putUserField({
              actionType: PUT_USER_NAME,
              id,
              field: 'name',
              value: name,
            })
              .then(async (res) => {
                const { name } = await res.json()
                dispatch(setAuth({ name }))
              })
              .catch(console.log)
          }
          value={!isEmpty(name) ? name : 'Not Defined'}
          isPreviewFocusable={false}
        >
          <Text fontSize={'xs'}>Name</Text>
          <Flex gap={3} alignItems="center">
            <EditablePreview />
            <Input
              onChange={(e) =>
                setState({
                  ...state,
                  name: e.target.value,
                })
              }
              as={EditableInput}
            />
            <EditableControls />
          </Flex>
        </Editable>

        <Divider />

        <Editable
          onSubmit={() =>
            putUserField({
              actionType: PUT_USER_SURNAME,
              id,
              field: 'surname',
              value: surname,
            })
              .then(async (res) => {
                const { surname } = await res.json()
                dispatch(setAuth({ surname }))
              })
              .catch(console.log)
          }
          defaultValue={!isEmpty(surname) ? surname : 'Not Defined'}
          isPreviewFocusable={false}
        >
          <Text fontSize={'xs'}>Surname</Text>
          <Flex gap={3} alignItems="center">
            <EditablePreview />
            <Input
              as={EditableInput}
              onChange={(e) =>
                setState({
                  ...state,
                  surname: e.target.value,
                })
              }
            />
            <EditableControls />
          </Flex>
        </Editable>

        <Divider />

        <Editable
          onSubmit={() =>
            putUserField({
              actionType: PUT_USER_PHONE,
              id,
              field: 'phone',
              value: phone,
            })
              .then(async (res) => {
                const { phone } = await res.json()
                dispatch(setAuth({ phone }))
              })
              .catch(console.log)
          }
          defaultValue={!isEmpty(phone) ? phone : 'Not Defined'}
          isPreviewFocusable={false}
        >
          <Text fontSize={'xs'}>Phone Number</Text>
          <Flex gap={3} alignItems="center">
            <EditablePreview />
            <Input
              as={EditableInput}
              onChange={(e) =>
                setState({
                  ...state,
                  phone: e.target.value,
                })
              }
            />
            <EditableControls />
          </Flex>
        </Editable>
      </Stack>
    </>
  )
}

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="check-icon"
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="close-icon"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="edit-button"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  )
}
