import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createLazyFileRoute('/store/store_details')({
  component: StoreDetails
})


export function StoreDetails() {

  const [firstName, setFirstname] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [lastName, setLastname] = useState('')
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 500)
    return () => clearTimeout(timer)
  }, [])


  return (<form className="space-y-6 max-w-md mx-auto">
    <div className='text-center space-y-2'>
      <h2 className="text-xl font-bold">Business owner details</h2>
      <p>We’ll use personal details of the business owner to get in touch when we need to.</p>

    </div>

    <div>
      <Label htmlFor="firstname">First name</Label>
      <Input
        id="firstname"
        value={firstName}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="E.g. Anthony"
        required
      />
    </div>

    <div>
      <Label htmlFor="lastname">Last name</Label>
      <Input
        id="lastname"
        value={lastName}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="E.g. Boudrin"
        required
      />
    </div>

    <div>
      <Label htmlFor="phoneNumber">Phone number</Label>
      <Input
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="E.g. +212 60000001"
        required
      />
    </div>

    <Button type="submit" className="w-full mt-4">
      Next
    </Button>
    <Progress value={progress} className="w-full" />

  </form>)
}