import { Box, Button, Image } from '@mantine/core'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px'
      }}
    >
      <Box
        component="figure"
        sx={{
          width: '100%',
          maxWidth: '425px',
        }}
      >
        <Image src="/assets/images/404.webp" alt="404 illustration" />
      </Box>
      <Link to="/">
        <Button size="md">Kembali ke Beranda</Button>
      </Link>
    </Box>
  )
}

export default PageNotFound
