import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "../../models/post.server";
import { requireUserId } from "../../session.server";
import invariant from "tiny-invariant";
import { type Post } from "@prisma/client";
import { marked } from "marked";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.slug, `params.slug is required`);

  const userId = await requireUserId(request);
  const post = await getPost({ userId, slug: params.slug });
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);
  return json<LoaderData>({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData() as LoaderData;

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
