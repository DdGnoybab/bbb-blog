import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function PostBody({ content }: { content: string }) {
  return (
    <div className="prose-zzz max-w-none text-text-primary leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
