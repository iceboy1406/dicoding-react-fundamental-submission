import {
  Box,
  Button,
  Card,
  Image,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import useColorScheme from 'hooks/useColorScheme'
import useLocalization from 'hooks/useLocalization'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import AuthApi from 'api/services/auth'
import { showNotification } from '@mantine/notifications'
import useLanguage from 'hooks/useLanguage'
import { FiCheck } from 'react-icons/fi'
import Token from 'api/token'
import axios, { isAxiosError } from 'api/axios'
import { LoginPayload } from 'types/payload'
const LoginPage = () => {
  const { colorScheme } = useColorScheme()
  const theme = useMantineTheme()
  const {
    pages: { login: localization },
  } = useLocalization()
  const { language } = useLanguage()

  const navigate = useNavigate()
  const {
    control,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    setError,
    reset,
    trigger,
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const loginMutation = useMutation(AuthApi.login, {
    onError: (error) => {
      if (isAxiosError<ApiResponse>(error)) {
        if (error.response) {
          const {
            response: {
              data: { message },
            },
          } = error

          // Error from backend doesn't have localization feature. So i do it manually.
          // Its not effective because I need to know every possible error.

          switch (message) {
            case 'Password is wrong':
              setError('password', {
                message,
              })
              break
            case 'Email not found':
              setError('email', {
                message,
              })
              break
            case `"email" must be a valid email`:
              setError('email', {
                message,
              })
              break
            default:
              showNotification({
                message,
                title: 'Error',
                color: 'red',
              })
              break
          }
        }
      }
    },
    onSuccess: (data) => {
      Token.setToken(data.data.accessToken)
      reset()
      showNotification({
        title: localization.onSuccessNotification.title,
        message: localization.onSuccessNotification.message,
        color: 'teal',
        icon: <FiCheck />,
      })
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${Token.getToken()}`
      navigate('/', {
        replace: true,
      })
    },
  })
  const onSubmit = (values: LoginPayload) => {
    loginMutation.mutate(values)
  }

  // Its localization feature for validation error from backend
  // This method will rerender when language changed
  const localizationValidationError = (errorMessage?: string) => {
    switch (errorMessage) {
      case 'Password is wrong':
        return localization.form.password.validation.wrongPassword
      case 'Email not found':
        return localization.form.email.validation.emailNotFound
      case `"email" must be a valid email`:
        return localization.form.email.validation.validFormat
      default:
        return errorMessage
    }
  }

  useEffect(() => {
    // Update error message for error from Controller rules
    // errors[fieldName].type will undefined when error not from Controller rules, like trigger by setError
    if (errors.email?.type) trigger('email')
    if (errors.password?.type) trigger('password')
  }, [language])

  return (
    <>
      <Card
        radius={'md'}
        sx={{
          display: 'flex',
          gap: '40px',
          '@media (min-width: 768px)': {
            padding: '72px 24px',
            alignItems: 'center',
          },
        }}
      >
        <Box
          component="aside"
          sx={{
            display: 'none',
            '@media (min-width: 768px)': {
              display: 'block',
              flexBasis: '50%',
              height: 'fit-content',
            },
          }}
        >
          <Image src="/assets/images/login-illustration.svg" />
          <Text
            component="p"
            sx={{
              fontSize: '12px',
              textAlign: 'center',
            }}
          >
            {localization.illustrationCredit.firstPart}{' '}
            <Box
              component="a"
              sx={{
                textDecoration: 'none',
                color: theme.colors.indigo,
              }}
              href="https://www.freepik.com/free-vector/hands-character-writing-letter-desk-with-papers-pencil-envelopes-coffee-cup_11235480.htm"
              target="_blank"
              rel="noreferrer"
            >
              pch.vector
            </Box>{' '}
            {localization.illustrationCredit.lastPart}
          </Text>
        </Box>
        <Box
          component="aside"
          sx={{
            flexBasis: '100%',
            '@media (min-width: 768px)': {
              flexBasis: '50%',
            },
          }}
        >
          <Box
            component="article"
            sx={{
              marginBottom: '20px',
            }}
          >
            <Text
              component="h1"
              color={colorScheme === 'dark' ? 'gray.3' : 'gray.7'}
              sx={{
                fontSize: '24px',
                marginTop: 0,
                marginBottom: '4px',
              }}
            >
              {localization.title}
            </Text>
            <Text
              component="p"
              color={colorScheme === 'dark' ? 'gray.5' : 'gray.6'}
              sx={{
                fontSize: '16px',
                margin: 0,
              }}
            >
              {localization.subtitle}
            </Text>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: localization.form.email.validation.required,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: localization.form.email.validation.validFormat,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={localization.form.email.label}
                  placeholder={localization.form.email.placeholder}
                  name="email"
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    onChange(e)
                  }}
                  value={value}
                  error={localizationValidationError(errors.email?.message)}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: localization.form.password.validation.required,
              }}
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label={localization.form.password.label}
                  placeholder={localization.form.password.placeholder}
                  name="password"
                  value={value}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    onChange(e)
                  }}
                  error={localizationValidationError(errors.password?.message)}
                />
              )}
            />
            <Button
              disabled={!isDirty || !isValid}
              type="submit"
              loading={loginMutation.isLoading}
            >
              {localization.form.submitButton.text}
            </Button>
          </Box>
          <Text
            component="p"
            sx={{
              fontSize: '14px',
              textAlign: 'center',
              '& a': {
                textDecoration: 'none',
                color: theme.colors.indigo,
              },
            }}
          >
            {localization.doNotHaveAnAccountText.doNotHaveAnAccount}{' '}
            <Box component={Link} to="/auth/register">
              {localization.doNotHaveAnAccountText.register}
            </Box>
          </Text>
        </Box>
      </Card>
    </>
  )
}

export default LoginPage
