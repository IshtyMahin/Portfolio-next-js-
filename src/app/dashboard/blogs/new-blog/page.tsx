import BlogForm from "@/components/dashboard/blog/BlogForm";

export default function NewBlog() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <BlogForm mode="create" />
    </div>
  );
}
