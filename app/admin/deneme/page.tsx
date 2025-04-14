"use client"

import ImageUploader from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import React, { useEffect } from 'react'

const page = () => {
  const [foto, setFoto] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const updateForm = () => {
    setFoto(url)
  }

  useEffect(() => {
    console.log(foto)
  }, [foto])


  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Open Dialog</Button>
      <Dialog open={isOpen} >
      <DialogContent >
        <ImageUploader value={foto} onChange={setFoto} onRemove={() => setFoto("")} />
      </DialogContent></Dialog>
    </div>
  )
}

export default page