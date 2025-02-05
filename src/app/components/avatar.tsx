import React from 'react'
import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { getInitials } from '@/utils/getInitials'

interface AvatarProps {
  image?: string
  fallback: string
  width?: string
  height?: string
  className?: string
}

export default function Avatar({
  image,
  fallback,
  width,
  height,
  className,
}: AvatarProps) {
  return (
    <AvatarContainer style={{ width: `${width}`, height: `${height}` }}>
      <AvatarImage src={image} />
      <AvatarFallback className={`bg-primaryColor ${className}`}>
        {getInitials(fallback)}
      </AvatarFallback>
    </AvatarContainer>
  )
}
