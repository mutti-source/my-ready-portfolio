import { notFound } from "next/navigation";
import { blogs } from "@/src/data/blogs";
import Link from "next/link";
import styles from "./blog.module.css";
import BlogContent from "@/src/components/blog/BlogContent";
import BlogHeader from "@/src/components/blog/BlogHeader";

export function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((post) => post.slug === slug);

  if (!blog) {
    notFound();
  }

  // Get related blogs (same tags, different post)
  const relatedBlogs = blogs
    .filter(
      (b) =>
        b.id !== blog.id &&
        b.tags.some((tag) => blog.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <article className={styles.blogArticle} data-bs-theme="auto">
      <BlogHeader blog={blog} />

      <div className={styles.contentWrapper}>
        <div className="container">
          <div className={styles.gridLayout}>
            <main className={styles.mainContent}>
              <BlogContent slug={blog.slug} />

              {/* Article Meta at Bottom */}
              <div className={styles.articleMeta}>
                <div className={styles.author}>
                  <strong>By {blog.author}</strong>
                  <span className={styles.date}>
                    Published on{" "}
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className={styles.tagsList}>
                  {blog.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <nav className={styles.navigation}>
                <Link href="/blogs" className={styles.backLink}>
                  ← Back to all articles
                </Link>
              </nav>
            </main>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Reading Time Card */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Reading Time</h3>
                <p className={styles.cardContent}>{blog.readTime} minutes</p>
              </div>

              {/* Table of Contents */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Quick Links</h3>
                <ul className={styles.toc}>
                  <li>
                    <Link href="#top">Go to top</Link>
                  </li>
                  <li>
                    <Link href="/blogs">All articles</Link>
                  </li>
                  <li>
                    <Link href="/#contact">Contact me</Link>
                  </li>
                </ul>
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Related Articles</h3>
                  <div className={styles.relatedList}>
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        href={`/blogs/${relatedBlog.slug}`}
                        className={styles.relatedItem}
                      >
                        <h4>{relatedBlog.title}</h4>
                        <span className={styles.relatedReadTime}>
                          {relatedBlog.readTime} min read
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Article */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Share</h3>
                <div className={styles.shareButtons}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      blog.title
                    )}&url=${process.env.NEXT_PUBLIC_BASE_URL || "https://my-ready-portfolio.vercel.app"}/blogs/${blog.slug}`}
                    className={styles.shareBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_BASE_URL || "https://my-ready-portfolio.vercel.app"}/blogs/${blog.slug}`}
                    className={styles.shareBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
