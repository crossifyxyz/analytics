'use client'

import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { handleLogin } from '@/lib'
import Link from 'next/link'
import { AvatarSpinner } from '@/components'

const Login = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required!')
        .email(`Must be a valid email`),
      password: Yup.string().required('Password is required!'),
    }),
    onSubmit: (values, actions) => {
      const { email, password } = values
      const { setSubmitting, setFieldError } = actions
      handleLogin({
        email,
        password,
        setSubmitting,
        setFieldError,
        dispatch,
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4} align="center">
        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <InputGroup>
            <Input
              name="email"
              type="email"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </InputGroup>
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.touched.password && !!formik.errors.password}
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <ChakraLink as={Link} href="/forgot-pwd" color={'blue.300'}>
          Forgot Password?
        </ChakraLink>
        <Button
          w={250}
          colorScheme="twitter"
          size="sm"
          type="submit"
          spinner={<AvatarSpinner />}
          isLoading={formik.isSubmitting}
        >
          Login
        </Button>

        <ChakraLink as={Link} href="/signup" color={'blue.300'}>
          Dont Have an Account? Sign Up
        </ChakraLink>
      </Stack>
    </form>
  )
}

export default Login
