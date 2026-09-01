"use client";

import React from "react";
import Link from "next/link";
import styles from "./BlogCard.module.css";
import { BlogPost } from "@/src/data/blogs";

interface BlogCardProps {
  blog: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, featured = false }) => {
  if (featured) {
    return (
      <article className={styles.featuredCard}>
        <Link href={`/blogs/${blog.slug}`} className={styles.cardLink}>
          <div className={styles.cardContent}>
            <div className={styles.cardMeta}>
              <span className={styles.date}>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className={styles.readTime}>{blog.readTime} min read</span>
            </div>
            <h3 className={styles.cardTitle}>{blog.title}</h3>
            <p className={styles.cardDescription}>{blog.description}</p>
            <div className={styles.tagsList}>
              {blog.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <Link href={`/blogs/${blog.slug}`} className={styles.cardLink}>
        <div className={styles.cardMeta}>
          <span className={styles.date}>
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className={styles.readTime}>{blog.readTime} min read</span>
        </div>
        <h3 className={styles.cardTitle}>{blog.title}</h3>
        <p className={styles.cardDescription}>{blog.description}</p>
        <div className={styles.tags}>
          {blog.tags.map((tag) => (
            <span key={tag} className={styles.tagBadge}>
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
