import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "../../models/post.server";
import { requireUserId } from "../../session.server";
import invariant from "tiny-invariant";
import { type Post } from "@prisma/client";
import { PostView } from "../../components/posts";

type LoaderData = Post;

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.slug, `params.slug is required`);

  const userId = await requireUserId(request);
  const post = await getPost({ userId, slug: params.slug });
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>(post);
};

export default function PostSlug() {
  const post = useLoaderData() as LoaderData;

  return <PostView post={post} />;
}
