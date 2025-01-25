'use client'
import { useEffect, useState } from 'react'

import InitialHeader from './components/InitialHeader'
import InitialBackgroundSection from './components/InitialBackgroundSection'
import InitialProperties from './components/InitialProperties'
import InitialPropertyNews from './components/InitialPropertyNews'
import InitialPartners from './components/InitialPartners'
import InitialPropertyForSale from './components/InitialPropertyForSale'
import InitialPropertyForRent from './components/InitialPropertyForRent'
import InitialCompanies from './components/InitialCompanies'
import InitialAgents from './components/InitialAgents'
import InitialFooter from './components/InitialFooter'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isForSale, setIsForSale] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <div className="w-full min-h-screen bg-secondaryColor">
      <InitialHeader />
      <InitialBackgroundSection search={search} setSearch={setSearch}
        isForSale={isForSale} setIsForSale={setIsForSale}
        address={address} setAddress={setAddress} />
      <InitialProperties />
      <InitialPropertyNews />
      <InitialPartners />
      <InitialPropertyForSale />
      <InitialPropertyForRent />
      <InitialCompanies />
      <InitialAgents />
      <InitialFooter />

    </div>
  )
}

