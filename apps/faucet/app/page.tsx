'use client'

import { faucet } from '@/app/_actions/faucet'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@indieverse/ui/button'
import { Card, CardContent } from '@indieverse/ui/card'
import { Form, FormField, FormItem } from '@indieverse/ui/components/ui/form'
import { Input } from '@indieverse/ui/components/ui/input'
import { toast } from '@indieverse/ui/sonner'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { type Address, isAddress } from 'viem'
import { useAccount, useChainId } from 'wagmi'
import { z } from 'zod'

const formSchema = z.object({
  address: z
    .string()
    .refine(isAddress, { message: 'Invalid address' }) as z.ZodType<Address>,
})

export default function Home() {
  const { address } = useAccount()
  const chainId = useChainId()
  const request = useAction(faucet, {
    onSuccess: ({ input: { address } }) => {
      toast.success(`Tokens sent to your address: ${address}`)
    },
    onError: () => {
      toast.error('Failed to send tokens')
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '' as Address,
    },
  })

  useEffect(() => {
    if (address) {
      form.setValue('address', address)
    }
  }, [address])

  function onSubmit(values: z.infer<typeof formSchema>) {
    request.execute({ ...values, chainId })
  }
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            className="grid grid-cols-1 sm:grid-cols-[1fr_160px] items-center justify-center gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    {...field}
                    readOnly
                    placeholder="0x4167A36D575217e54750305909AA2909D9392842"
                    className="truncate"
                  />
                </FormItem>
              )}
            />
            <Button type="submit">Request</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
