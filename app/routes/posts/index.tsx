import { json, type LoaderFunction } from "@remix-run/node";
import { Link, NavLink, useLoaderData, useTransition } from "@remix-run/react";
import { getPosts } from "../../models/post.server";
import { requireUserId } from "../../session.server";

type LoaderData = Awaited<ReturnType<typeof getPosts>>;

const sleep = () =>
  new Promise((resolve) => setTimeout(() => resolve(null), 2000));

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const posts = await getPosts({ userId });
  await sleep();
  return json(posts);
};

export default function Posts() {
  const posts = useLoaderData() as LoaderData;
  const transition = useTransition();
  const loading = transition.state === "loading";

  return (
    <main>
      <h1>Posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {loading
          ? "Loading..."
          : posts.map((post) => (
              <li key={post.slug}>
                <NavLink
                  className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={post.slug}
                >
                  📝 {post.title}
                </NavLink>
              </li>
            ))}
      </ul>
    </main>
  );
}
