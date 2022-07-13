import type { Post, User } from "@prisma/client";

import { prisma } from "~/db.server";

export function getPosts({ userId }: { userId: User["id"] }) {
  return prisma.post.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export function getPost({
  userId,
  slug,
}: {
  userId: User["id"];
  slug: Post["slug"];
}) {
  return prisma.post.findFirst({
    where: { userId, slug },
  });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown" | "userId">
) {
  return prisma.post.create({ data: post });
}

export function updatePost({
  slug,
  ...data
}: Pick<Post, "title" | "markdown" | "slug">) {
  return prisma.post.update({ where: { slug }, data });
}
