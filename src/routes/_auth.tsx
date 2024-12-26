import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    if (context.isSignedIn) {
      throw redirect({
        to: '/store/store_details',
      })
    }
  },
})

