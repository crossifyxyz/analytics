'use client'

import { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { postNewPwd } from '@/lib'
import { AvatarSpinner } from '@/components'

export default function NewPwd() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pwdResetToken = searchParams.get('pwdResetToken')
  const [helperText, setHelperText] = useState('')
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required!')
        .test(
          'len',
          'Must be more then 5 characters',
          (val) => !!val && val.length > 5
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), undefined],
        'Passwords must match!'
      ),
    }),
    onSubmit: (values, actions) => {
      const { setSubmitting, setFieldError } = actions
      postNewPwd({ pwdResetToken, password: values.password }).then(
        async (res) => {
          const text = await res.text()
          if (res.ok) {
            setHelperText(text)
            router.replace('/login')
          } else setFieldError('password', text)

          setSubmitting(false)
        }
      )
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <FormControl
          isInvalid={formik.touched.password && !!formik.errors.password}
        >
          <FormLabel htmlFor="password">New Password*</FormLabel>
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
        <FormControl
          isInvalid={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
        >
          <FormLabel htmlFor="password">Confirm Password*</FormLabel>
          <InputGroup>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
          </InputGroup>
          <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          <FormHelperText
            display={!helperText ? 'none' : 'initial'}
            color={'green.300'}
          >
            {helperText}
          </FormHelperText>
        </FormControl>
        <Button
          colorScheme="twitter"
          size="sm"
          type="submit"
          spinner={<AvatarSpinner />}
          isLoading={formik.isSubmitting}
        >
          Submit
        </Button>
      </Stack>
    </form>
  )
}
