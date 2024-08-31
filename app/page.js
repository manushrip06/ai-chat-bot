'use client'

import { Box, Stack, TextField, Button, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hi I'm the HeadStarter Support Agent, how can I assist you today?`,
  }])
  const [message, setMessage] = useState('')


  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      {role:'user', content:message},
      {role: 'assistant', content: ''},
    ])
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role:'user', content:message}]),
    }).then(async(res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let result = ''
      return reader.read().then(function processText({done, value}) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length-1]
          let otherMessages = messages.slice(0, messages.length-1)
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            }
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  return (

      <div style={{ backgroundColor: '#3C5556', minHeight: '100vh', width : "1535px" , }}>
        <Typography variant='h6' color='black' textAlign='center' fontFamily='Kind Sans' fontSize={77}>
          HeadStarter AI Chatbot
        </Typography>
        {/* ... rest of your JSX ... */}
   
        <Box 
      width="100vw" 
      height="85vh"
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center"
      sx={{
        backgroundImage: 'url("/code.png.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack 
        direction="column"
        width="1535px"
        height="2000px"
       
        p={2}
        spacing={3}
        bgcolor="#C8DBD7"
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box key={index} 
              display='flex' 
              
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            > 
              <Box
              bgcolor={message.role === 'assistant' ? '#D8BBD3' : '#FAE7EB'}
                
                color="black"
                borderRadius={16}
                p={3}  
              > 
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          
        >
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)} 
          />
          <Button variant="contained" onClick={sendMessage}> 
            Send 
          </Button>
        </Stack>
      </Stack>
    </Box>
   
    </div>
  
  )
}







































































































































































































