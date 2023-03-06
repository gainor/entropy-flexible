import React from 'react'
import NextLink from 'next/link'
import Button from '@/components/base/Button'

type IconButtonProps = {
  icon: React.ReactNode
  href: string
  tooltip: string
  // onClick: () => void
}

const IconButton = (props: IconButtonProps) => {
  return (
    <NextLink href={props.href}>
      <Button variant='tertiary' className='px-4 py-2 w-fit'>
        {props.icon}
      </Button>
    </NextLink>
  )
}

export default IconButton
