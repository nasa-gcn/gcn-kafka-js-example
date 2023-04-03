import { Kafka } from 'gcn-kafka'

// Create a client.
// Warning: don't share the client secret with others.
const kafka = new Kafka({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
})

// Subscribe to topics and receive alerts
const consumer = kafka.consumer()
try {
  await consumer.subscribe({
    topics: [
        'gcn.classic.text.LVC_INITIAL',
        'gcn.classic.text.LVC_PRELIMINARY',
        'gcn.classic.text.LVC_RETRACTION',
    ],
  })
} catch (error) {
  if (error.type === 'TOPIC_AUTHORIZATION_FAILED')
  {
    console.warn('Not all subscribed topics are available')
  } else {
    throw error
  }
}

await consumer.run({
  eachMessage: async (payload) => {
    const value = payload.message.value
    console.log(value?.toString())
  },
})
