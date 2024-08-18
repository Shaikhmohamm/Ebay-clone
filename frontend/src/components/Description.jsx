import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import Image from 'next/image'

const Description = ({product}) => {
  const { list } = product.item.properties
  const {description} = product.item
  const slicedList = list.slice(0, 26)
  return (
    <div className='hidden md:block'>
        <Tabs defaultValue="specs" className="">
        <TabsList className='flex justify-start gap-2 ml-10 w-64 bg-white'>
          <TabsTrigger
            className=''
            value="specs">
            About this item
          </TabsTrigger>
          <TabsTrigger
            value="shipping">
            Shipping, returns, and payments
          </TabsTrigger>
          <TabsTrigger
            value="description">
            Description
          </TabsTrigger>
        </TabsList>
        <TabsContent className='mt-0' value="specs">
          <div className="overflow-x-scroll border-2 mx-10 font-sans rounded-lg p-4 bg-white">
            <h1 className='text-xl font-semibold text-black mb-2'>
              Item specification
            </h1>
            <div className="grid grid-cols-2 gap-1 rounded-md py-2">
              {slicedList.map((single, index) => (
                <div key={index} className="flex gap-8 items-center py-2">
                  <p className="w-1/4 text-sm text-gray-700">{single.name}</p>
                  <p className="w-1/4 text-sm font-bold">{single.value}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="shipping">
          <div className='border-2 mx-10 font-sans rounded-lg p-4 bg-white'>
            <div className='flex my-3 font-medium justify-between '>
              <h1>
              Seller assumes all responsibility for this listing.
              </h1>
              <p>
              eBay item number: {product.item.itemId}
              </p>
            </div>
            <h1 className='text-2xl font-bold my-5'>
              Shipping and handling
            </h1>
            <div className='font-medium'>
              <p className='my-2'>
                Item location: {product.delivery.shippingFrom}
              </p>
              <p className=''>
                Ship to: <span className='text-slate-400'>
                  {product.delivery.shippingTo}
                </span>
              </p>
            </div>
            <div className='my-3'>
              <Table className='border-2'>
                <TableHeader>
                  <TableRow className='bg-gray-200'>
                    <TableHead className="">Shipping and handling</TableHead>            
                    <TableHead>To</TableHead>
                    <TableHead className="">service</TableHead>
                    <TableHead>Shipping time</TableHead>
                    <TableHead>Delivery</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{product.delivery.shippingList[0].note[0]}</TableCell>
                    <TableCell>{product.delivery.shippingTo}</TableCell>
                    <TableCell className="">Ebay standard shipping</TableCell>
                    <TableCell>{product.delivery.shippingList[0].note[1]}</TableCell>
                    <TableCell className="">{product.delivery.shippingList[0].estimateDeliveryDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className='text-sm font-light my-4'>
              Estimated delivery dates include seller&#39;s handling time,
              origin ZIP Code, destination ZIP Code and time of acceptance and will depend on shipping
              service selected and receipt of cleared payment. Delivery times may vary, especially
              during peak periods.
            </p>
            <div className='my-3'>
              <Table className='border-2'>
                <TableHeader>
                  <TableRow className='bg-gray-200'>
                    <TableHead className="">Handling time</TableHead>            
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Will usually ship within 2 business days of receiving cleared payment.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className='my-3'>
              <Table className='border-2'>
                <TableHeader>
                  <TableRow className='bg-gray-200'>
                    <TableHead className="">Taxes</TableHead>            
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                    Taxes may be applicable at checkout.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <h1 className='text-xl font-bold mt-8 mb-4'>
              Return Policy
            </h1>
            <Table className='border-2'>
              <TableHeader>
                <TableRow className='bg-gray-200'>
                  <TableHead className="">After receiving the item, contact seller within</TableHead>
                  <TableHead className="">Refund will be given as	</TableHead>
                  <TableHead className="">Return shipping</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    30 days
                  </TableCell>
                  <TableCell className="font-medium">
                    Money Back
                  </TableCell>
                  <TableCell className="font-medium">
                    Seller pays for return shipping
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent className='mt-0' value="description">
          <div className="border-2 flex flex-wrap justify-between mx-10 font-sans rounded-lg p-4 bg-white">
            {description.images.map((image, index) => (
              <div key={index} className="w-1/3 p-2">
                <Image
                  src={`https:${image}`}
                  alt="image"
                  width={550}
                  height={300}
                  className="w-full object-contain"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Description