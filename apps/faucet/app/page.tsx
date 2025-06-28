'use client'

import { Button } from '@indieverse/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@indieverse/ui/card'
import { Form, FormField, FormItem } from '@indieverse/ui/components/ui/form'
import { Input } from '@indieverse/ui/components/ui/input'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { useAccount, useWriteContract } from 'wagmi'

import { abi } from '@/app/abi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  address: z.string().min(2, {
    message: 'must be at least 2 characters.',
  }),
})

const contractAddress = '0xe5Bbc2bA6AE4acBBF63baC57477d4cE515e2D596'

export default function Home() {
  const { data: hash, writeContract } = useWriteContract()
  const { address } = useAccount()

  console.log(hash)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
    },
  })

  useEffect(() => {
    if (address) {
      form.setValue('address', address)
    }
  }, [address])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    writeContract({
      address: contractAddress,
      abi,
      functionName: 'withdraw',
    })
  }
  return (
    <div className="m-auto w-full h-full fixed bottom-0 overflow-x-hidden overflow-y-auto bg-[url('/assets/layout/noise.svg')] bg-repeat bg-background">
      <div className="p-0 px-8 bg-none h-full md:px-3">
        <div className="w-full min-h-dvh">
          <div className="grid grid-rows-[auto_1fr] max-w-5xl min-h-dvh mx-auto border border-[#fdf7f1] bg-background shadow-[rgb(226,209,191)_0px_0px_0px_1px]">
            <div
              data-slot="decorator"
              className="h-4 border-t bg-[url('/assets/layout/divider.png')] bg-contain bg-repeat-x shadow"
            />
            <Card className="grid grid-rows-[auto_1fr_auto]">
              <CardHeader className="flex items-center justify-between gap-0 p-0">
                <Image
                  src="/icons/indieverse.svg"
                  alt="logo"
                  width={36}
                  height={36}
                  className="aspect-square"
                />
                <Button>Hello</Button>
                <ConnectButton />
              </CardHeader>
              <CardContent className="grid grid-cols-1 place-content-center">
                <Card>
                  <CardContent>
                    <Form {...form}>
                      <form
                        className="flex items-center justify-center gap-2"
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
              </CardContent>
              <CardFooter className="min-h-16 bg-[linear-gradient(to_right,rgb(243,230,213)_1px,transparent_1px),linear-gradient(rgb(243,230,213)_1px,transparent_1px)] bg-size-[20px_20px] bg-repeat bg-position-[-1px] shadow">
                <footer className="py-4 px-4">
                  <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{' '}
                    <a
                      href="https://github.com/EffectDoplera"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      EffectDoplera
                    </a>
                    . The source code is available on{' '}
                    <a
                      href="https://github.com/EffectDoplera/#"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </footer>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
