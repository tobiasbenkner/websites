import { Video } from '@/payload-types'
import { Queue } from 'bullmq'
import {
  HookOperationType,
  PayloadRequest,
  RequestContext,
  SanitizedCollectionConfig,
} from 'payload'

type CreateOrUpdateOperation = Extract<HookOperationType, 'create' | 'update'>

type Props = {
  doc: Video
  operation: CreateOrUpdateOperation
  req: PayloadRequest

  collection: SanitizedCollectionConfig
  context: RequestContext
  data: Partial<any>
  previousDoc: any
}

// Benenne es um, um klarer zu machen, was es tut
export async function queueVideoCompression({ operation, doc: video, req }: Props) {
  if (operation !== 'create' || !video.filename) {
    return
  }

  await req.payload.update({
    collection: 'videos',
    id: video.id,
    data: {
      size: video.filesize,
    },
  })

  const videoQueue = getVideoQueue()
  await videoQueue.add('compress', {
    videoId: video.id,
    originalFilename: video.filename,
  })

  console.log(`Queued video ${video.id} for compression.`)
}
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
}

export const VIDEO_QUEUE_NAME = 'video-compression'

let videoQueue: Queue;

function getVideoQueue() {
  if (!videoQueue) {
    console.log('Creating new BullMQ Queue instance for video-compression...')
    videoQueue = new Queue(VIDEO_QUEUE_NAME, { connection })
  }
  return videoQueue
}