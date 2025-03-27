"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownEditor({ value, onChange }) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
      <div className="flex border-b border-gray-700">
        <button
          className={`px-4 py-2 font-medium ${
            !isPreview
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setIsPreview(false)}
        >
          Write
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            isPreview
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setIsPreview(true)}
        >
          Preview
        </button>
      </div>

      <div className="p-4">
        {isPreview ? (
          <div className="prose prose-invert max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-gray-300" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-white" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic text-gray-300" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-purple-400 pl-4 italic text-gray-400"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside" {...props} />
                ),
                li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-gray-800 px-1 py-0.5 rounded text-purple-300"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                table({ node, ...props }) {
                  return (
                    <div className="overflow-x-auto">
                      <table
                        className="min-w-full divide-y divide-gray-600"
                        {...props}
                      />
                    </div>
                  );
                },
                img({ src, alt, ...props }) {
                  if (!src) return null;
                  return (
                    <img
                      src={src}
                      alt={alt || "Image"}
                      className="rounded-lg border border-gray-600 max-w-full h-auto"
                      {...props}
                    />
                  );
                },
                a({ href, ...props }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 hover:underline"
                      {...props}
                    />
                  );
                },
                div({ node, children, ...props }) {
                  return <div {...props}>{children}</div>;
                },
                span({ node, children, ...props }) {
                  return <span {...props}>{children}</span>;
                },
              }}
            >
              {value}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            className="w-full bg-gray-800 text-gray-200 min-h-[300px] p-2 focus:outline-none font-mono text-sm rounded-md"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your blog content in Markdown..."
          />
        )}
      </div>

      {!isPreview && (
        <div className="px-4 py-2 bg-gray-700 text-sm text-gray-400">
          Supports **Markdown**, **HTML**, **Tailwind CSS**, and **className**
          attributes!
        </div>
      )}
    </div>
  );
}
