import EmptySection from '@/components/block/common/empty-section'

export default function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <EmptySection
        title="Not Found"
        message="The page you are looking for does not exist or has been moved."
      />
    </div>
  )
}
