'use client'

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { handleForgotPwd } from '@/lib'
import { useState } from 'react'
import { AvatarSpinner } from '@/components'

const ForgotPassword = () => {
  const [helperText, setHelperText] = useState('')

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required!')
        .email(`Must be a valid email`),
    }),
    onSubmit: (values, actions) => {
      const { setFieldError, setSubmitting } = actions
      handleForgotPwd({
        email: values.email,
        setFieldError,
        setSubmitting,
        setHelperText,
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3} align={'center'}>
        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          <FormHelperText
            display={!helperText ? 'none' : 'initial'}
            color={'green.300'}
          >
            {helperText}
          </FormHelperText>
        </FormControl>
        <Button
          w={250}
          colorScheme="twitter"
          size="sm"
          type="submit"
          spinner={<AvatarSpinner />}
          isLoading={formik.isSubmitting}
        >
          Reset Password
        </Button>
      </Stack>
    </form>
  )
}

export default ForgotPassword
