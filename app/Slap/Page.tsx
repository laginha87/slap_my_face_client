import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Slap } from 'app/Slap/Slap'
import { useS3File, buildS3Url } from 'app/Services/S3'

const GeneratorLink: FC = () => <div>
  <div>Create your own version with the generator</div>
</div>

export const SlapPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, { name, message }] = useS3File<{
    message: string
    name: string
  }>(`${id}/public`)

  return (
    <>
      <Slap
      loading={loading}
      left={buildS3Url(`${id}/left`)}
      right={buildS3Url(`${id}/right`)}
      center={buildS3Url(`${id}/center`)}
      name={name}
      message={message}
    />
      <GeneratorLink />
    </>
  )
}
