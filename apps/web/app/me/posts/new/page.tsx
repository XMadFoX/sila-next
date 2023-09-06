import React from 'react'
import dynamic from 'next/dynamic'
const NewAd = dynamic(() => import('./new'), {
	ssr: false,
});

export default function page() {
  return (
    <NewAd />
  )
}
