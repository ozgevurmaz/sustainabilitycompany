import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {
  title: String,
  middleValue: string,
  desc: string
}

const CustomCard = (props: Props) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.middleValue}</div>
        <p className="text-xs text-gray-500 mt-1">{props.desc}</p>
      </CardContent>
    </Card>
  )
}

export default CustomCard