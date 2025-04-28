export const usePageSeoMeta = ({ title, description }: { title: MaybeRef<string>, description?: MaybeRef<string> }) => {
  useSeoMeta({
    title: () => unref(title),
    ...(unref(title) && {
      ogTitle: () => unref(title),
      twitterTitle: () => unref(title),
    }),
    ...(unref(description) && {
      description: () => unref(description),
      ogDescription: () => unref(description),
      twitterDescription: () => unref(description),
    }),
  })
}
