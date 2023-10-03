import { Image, Slide, useColorModeValue } from '@chakra-ui/react'

export default function PageSpinner({
  routeLoading,
}: {
  routeLoading: boolean
}) {
  const bgColor = useColorModeValue(
    'rgba(253, 253, 255, 0.9)',
    'rgba(26, 32, 44, 0.9)'
  )
  return (
    <Slide
      in={routeLoading}
      direction={'top'}
      style={{
        transitionDuration: '0.5s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        width: '100vw',
        height: '100vh',
        backgroundColor: bgColor,
      }}
    >
      <Image h={250} src={'/avatarfi-spinner.gif'} alt={'avatarfi-spinner'} />
    </Slide>
  )
}
