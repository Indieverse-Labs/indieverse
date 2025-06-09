import { Button } from '@indieverse/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@indieverse/ui/card'
import { Input } from '@indieverse/ui/components/ui/input'
import Image from 'next/image'

export default function Home() {
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
              </CardHeader>
              <CardContent className="grid grid-cols-1 place-content-center">
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-center gap-2">
                      <Input
                        placeholder="0x4167A36D575217e54750305909AA2909D9392842"
                        className="truncate"
                      />
                      <Button>Request</Button>
                    </div>
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
