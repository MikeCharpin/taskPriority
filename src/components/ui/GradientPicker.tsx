'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Paintbrush } from 'lucide-react'
import { useMemo, useState } from 'react'

export function PickerExample() {
  const [background, setBackground] = useState('#B4D455')

  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  )
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#164E63',
    '#115E59',
    '#cd93ff',
    '#047857',
    '#B45309',
    '#881337',
    '#262626',
    '#db2777',
    '#451A03',
    '#86198f',
    '#083344',
    '#7e22ce',
    '#8b5cf6',
    '#4A044E',
    '#9F1239',
    '#7F1D1D',
    '#4F46E5',
    '#14B8A6',
    '#16A34A',
    '#06b6d4',
    '#CA8A04',
    '#14b8a6',
    '#DC2626',
    '#059669',
    '#065f46',
    '#22c55e',
    '#166534',
    '#65a30d',
    '#3f6212',
    '#ca8a04',
    '#854d0e',
    '#d97706',
    '#9a3412',
    '#f97616',
    '#b91c1c',
    '#E11D48',
    '#737373',
  ]

  const gradients = [
    'linear-gradient(to bottom right, #666600, #999900, #CCCC00, #FFFF00)',
    'linear-gradient(to top left, #660066, #990099, #CC00CC, #FF00FF)',
    'linear-gradient(to top left,#000000,#434343)',
    'linear-gradient(to top left,#09203f,#537895)',
    'linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)',
    'linear-gradient(to top left,#f953c6,#b91d73)',
    'linear-gradient(to top left,#ee0979,#ff6a00)',
    'linear-gradient(to top left,#F00000,#DC281E)',
    'linear-gradient(to top left,#00c6ff,#0072ff)',
    'linear-gradient(to top left,#4facfe,#00f2fe)',
    'linear-gradient(to top left,#0ba360,#3cba92)',
    'linear-gradient(to bottom right, #006666, #009999, #00CCCC, #00FFFF)',
    'linear-gradient(to top left, #800080, #993399, #A366CC, #B399FF, #CC99FF)',
    'linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)',
    'linear-gradient(to bottom right, #FF0000, #FF3333, #FF6666, #FF9999, #FFCCCC)',
    'linear-gradient(to bottom right, #006600, #009900, #00CC00, #00FF00)',
    'linear-gradient(to top left, #0000FF, #3333FF, #6666FF, #9999FF, #CCCCFF)',
    'linear-gradient(to top left, #7FFFD4, #FF4500)',
    'linear-gradient(to top left, #6495ED, #FF69B4) ',
    'linear-gradient(to top left, #00CED1, #FFD700)',
    'linear-gradient(to top left, #4682B4, #FF6347) ',
    'linear-gradient(to top left, #20B2AA, #FF8C00)',
    'linear-gradient(to top left, #8B008B, #FFD700) ',
    'linear-gradient(to top left, #9932CC, #FF8C00) ',
    'linear-gradient(to top left, #5A6473, #A06161)',
    'linear-gradient(to top left, #227C83, #B84C25)',
    'linear-gradient(to top left, #6C4F5A, #438792)',
    'linear-gradient(to top left, #585F7A, #AA6B71)',
    'linear-gradient(to top left, #346A59, #B84C25)',
    'linear-gradient(to top left, #725F6B, #3F7396) ',
    'linear-gradient(to top left, #944F50, #2C9E9B)',
    'linear-gradient(to top left, #4F4A6E, #9F896E) ',



  ]

  const defaultTab = useMemo(() => {
    if (background.includes('gradient')) return 'gradient'
    return 'solid'
  }, [background])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="flex flex-wrap gap-1 mb-2">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>

          </TabsContent>

        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}