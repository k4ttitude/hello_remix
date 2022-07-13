import { type Post } from "@prisma/client";
import { marked } from "marked";

export const PostView = ({ post }: { post: Post }) => {
  const html = marked(post.markdown);

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
};
