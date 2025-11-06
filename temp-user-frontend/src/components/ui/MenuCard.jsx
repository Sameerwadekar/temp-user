'use client'
import { HeartIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'



const CardProductDemo = ({meal}) => {

  return (
    <div className='relative max-w-md rounded-xl bg-linear-to-r shadow-lg'>
      <div className='flex h-60 items-center justify-center border border-amber-400'>
        <img
          src={meal.strMealThumb}
          alt='Shoes'
          className='w-75 h-full object-cover'
        />
      </div>
      
      <Card className='border-none h-auto'>
        <CardHeader>
          <CardTitle>Nike Jordan Air Rev</CardTitle>
          <CardDescription className='flex items-center gap-2'>
            <Badge variant='outline'>EU38</Badge>
            <Badge variant='outline'>Black and White</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Crossing hardwood comfort with off-court flair. &apos;80s-Inspired construction, bold details and
            nothin&apos;-but-net style.
          </p>
        </CardContent>
        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>
            <span className='text-xl font-semibold'>$69.99</span>
          </div>
          <Button size='lg'>Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardProductDemo
