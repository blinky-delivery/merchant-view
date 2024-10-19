import { createLazyFileRoute } from '@tanstack/react-router'
import { LogInIcon } from "lucide-react"

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { signupStore } from '@/api/storeService';

export const Route = createLazyFileRoute('/signup')({
  component: Signup,
})

const cities = [
  { id: 'ny', name: 'New York' },
  { id: 'sf', name: 'San Francisco' },
  { id: 'la', name: 'Los Angeles' },
];

const restaurantTypes = [
  { id: 'fastfood', name: 'Fast Food' },
  { id: 'cafe', name: 'Cafe' },
  { id: 'fine_dining', name: 'Fine Dining' },
];

function Signup() {
  const [restaurantName, setRestaurantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createStore = useMutation({
    mutationFn: (data: any) => signupStore(data)
  })


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const signupData = {
      restaurantName,
      phoneNumber,
      email,
      password,
    };
    console.log(signupData);
    createStore.mutate(signupData)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">

      {/* Section 1: Restaurant/Shop Information */}
      <div className="text-center space-y-2">
        <img src="/blinky_orange.png" alt="login icon" className="mx-auto mb-4 h-40" />
        <h2 className="text-xl font-bold">Start selling on Blinky</h2>
        <p>Welcome! Let’s get you set up. It should only take a few minutes.</p>
      </div>

      {/* Restaurant Name */}
      <div>
        <Label htmlFor="restaurantName">Restaurant or shop name</Label>
        <Input
          id="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Start typing restaurant or shop name"
          required
        />
      </div>

      {/* Section 2: Login Details */}
      <div className="text-center space-y-2">
        <LogInIcon className='mx-auto' />
        <h3 className="text-lg font-bold">Log in details</h3>
        <p>Create your log in details for Blinky Hub</p>
      </div>

      {/* Business Email */}
      <div>
        <Label htmlFor="email">Business email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E.g. enquires@jjsdiner.com"
          required
        />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Create a password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimum 10 characters"
          required
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full mt-4">Next</Button>

      {/* Log in link */}
      <p className="mt-4 text-sm text-center">
        Already have an account? <a href="/login" className="text-primary">Log in</a>
      </p>

      {/* Privacy Notice */}
      <p className="mt-4 text-xs text-center">
        For details on our processing of your personal information, please see our
        <a href="/privacy-policy" className="text-primary"> Privacy Policy.</a>
      </p>
    </form>
  );
};
